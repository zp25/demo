import gulp from 'gulp';
import rimraf from 'rimraf';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import {
  HTMLMINIFIER,
  PATHS,
} from './constants';

const $ = gulpLoadPlugins();
const BS = browserSync.create();

// Lint
const lint = () => gulp.src(PATHS.scripts.src)
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.if(!BS.active, $.eslint.failOnError()));

const stylelint = () => gulp.src(PATHS.styles.src)
  .pipe($.stylelint({
    failAfterError: false,
    reporters: [
      {
        formatter: 'verbose',
        console: true,
      },
    ],
    syntax: 'scss',
  }));

// Image Optimazation
const makeHashKey = entry => file => [file.contents.toString('utf8'), entry].join('');

const images = () => gulp.src(PATHS.images.src)
  .pipe($.imagemin({
    progressive: true,
    interlaced: true,
    multipass: true,
  }))
  .pipe(gulp.dest(PATHS.images.dest))
  .pipe($.size({ title: 'images' }));

const tmpWebp = () => gulp.src(PATHS.images.src)
  .pipe($.cache($.webp({ quality: 75 }), { key: makeHashKey('webp') }))
  .pipe(gulp.dest(PATHS.images.tmp))
  .pipe(BS.stream({ once: true }));

const webp = () => gulp.src(PATHS.images.src)
  .pipe($.cache($.webp({ quality: 75 }), { key: makeHashKey('webp') }))
  .pipe(gulp.dest(PATHS.images.dest))
  .pipe($.size({ title: 'webp' }));

// Copy
const copy = () => gulp.src(PATHS.copy)
  .pipe(gulp.dest('dist'))
  .pipe($.size({ title: 'copy' }));

// Styles
function tmpSass() {
  const processors = [
    autoprefixer(),
  ];

  return gulp.src(PATHS.styles.src)
    .pipe($.newer(PATHS.styles.tmp))
    .pipe($.sourcemaps.init())
      .pipe($.sassGlob())
      .pipe(
        $.sass({
          includePaths: PATHS.styles.includePaths,
          precision: 10,
        })
        .on('error', $.sass.logError)
      )
      .pipe($.postcss(processors))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(PATHS.styles.tmp))
    .pipe(BS.stream({ once: true }));
}

function sass() {
  const processors = [
    autoprefixer(),
    cssnano(),
  ];

  return gulp.src(PATHS.styles.src)
    .pipe($.sourcemaps.init())
      .pipe($.sassGlob())
      .pipe(
        $.sass({
          includePaths: PATHS.styles.includePaths,
          precision: 10,
        })
        .on('error', $.sass.logError)
      )
      .pipe($.postcss(processors))
      .pipe($.size({ title: 'styles' }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.styles.dest));
}

// Scripts
const renameFilter = (file) => {
  const dirArr = file.dirname.split('/');

  return dirArr[dirArr.length - 2] === 'pages';
};

const rename = (path) => {
  path.basename = path.dirname;
  path.dirname = '.';
};

const tmpScript = () => gulp.src(PATHS.scripts.src)
  .pipe($.newer(PATHS.scripts.tmp))
  .pipe($.sourcemaps.init())
    .pipe($.babel())
  .pipe($.sourcemaps.write())
  .pipe($.if(renameFilter, $.rename(rename)))
  .pipe(gulp.dest(PATHS.scripts.tmp))
  .pipe(BS.stream({ once: true }));

const script = () => gulp.src(PATHS.scripts.src)
  .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.uglify({
      // preserveComments: 'license',
      compress: {
        global_defs: {
          'DEV': false,
        },
      },
    }))
    .pipe($.size({ title: 'scripts' }))
  .pipe($.sourcemaps.write('.'))
  .pipe($.if(renameFilter, $.rename(rename)))
  .pipe(gulp.dest(PATHS.scripts.dest));

// HTML
const html = () => gulp.src(PATHS.html.src)
  .pipe($.useref({
    searchPath: PATHS.assets,
  }))
  .pipe($.if('*.html', $.htmlmin(HTMLMINIFIER)))
  .pipe($.if('*.html', $.size({ title: 'html', showFiles: true })))
  .pipe(gulp.dest(PATHS.html.dest));

// Serve
function serve() {
  BS.init({
    notify: false,
    logPrefix: 'demo',
    server: {
      baseDir: PATHS.assets,
    },
    port: 3000,
  });

  gulp.watch(PATHS.html.src).on('change', BS.reload);
  gulp.watch(PATHS.images.src, tmpWebp);

  gulp.watch(PATHS.styles.src.concat(PATHS.styles.watch), gulp.parallel(stylelint, tmpSass));

  gulp.watch(PATHS.scripts.lint, lint);
  gulp.watch(PATHS.scripts.src, tmpScript);
}

// Clean output directory
const clean = (done) => {
  rimraf(`{${PATHS.clean.join(',')}}`, done);
};

// Tasks
gulp.task('clean:all', clean);
gulp.task('clean:cache', done => $.cache.clearAll(done));

// Build production files, the default task
gulp.task('default',
  gulp.series(
    'clean:all', lint,
    gulp.parallel(script, stylelint, sass, images, webp, copy),
    html,
  )
);

// run scripts, sass first and run browserSync before watch
gulp.task('serve',
  gulp.series(
    gulp.parallel(tmpScript, tmpSass, tmpWebp),
    serve,
  )
);
