'use strict';

const { resolveModulePath } = require('./resolvers');

const patch = (patches) => {
  const files = new Map(resolveModulePath(patches));
  return {
    name: 'rollup/plugins/patch',
    transform(code, id) {
      const found = files.get(id);
      return found
        ? found.reduce((code, path) => path(code), code)
        : code;
    },
  };
};

module.exports = patch;
