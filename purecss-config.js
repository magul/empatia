const PURECSS_PATH = './node_modules/purecss/build/';

export default [
  'base',
  'grids-core',
  'grids-units',
  'grids-responsive',
  'menus-core',
  'menus-horizontal',
].map(module => `${PURECSS_PATH}${module}.css`);
