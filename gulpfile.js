var gulp = require('gulp');
var del = require('del');
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();

// Lint JavaScript
function lint() {
  return gulp.src(['app/pages/**/*.js', 'app/sw.js'])
    .pipe($.eslint())
    .pipe($.eslint.format());
}

// Image Optimazation
function images() {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/public/images'))
    .pipe($.size({title: 'images'}));
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
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
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
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
      .pipe($.sass({precision: 10})
        .on('error', $.sass.logError)
      )
      .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
      .pipe($.if('*.css', $.concat('main.min.css')))
      .pipe($.if('*.css', $.cssnano()))
      .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/public/styles'));
}

// Scripts
function scripts() {
  return gulp.src('app/pages/**/*.js')
    .pipe($.newer('.tmp/scripts'))
    .pipe($.sourcemaps.init())
      .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
      .pipe($.uglify({preserveComments: 'some'}))
      .pipe($.size({title: 'scripts'}))
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
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('dist'));
}

// Watch
function watch() {
  gulp.watch('app/**/*.html', html);
  gulp.watch('app/**/*.{scss,css}', sass);
  gulp.watch(['app/pages/**/*.js', '!app/sw.js'], gulp.parallel(lint, scripts));
  gulp.watch('app/sw.js', gulp.parallel(lint, copy));
  gulp.watch('app/images/**/*', images);
}

// Clean output directory
function clean() {
  return del(['.tmp', 'dist/*']);
}

// tasks
gulp.task(clean);

// Clean cache
gulp.task('clean:cache', function(cb) {
  return $.cache.clearAll(cb);
});

// Build production files, the default task
gulp.task('default',
  gulp.series(
    clean, sass,
    gulp.parallel(lint, html, scripts, images, copy),
    watch
  )
);
