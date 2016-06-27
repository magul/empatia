const PURECSS_PATH = './node_modules/purecss/build/';

module.exports = [
  'base'
].map(module => `${PURECSS_PATH}${module}.css`);
