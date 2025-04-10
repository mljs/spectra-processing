import { expect, test } from 'vitest';

import { recursiveUntypeArrays } from '../recursiveUntypeArrays';

test('basic cases', () => {
  expect(recursiveUntypeArrays(1)).toStrictEqual(1);
  expect(recursiveUntypeArrays('a')).toStrictEqual('a');
  expect(recursiveUntypeArrays({})).toStrictEqual({});
  expect(recursiveUntypeArrays([])).toStrictEqual([]);
  expect(recursiveUntypeArrays([1, 2, 3])).toStrictEqual([1, 2, 3]);
  expect(recursiveUntypeArrays(Float32Array.from([1, 2, 3]))).toStrictEqual([
    1, 2, 3,
  ]);
});

test('simple object', async () => {
  const object = {
    a: {
      b: {
        c: Int32Array.from([1, 2, 3]),
      },
    },
    d: [new Int32Array([1, 2, 3]), new Float32Array([3, 4, 5]), 2],
  };

  expect(recursiveUntypeArrays(object)).toStrictEqual({
    a: {
      b: {
        c: [1, 2, 3],
      },
    },
    d: [[1, 2, 3], [3, 4, 5], 2],
  });
});
