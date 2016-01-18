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
  var src = [
    'app/styles/main.scss',
    'app/pages/**/*.scss'
  ];

  return gulp.src(src)
    .pipe($.sourcemaps.init())
      .pipe($.sass({precision: 10})
        .on('error', $.sass.logError)
      )
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
    .pipe($.if('*.html', $.minifyHtml()))
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
