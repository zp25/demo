var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

var LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS({ advanced: true });

var Paths = {
  less: 'stylesheets/**/*.less',
  less_main: 'stylesheets/main.less',
  less_import: 'stylesheets/import/',
  css: 'public/css/',
  scripts: 'scripts/**/*.js',
  js: 'public/js/'
};


// styles
gulp.task('less', function () {
  return gulp.src(Paths.less_main)
    .pipe(less({
      paths: [ Paths.less_import ],
      plugins: [ cleancss ]
    }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(Paths.css))
    .on('error', gutil.log);
});

// scripts
gulp.task('lint', function () {
  return gulp.src(Paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
  return gulp.src(Paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(Paths.js))
    .on('error', gutil.log);
});


gulp.task('default', ['lint', 'less', 'scripts']);
gulp.task('heroku', ['less', 'scripts']);