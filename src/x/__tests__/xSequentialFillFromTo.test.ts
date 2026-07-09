import { expect, test } from 'vitest';

import { xSequentialFillFromTo } from '../xSequentialFillFromTo.ts';

test('Default array type (Float64Array)', () => {
  const result = xSequentialFillFromTo({ from: 0, to: 10, size: 6 }, {});

  expect(result).toStrictEqual(new Float64Array([0, 2, 4, 6, 8, 10]));
});

test('size of 1 returns from', () => {
  const result = xSequentialFillFromTo({ from: 10, to: 20, size: 1 });

  expect(result).toStrictEqual(new Float64Array([10]));
});

test('Int32Array', () => {
  const result = xSequentialFillFromTo(
    { from: 0, to: 10, size: 6 },
    {
      ArrayConstructor: Int32Array,
    },
  );

  expect(result).toStrictEqual(new Int32Array([0, 2, 4, 6, 8, 10]));
});

test('Array', () => {
  const result = xSequentialFillFromTo(
    { from: 0, to: 10, size: 6 },
    {
      ArrayConstructor: Array,
    },
  );

  expect(result).toStrictEqual([0, 2, 4, 6, 8, 10]);
});
