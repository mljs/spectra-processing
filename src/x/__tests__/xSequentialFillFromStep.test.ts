import { expect, test } from 'vitest';

import { xSequentialFillFromStep } from '../xSequentialFillFromStep';

test('Default array type (Float64Array)', () => {
  const result = xSequentialFillFromStep({ from: 0, step: 2, size: 6 }, {});
  expect(result).toStrictEqual(new Float64Array([0, 2, 4, 6, 8, 10]));
});

test('Int32Array', () => {
  const result = xSequentialFillFromStep(
    { from: 0, step: 2, size: 6 },
    {
      ArrayConstructor: Int32Array,
    },
  );
  expect(result).toStrictEqual(new Int32Array([0, 2, 4, 6, 8, 10]));
});

test('Array', () => {
  const result = xSequentialFillFromStep(
    { from: 0, step: 2, size: 6 },
    {
      ArrayConstructor: Array,
    },
  );
  expect(typeof result.push).toBe('function');
  expect(result).toStrictEqual([0, 2, 4, 6, 8, 10]);
});
