import gulp from 'gulp';
import del from 'del';
import autoprefixer from 'autoprefixer';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const AUTOPREFIXER_CONFIG = { browsers: ['last 2 versions'] };
const PATHS = {
  html: {
    src: [
      'app/index.html',
      'app/pages/**/*.html'
    ],
    tmp: '.tmp',
    dest: 'dist',
  },
  styles: {
    src: ['app/styles/**/*.{css,scss}', 'app/pages/**/*.scss'],
    tmp: '.tmp/styles',
    dest: 'dist/public/styles',
  },
  scripts: {
    src: [
      'app/pages/**/*.js',
    ],
    concat: [
      'app/sw.js',
    ],
    tmp: '.tmp',
    dest: 'dist/public/scripts',
  },
  images: {
    src: 'app/images/**/*',
    dest: 'dist/public/images',
  },
  sw: 'app/sw.js',
};

// Lint JavaScript
function lint() {
  return gulp.src(PATHS.scripts.src)
    .pipe($.eslint())
    .pipe($.eslint.format());
}

// Image Optimazation
function images() {
  return gulp.src(PATHS.images.src)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      multipass: true,
    })))
    .pipe(gulp.dest(PATHS.images.dest))
    .pipe($.size({ title: 'images' }));
}

// Copy
function copy() {
  return gulp.src(['app/*', '!app/*.html'])
    .pipe(gulp.dest('dist'))
    .pipe($.size({ title: 'copy' }));
}

// Styles
function sass() {
  const processors = [
    autoprefixer(AUTOPREFIXER_CONFIG)
  ];

  return gulp.src(PATHS.styles.src)
    .pipe($.newer(PATHS.styles.tmp))
    .pipe($.sourcemaps.init())
      .pipe($.sass({ precision: 10 })
        .on('error', $.sass.logError)
      )
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(PATHS.styles.tmp))
      .pipe($.if('*.css', $.concat('main.min.css')))
      .pipe($.postcss(processors))
      .pipe($.size({ title: 'styles' }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.styles.dest));
}

// Scripts
function scripts() {
  return gulp.src(PATHS.scripts.src)
    .pipe($.newer(PATHS.scripts.tmp))
    .pipe($.sourcemaps.init())
      .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(PATHS.scripts.tmp))
      .pipe($.uglify())
      .pipe($.size({ title: 'scripts' }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.scripts.dest));
}

// HTML
function html() {
  return gulp.src(PATHS.html.src)
    .pipe($.newer(PATHS.html.tmp))
    .pipe(gulp.dest(PATHS.html.tmp))
    .pipe($.if('*.html', $.htmlmin({
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
    })))
    .pipe($.if('*.html', $.size({ title: 'html', showFiles: true })))
    .pipe(gulp.dest(PATHS.html.dest));
}

// Watch
function watch() {
  gulp.watch(PATHS.html.src, html);
  gulp.watch(PATHS.styles.src, sass);
  gulp.watch(PATHS.scripts.src, gulp.parallel(lint, scripts));
  gulp.watch(PATHS.sw, gulp.parallel(lint, copy));
  gulp.watch(PATHS.images.src, images);
}

// Clean output directory
function clean() {
  return del(['.tmp', 'dist/*']);
}

// tasks
gulp.task(clean);

// Clean cache
gulp.task('clean:cache', cb => $.cache.clearAll(cb));

// Build production files, the default task
gulp.task('default',
  gulp.series(
    clean, html,
    gulp.parallel(lint, scripts, sass, images, copy),
    watch
  )
);
