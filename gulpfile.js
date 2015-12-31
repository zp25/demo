var gulp = require('gulp');
var del = require('del');
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();

// Lint JavaScript
function lint() {
  return gulp.src(['app/pages/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format());
}

// 图片优化
function images() {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/public/images'))
    .pipe($.size({title: 'images'}));
}

// 复制除html外其他根目录(app)文件
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

// 样式和脚本，缓存结果到./tmp/减少重复量
function sass() {
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
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
      .pipe($.if('*.css', $.concat('main.min.css')))
      .pipe($.if('*.css', $.cssnano()))
      .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/public/styles'));
}

function scripts() {
  return gulp.src('app/pages/**/*.js')
    .pipe($.newer('.tmp/scripts'))
    .pipe($.sourcemaps.init())
      .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
      // .pipe($.concat('main.min.js'))
      .pipe($.uglify({preserveComments: 'some'}))
      .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/public/scripts'));
}

function html() {
  var src = [
    'app/index.html',
    'app/pages/**/*.html'
  ];

  return gulp.src(src)
    .pipe($.if('*.html', $.minifyHtml()))
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('dist'));
}

function watch() {
  gulp.watch('app/**/*.html', html);
  gulp.watch('app/**/*.{scss,css}', sass);
  gulp.watch('app/**/*.js', gulp.parallel(lint, scripts));
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
