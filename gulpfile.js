const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const nunjucks = require('gulp-nunjucks');
const data = require('gulp-data');
const htmlmin = require('gulp-html-minifier');
const util = require('gulp-util');
const uglify = require('gulp-uglify');
const toString = require('./gulp-toString');
const connect = require('gulp-connect');
const svgSprite = require('gulp-svg-sprite');
const autoprefixer = require('gulp-autoprefixer');
const streamqueue = require('streamqueue');
const purecssModules = require('./purecss-config');
const path = require('path');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const PATH_DEST = './dest';
const FILE_NAME_CSS = 'styles.css';
const FILE_NAME_JAVASCRIPT = 'index.js';
const SVG_OPTIONS = {
  mode: {
    symbol: true
  }
};

let livereloadEnabled = false;

const purecss = () => gulp.src(purecssModules);
const styles = () => gulp
    .src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }));

function compileStyles() {
  return new Promise((resolve) => {
    streamqueue({ objectMode: true }, purecss(), styles())
      .pipe(concat({ path: FILE_NAME_CSS }))
      .pipe(minifyCss())
      .pipe(toString(resolve));
  });
}

function compileSvg() {
  return new Promise((resolve) => {
    gulp.src('./images/*.svg')
      .pipe(svgSprite(SVG_OPTIONS))
      .pipe(toString(resolve));
  });
}

function getData() {
  return new Promise((resolve) => {
    Promise
      .all([compileStyles()])
      .then(([css]) => {
        resolve({css, livereloadEnabled,
          jsPath: path.join(PATH_DEST, FILE_NAME_JAVASCRIPT),
        });
      });
  });
}

gulp.task('javascript', () =>
  browserify('./src/javascript/index.js')
    .bundle()
    .pipe(source(FILE_NAME_JAVASCRIPT))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(PATH_DEST))
    .pipe(connect.reload()));

gulp.task('html', () =>
  gulp.src('./src/html/index.html')
    .pipe(data(getData()))
    .pipe(nunjucks.compile())
    .on('error', e => util.log(e.message))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload()));

gulp.task('connect', () => {
  connect.server({
    root: './',
    livereload: true,
    port: 8888
  });
});
gulp.task('dev', ['default', 'connect'], () => {
  livereloadEnabled = true;
  gulp.watch('./src/**/*', ['default']);
});

gulp.task('default', ['javascript', 'html']);
