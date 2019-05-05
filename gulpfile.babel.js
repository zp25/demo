/* eslint import/no-extraneous-dependencies: ["error", { "peerDependencies": true }] */

import path from 'path';
import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import browserSync from 'browser-sync';
import dotenv from 'dotenv';
import gulpLoadPlugins from 'gulp-load-plugins';
import log from 'fancy-log';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';
import globby from 'globby';
import {
  SRC,
  OUTPUT,
  TEMP,
} from './gulpConfig/constants';
import html from './gulpConfig/html';
import {
  images,
  tmpWebp,
  webp,
} from './gulpConfig/images';
import {
  lint,
  stylelint,
} from './gulpConfig/lints';
import {
  clean,
  cleanCache,
} from './gulpConfig/utils';
import { name } from './package.json';

dotenv.config({ silent: true });

const $ = gulpLoadPlugins();
const BS = browserSync.create();
const pwd = process.cwd();

const {
  assets,
  images: imagePath,
  copy: copyPath,
  includePaths,
  scripts: scriptsPath,
} = {
  assets: ['.tmp', 'app', 'app/public', 'app/html', 'node_modules'],
  images: 'app/images/**/*',
  copy: ['app/public/*', '!app/public', '!app/*.html', '!app/html'],
  // gulp-sass includePaths
  includePaths: [
    // 'node_modules/normalize.css',
    'node_modules/zp-ui',
  ],
  scripts: [
    'app/scripts/**/*.js',
    'pages/**/script.js',
  ],
};

// Copy
const copy = () => gulp.src(copyPath)
  .pipe(gulp.dest(OUTPUT))
  .pipe($.size({ title: 'copy' }));

// Styles
function tmpSass() {
  const processors = [
    autoprefixer(),
  ];

  return gulp.src('app/**/*.{scss,css}', { base: SRC })
    .pipe($.newer(TEMP))
    .pipe($.sourcemaps.init())
    // sourcemap start
    .pipe($.sassGlob())
    .pipe(
      $.sass({
        includePaths,
        precision: 10,
      })
        .on('error', $.sass.logError),
    )
    .pipe($.postcss(processors))
    // sourcemap end
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(TEMP))
    .pipe(BS.stream({ once: true }));
}

function sass() {
  const processors = [
    autoprefixer(),
    cssnano(),
  ];

  return gulp.src('app/**/*.{scss,css}', { base: SRC })
    .pipe($.sourcemaps.init())
    // sourcemap start
    .pipe($.sassGlob())
    .pipe(
      $.sass({
        includePaths,
        precision: 10,
      })
        .on('error', $.sass.logError),
    )
    .pipe($.postcss(processors))
    .pipe($.size({ title: 'styles', showFiles: true }))
    .pipe($.rev())
    // sourcemap end
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(OUTPUT))
    .pipe($.rev.manifest({
      base: process.cwd(),
      merge: true,
    }))
    .pipe(gulp.dest(pwd));
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

const development = b => filename => b.bundle()
  .on('error', log.bind(log, 'Browserify Error'))
  .pipe(source(filename))
  .pipe(gulp.dest(TEMP));

const tmpBundle = (done) => {
  const tasks = globby.sync(scriptsPath).map((entry) => {
    const { basename } = rename(entry);
    const filename = `scripts/${basename}.js`;

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
    b.on('update', () => (
      development(b)(filename).pipe(BS.stream({ once: true }))
    ));
    // watchify监听log事件，输出内容X bytes written (Y seconds)，fancy-log添加时间
    b.on('log', log);

    return development(b)(filename);
  });

  const streams = merge(...tasks);

  if (streams.isEmpty) {
    done();
    return undefined;
  }

  return streams;
};

const bundle = (entry) => {
  const { basename } = rename(entry);

  const task = () => {
    const b = browserify({
      entries: entry,
      cache: {},
      packageCache: {},
      transform: [babelify],
      // apply source maps
      debug: true,
    });

    return b.bundle()
      .on('error', log.bind(log, 'Browserify Error'))
      .pipe(source(`scripts/${basename}.js`))
      .pipe(buffer())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      // sourcemap start
      .pipe($.uglify({
        // preserveComments: 'license',
        compress: {
          global_defs: {
            DEV: false,
          },
        },
      }))
      .pipe($.size({ title: `bundle:${basename}` }))
      .pipe($.rev())
      // sourcemap end
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(OUTPUT))
      .pipe($.rev.manifest({
        base: pwd,
        merge: true,
      }))
      .pipe(gulp.dest(pwd));
  };

  task.displayName = `bundle:${basename}`;

  return task;
};

// Tasks
gulp.task('tmpWebp', tmpWebp(BS)(imagePath));

gulp.task('lint', lint(BS, ['pages/**/*.js', 'templates/**/*.js']));
gulp.task('stylelint', stylelint(['pages/**/*.{scss,css}']));

function server() {
  BS.init({
    notify: false,
    logPrefix: name,
    server: {
      baseDir: assets,
    },
    port: process.env.PORT || 3010,
  });

  gulp.watch('app/**/*.html').on('change', BS.reload);
  gulp.watch(imagePath, gulp.parallel('tmpWebp'));
  gulp.watch([
    'app/**/*.{css,scss}',
    'pages/**/*.{scss,css}',
  ], gulp.parallel('stylelint', tmpSass));

  gulp.watch([
    'app/**/*.js',
    'pages/**/*.js',
    'templates/**/*.js',
  ], gulp.parallel('lint'));
}

// run scripts, sass first and run browserSync before watch
gulp.task('serve', gulp.series(
  gulp.parallel(
    'tmpWebp',
    tmpSass,
    tmpBundle,
  ),
  server,
));

gulp.task('clean:all', clean);
gulp.task('clean:cache', cleanCache);

const bundleList = globby.sync(scriptsPath).map(entry => bundle(entry));

// Build production files, the default task
gulp.task('default', gulp.series(
  'clean:all',
  'lint',
  ...bundleList,
  gulp.parallel(
    'stylelint',
    sass,
    images(imagePath),
    webp(imagePath),
    copy,
  ),
  html({
    base: `${SRC}/html`,
    searchPath: assets,
    cleanCss: ['normalize.css'],
  }),
));
