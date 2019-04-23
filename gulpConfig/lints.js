/* eslint import/no-extraneous-dependencies: ["error", { "peerDependencies": true }] */

import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { SRC } from './constants';

const $ = gulpLoadPlugins();

function lint(BS, src = []) {
  if (!Array.isArray(src)) {
    throw new TypeError('invalid path');
  }

  const basePaths = [
    path.join(SRC, '**/*.js'),
  ];

  const task = () => gulp.src(basePaths.concat(src))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!BS.active, $.eslint.failOnError()));

  task.displayName = 'lint';

  return task;
}

const stylelint = (src = []) => {
  if (!Array.isArray(src)) {
    throw new TypeError('invalid path');
  }

  const basePaths = [
    path.join(SRC, '**/*.{scss,css}'),
  ];

  const task = () => gulp.src(basePaths.concat(src))
    .pipe($.stylelint({
      failAfterError: false,
      reporters: [
        {
          formatter: 'verbose',
          console: true,
        },
      ],
    }));

  task.displayName = 'stylelint';

  return task;
};

export {
  lint,
  stylelint,
};
