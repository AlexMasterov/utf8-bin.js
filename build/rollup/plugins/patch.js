'use strict';

const applyPatch = (code, path) => path(code);

const patch = (patches) => {
  const files = new Map(Object.entries(patches));
  return {
    name: 'rollup/plugins/patch',
    transform(code, source) {
      const newCode = { code, map: null };
      const found = files.get(source);
      if (found) {
        newCode.code = found.reduce(applyPatch, code);
      }

      return newCode;
    },
  };
};

module.exports = patch;
