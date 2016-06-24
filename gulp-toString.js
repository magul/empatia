const through = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-toString';

function toString(cb) {
  if (typeof cb !== 'function') {
    throw new PluginError(PLUGIN_NAME, 'First parameter must be a function');
  }

  return through.obj((file, enc, done) => {
    cb(file.contents.toString());
    done(null, file);
  });
}

module.exports = toString;
