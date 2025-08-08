import { expect, test } from 'vitest';

import { xyArrayAlignToFirst } from '../xyArrayAlignToFirst';

test('mixed example with delta: 0.25', () => {
  const data = [
    { x: [1, 1.1, 2, 4], y: [1, 1, 1, 1] },
    { x: [0.1, 0.95, 1.05, 3], y: [1, 1, 1, 1] },
    { x: [2.05, 3.9, 4.1, 4.9, 5.1], y: [1, 1, 1, 1, 3] },
  ];
  const result = xyArrayAlignToFirst(data, { delta: 0.25 });

  expect(result).toStrictEqual({
    x: Float64Array.from([0.1, 1, 1.1, 2, 3, 4, 5.05]),
    ys: [
      Float64Array.from([0, 1, 1, 1, 0, 1, 0]),
      Float64Array.from([1, 1, 1, 0, 1, 0, 0]),
      Float64Array.from([0, 0, 0, 1, 0, 2, 4]),
    ],
  });
});

test('mixed example with delta a callback', () => {
  const data = [
    { x: [1, 1.1, 2, 4], y: [1, 1, 1, 1] },
    { x: [0.1, 0.95, 1.05, 3], y: [1, 1, 1, 1] },
    { x: [2.05, 3.9, 4.1, 4.9, 5.1], y: [1, 1, 1, 1, 3] },
  ];
  const result = xyArrayAlignToFirst(data, { delta: () => 0.25 });

  expect(result).toStrictEqual({
    x: Float64Array.from([0.1, 1, 1.1, 2, 3, 4, 5.05]),
    ys: [
      Float64Array.from([0, 1, 1, 1, 0, 1, 0]),
      Float64Array.from([1, 1, 1, 0, 1, 0, 0]),
      Float64Array.from([0, 0, 0, 1, 0, 2, 4]),
    ],
  });
});
