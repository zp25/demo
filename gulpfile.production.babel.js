import gulp from 'gulp';
import del from 'del';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const AUTOPREFIXER_CONFIG = { browsers: ['last 2 versions'] };
const PATHS = {
  html: {
    src: [
      'app/index.html',
      'app/pages/**/*.html'
    ],
    dest: 'dist',
  },
  styles: {
    src: ['app/styles/main.scss', 'app/pages/**/*.scss'],
    dest: 'dist/public/styles',
  },
  scripts: {
    src: 'app/pages/**/*.js',
    dest: 'dist/public/scripts',
  },
  images: {
    src: 'app/images/**/*',
    dest: 'dist/public/images',
  },
};

// Image Optimazation
function images() {
  return gulp.src(PATHS.images.src)
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      multipass: true,
    }))
    .pipe(gulp.dest(PATHS.images.dest));
}

// Copy
function copy() {
  return gulp.src(['app/*', '!app/*.html'])
    .pipe(gulp.dest('dist'));
}

// Styles
function sass() {
  const processors = [
    autoprefixer(AUTOPREFIXER_CONFIG),
    cssnano()
  ];

  return gulp.src(PATHS.styles.src)
    .pipe($.sourcemaps.init())
      .pipe($.sass({ precision: 10 })
        .on('error', $.sass.logError)
      )
      .pipe($.if('*.css', $.concat('main.min.css')))
      .pipe($.postcss(processors))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.styles.dest));
}

// Scripts
function scripts() {
  return gulp.src(PATHS.scripts.src)
    .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.uglify())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.scripts.dest));
}

// HTML
function html() {
  return gulp.src(PATHS.html.src)
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
    .pipe(gulp.dest(PATHS.html.dest));
}

// Clean output directory
function clean() {
  return del(['dist/*']);
}

// Build production files, the default task
gulp.task('default',
  gulp.series(
    clean, html,
    gulp.parallel(scripts, sass, images, copy)
  )
);
