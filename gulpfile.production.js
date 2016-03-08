var gulp = require('gulp');
var del = require('del');
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();

// Image Optimazation
function images() {
  return gulp.src('app/images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/public/images'));
}

// Copy
function copy() {
  var src = [
    'app/*',
    '!app/*.html',
    '!app/images',
    '!app/pages',
    '!app/styles'
  ];

  return gulp.src(src)
    .pipe(gulp.dest('dist'));
}

// Styles
function sass() {
  var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];
  var src = [
    'app/styles/main.scss',
    'app/pages/**/*.scss'
  ];

  return gulp.src(src)
    .pipe($.sourcemaps.init())
      .pipe($.sass({precision: 10})
        .on('error', $.sass.logError)
      )
      .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe($.if('*.css', $.concat('main.min.css')))
      .pipe($.if('*.css', $.cssnano()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/public/styles'));
}

// Scripts
function scripts() {
  return gulp.src('app/pages/**/*.js')
    .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.uglify({preserveComments: 'some'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/public/scripts'));
}

// HTML
function html() {
  var src = [
    'app/index.html',
    'app/pages/**/*.html'
  ];

  return gulp.src(src)
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    .pipe(gulp.dest('dist'));
}

// Clean output directory
function clean() {
  return del(['dist/*']);
}

// Build production files, the default task
gulp.task('default',
  gulp.series(
    clean, sass,
    gulp.parallel(html, scripts, images, copy)
  )
);
