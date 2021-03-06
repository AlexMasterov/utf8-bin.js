'use strict';

const strToUtf8 = source('str-utf8');
const strToUtf8L = source('legacy/str-utf8');

suite('strToUtf8 + legacy');

const onByteTest = (buf) => {
  const str = toUtf8(buf);
  const bin = toBin(buf);

  eq(strToUtf8(str), bin);
  eq(strToUtf8L(str), bin);
};

test('1 byte (u0000 — u007f)', () => {
  eachByte(utf8byte1, onByteTest);
});

test('2 bytes (u0080 — u07ff)', () => {
  eachByte(utf8byte2, onByteTest);
});

test('3 bytes (u0800 — uffff)', () => {
  eachByte(utf8byte3.low, onByteTest);
  eachByte(utf8byte3.high, onByteTest);
});

test('4 bytes (u10000 — u10ffff)', () => {
  eachByte(utf8byte4, onByteTest);
});
