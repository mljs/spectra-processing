import { expect, test } from 'vitest';

import { xyGetNMaxY } from '../xyGetNMaxY.ts';

test('number max peaks bigger than spectrum length', () => {
  const spectrum = { x: [1, 2, 3, 4], y: [1, 2, 3, 4] };
  const result = xyGetNMaxY(spectrum, 6);

  expect(result.x).toHaveLength(4);

  const result2 = xyGetNMaxY(spectrum, 4);

  expect(result2.x).toHaveLength(4);
  expect(result).toStrictEqual({ x: [1, 2, 3, 4], y: [1, 2, 3, 4] });
});

test('should return one peak', () => {
  const spectrum = { x: [1, 2, 3, 4], y: [1, 2, 3, 4] };
  const result = xyGetNMaxY(spectrum, 1);

  expect(result).toStrictEqual({
    x: new Float64Array([4]),
    y: new Float64Array([4]),
  });
});

test('should throw error', () => {
  const spectrum = { x: [1, 5], y: [1, 2, 3, 4] };

  expect(() => xyGetNMaxY(spectrum, 1)).toThrow(
    'the x and y arrays must have the same length',
  );
});

test('bigger spectrum', () => {
  const spectrum = {
    x: [1, 5, 7, 3, 1, 8, 9, 13, 40, 3, 4],
    y: [1, 5, 7, 3, 1, 8, 9, 13, 40, 3, 4],
  };
  const result = xyGetNMaxY(spectrum, 3);

  expect(result).toStrictEqual({
    x: new Float64Array([9, 13, 40]),
    y: new Float64Array([9, 13, 40]),
  });
});

test('test repeating values', () => {
  const spectrum = {
    x: [1, 5, 7, 3, 1, 8, 9, 13, 40, 3, 4],
    y: [1, 5, 7, 3, 1, 40, 51, 40, 40, 3, 4],
  };
  const result = xyGetNMaxY(spectrum, 3);

  expect(result).toStrictEqual({
    x: new Float64Array([8, 9, 13]),
    y: new Float64Array([40, 51, 40]),
  });
});
