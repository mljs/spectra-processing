import { expect, test } from 'vitest';

import { isLittleEndian } from '../isLittleEndian.ts';

test('matches the byte order seen through a DataView', () => {
  const view = new DataView(new ArrayBuffer(2));
  new Uint16Array(view.buffer)[0] = 1;

  expect(isLittleEndian()).toBe(view.getUint16(0, true) === 1);
});

test('is stable across calls', () => {
  expect(isLittleEndian()).toBe(isLittleEndian());
});
