import { expect, test } from 'vitest';

import { xyMassCenter } from '../xyMassCenter.ts';

test('xyMassCenter', () => {
  const typedArray = Uint16Array.from([1, 2, 3, 4, 5]);

  expect(xyMassCenter({ x: [0], y: [1] })).toBe(0);
  expect(xyMassCenter({ x: [1], y: [1] })).toBe(1);
  expect(xyMassCenter({ x: [1, 2], y: [1, 1] })).toBe(1.5);
  expect(xyMassCenter({ x: [1, 2, 3], y: [1, 1, 1] })).toBe(2);
  expect(xyMassCenter({ x: [3, 2, 1], y: [1, 1, 1] })).toBe(2);
  expect(xyMassCenter({ x: typedArray, y: [1, 1, 1, 1, 1] })).toBe(3);
  expect(xyMassCenter({ x: [1, 2, 3], y: [1, 1, 1] }, { fromIndex: 1 })).toBe(
    2.5,
  );
  expect(xyMassCenter({ x: [3, 2, 1], y: [1, 1, 1] }, { fromIndex: 1 })).toBe(
    1.5,
  );
  expect(xyMassCenter({ x: [1, 2, 3], y: [1, 1, 1] }, { toIndex: 1 })).toBe(
    1.5,
  );
  expect(xyMassCenter({ x: [3, 2, 1], y: [1, 1, 1] }, { toIndex: 1 })).toBe(
    2.5,
  );
  expect(
    xyMassCenter({ x: [1, 2, 3], y: [1, 1, 1] }, { fromIndex: 1, toIndex: 1 }),
  ).toBe(2);
  expect(
    xyMassCenter({ x: [1, 2, 3], y: [1, 1, 1] }, { fromIndex: 1, toIndex: 10 }),
  ).toBe(2.5);
  expect(
    xyMassCenter({ x: [3, 2, 1], y: [1, 1, 1] }, { fromIndex: 1, toIndex: 1 }),
  ).toBe(2);
  expect(() => xyMassCenter({ x: [], y: [] })).toThrow(
    'data.x must have a length of at least',
  );
  expect(() => xyMassCenter({ x: [1], y: [] })).toThrow(
    'the x and y arrays must have the same',
  );
  expect(() => xyMassCenter({ x: [1, 2, 3], y: [0, 0, 0] })).toThrow(
    'Sum of Ys can not be zero.',
  );
});
