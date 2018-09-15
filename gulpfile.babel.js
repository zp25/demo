import path from 'path';
import gulp from 'gulp';
import rimraf from 'rimraf';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import log from 'fancy-log';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import es from 'event-stream';
import globby from 'globby';
import {
  HTMLMINIFIER,
  PATHS,
} from './constants';

const $ = gulpLoadPlugins({
  rename: {
    'gulp-rev-replace': 'replace',
  },
});
const pwd = process.cwd();

const BS = browserSync.create();

// Lint
const lint = () => gulp.src(PATHS.scripts.src)
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.if(!BS.active, $.eslint.failOnError()));

const stylelint = () => gulp.src([PATHS.styles.src, PATHS.styles.watch])
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
  .pipe($.cache($.imagemin({
    progressive: true,
    interlaced: true,
    multipass: true,
  }), {
    key: makeHashKey('images'),
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
      .pipe($.size({ title: 'styles', showFiles: true }))
      .pipe($.rev())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.styles.dest))
    .pipe($.rev.manifest({
      base: process.cwd(),
      merge: true,
    }))
    .pipe(gulp.dest(PATHS.root));
}

// Scripts
const rename = (entry) => {
  const arr = path.dirname(entry).split('/');
  const len = arr.length;

  const basename = arr[len - 3] === 'pages' ? arr[len - 1] : path.basename(entry, '.js');

  return {
    dirname: '.',
    basename,
    extname: '.js',
  };
};

const development = basename => b => b.bundle()
  .on('error', log.bind(log, 'Browserify Error'))
  .pipe(source(`${basename}.js`))
  .pipe(gulp.dest(PATHS.scripts.tmp))
  .pipe(BS.stream({ once: true }));

const production = basename => b => b.bundle()
  .on('error', log.bind(log, 'Browserify Error'))
  .pipe(source(`${basename}.js`))
  .pipe(buffer())
  .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.uglify({
      // preserveComments: 'license',
      compress: {
        global_defs: {
          'DEV': false,
        },
      },
    }))
    .pipe($.size({ title: 'scripts', showFiles: true }))
    .pipe($.rev())
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest(PATHS.scripts.dest));

const tmpScript = (done) => {
  globby(PATHS.scripts.src).then((entries) => {
    const tasks = entries.map((entry) => {
      const { basename } = rename(entry);

      const b = browserify({
        entries: entry,
        cache: {},
        packageCache: {},
        transform: [babelify],
        plugin: [watchify],
        // apply source maps
        debug: true,
      });

      // 只有执行bundle()后watchify才能监听update事件
      b.on('update', () => development(basename)(b));
      // watchify监听log事件，输出内容X bytes written (Y seconds)，fancy-log添加时间
      b.on('log', log);

      return development(basename)(b);
    });

    es.merge(tasks).on('end', done);
  });
};

const script = (done) => {
  globby(PATHS.scripts.src).then((entries) => {
    const tasks = entries.map((entry) => {
      const { basename } = rename(entry);

      const b = browserify({
        entries: entry,
        cache: {},
        packageCache: {},
        transform: [babelify],
        // apply source maps
        debug: true,
      });

      return production(basename)(b);
    });

    const manifest = gulp.src(PATHS.manifest);

    es.merge(tasks.concat(manifest))
      .pipe($.rev.manifest({
        base: pwd,
        merge: true,
      }))
      .pipe(gulp.dest(PATHS.root))
      .on('end', done);
  });
};

// HTML
const html = () => gulp.src(PATHS.html.src)
  .pipe($.useref({
    searchPath: PATHS.assets,
  }))
  .pipe($.replace({
    manifest: gulp.src(PATHS.manifest),
  }))
  .pipe($.inlineSource({
    rootpath: PATHS.html.dest,
    compress: false,
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
    port: 8088,
  });

  gulp.watch(PATHS.html.src).on('change', BS.reload);
  gulp.watch(PATHS.images.src, tmpWebp);

  gulp.watch([PATHS.styles.src, PATHS.styles.watch], gulp.parallel(stylelint, tmpSass));

  gulp.watch(PATHS.scripts.lint, lint);
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
