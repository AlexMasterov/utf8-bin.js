'use strict';

const CHR2 = require('./utf8-chr2');

const fromCharCode = String.fromCharCode;
const fromCodePoint = String.fromCodePoint;

function binToUtf8(bin, offset, length) {
  let str = '';
  for (let c, i = offset; i < length; i++) {
    c = bin[i];

    if (c < 0x80) { // 1 byte
      str += CHR2[c];
    } else if (c < 0xe0) { // 2 bytes
      str += fromCharCode(
        (c & 0x1f) << 6
        | bin[++i] & 0x3f);
    } else { // 3-4 bytes
      str += fromCodePoint(
        (c & 0x0f) << 12
        | (bin[i + 1] & 0x3f) << 6
        | bin[i + 2] & 0x3f);
      i += 2;
    }
  }

  return str;
}

module.exports = binToUtf8;
