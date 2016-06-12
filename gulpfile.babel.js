import gulp from 'gulp';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import minifyCss from 'gulp-minify-css';
import nunjucks from 'gulp-nunjucks';
import data from 'gulp-data';
import htmlmin from 'gulp-html-minifier';
import util from 'gulp-util';
import streamqueue from 'streamqueue';
import purecssModules from './purecss-config';
import path from 'path';

const PATH_DEST = './dest';
const FILE_NAME_CSS = 'styles.css';
const FILE_NAME_JAVASCRIPT = 'index.js';

const purecss = () => gulp.src(purecssModules);
const styles = () => gulp
    .src('./src/scss/*.scss')
    .pipe(sass());

const compileStyles = () =>
  streamqueue({ objectMode: true }, purecss(), styles())
    .pipe(concat({ path: FILE_NAME_CSS }))
    .pipe(minifyCss())
    .pipe(gulp.dest(PATH_DEST));

function getData() {
  return new Promise((resolve) => {
    resolve({
      cssPath: path.join(PATH_DEST, FILE_NAME_CSS),
      jsPath: path.join(PATH_DEST, FILE_NAME_JAVASCRIPT),
    });
  });
}

gulp.task('css', compileStyles);
gulp.task('javascript', () => {
  gulp
    .src('./src/javascript/index.js')
    .pipe(gulp.dest(PATH_DEST));
});
gulp.task('html', () =>
  gulp.src('./src/html/index.html')
    .pipe(data(getData()))
    .pipe(nunjucks.compile())
    .on('error', e => util.log(e.message))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./')));
gulp.task('dev', ['default'], () => {
  gulp.watch('./src/**/*', ['default']);
});

gulp.task('default', ['css', 'javascript', 'html']);
