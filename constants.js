const AUTOPREFIXER_CONFIG = { browsers: ['last 2 versions'] };

const HTMLMINIFIER = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

const PATHS = {
  html: {
    src: 'app/html/*.html',
    dest: 'dist/html',
  },
  styles: {
    src: [
    'app/styles/**/*.{scss,css}',
    ],
    watch: [
      'pages/**/*.{scss,css}',
    ],
    tmp: '.tmp/styles',
    dest: 'dist/styles',
  },
  scripts: {
    lint: [
      'app/scripts/**/*.js',
      'app/assets/**/*.js',
      'pages/**/*.js',
    ],
    src: [
      'app/scripts/**/*.js',
      'pages/**/script.js',
      '!pages/public/*.js',
    ],
    tmp: '.tmp/scripts',
    dest: 'dist/scripts',
  },
  images: {
    src: 'app/images/**/*',
    tmp: '.tmp/images',
    dest: 'dist/images',
  },
  copy: ['app/assets/*', '!app/*.html'],
  clean: ['.tmp', 'dist/*'],
  assets: ['.tmp', 'app', 'app/assets', 'app/html', 'node_modules'],
};

export {
  AUTOPREFIXER_CONFIG,
  HTMLMINIFIER,
  PATHS,
};