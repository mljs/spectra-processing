import { expect, test } from 'vitest';

import { xPadding } from '../xPadding.ts';

test('xPadding', () => {
  const array = [1, 2, 3, 4, 5];

  expect(xPadding(array)).toStrictEqual(Float64Array.from([1, 2, 3, 4, 5]));

  expect(xPadding(array, { size: 2 })).toStrictEqual(
    Float64Array.from([1, 2, 3, 4, 5]),
  );

  expect(xPadding(array, { size: 2, algorithm: 'value' })).toStrictEqual(
    Float64Array.from([0, 0, 1, 2, 3, 4, 5, 0, 0]),
  );

  expect(
    xPadding(array, { size: 2, value: 6, algorithm: 'value' }),
  ).toStrictEqual(Float64Array.from([6, 6, 1, 2, 3, 4, 5, 6, 6]));

  expect(xPadding(array, { size: 2, algorithm: 'duplicate' })).toStrictEqual(
    Float64Array.from([1, 1, 1, 2, 3, 4, 5, 5, 5]),
  );

  expect(xPadding(array, { size: 2, algorithm: 'circular' })).toStrictEqual(
    Float64Array.from([4, 5, 1, 2, 3, 4, 5, 1, 2]),
  );

  expect(xPadding(array, { size: 6, algorithm: 'circular' })).toStrictEqual(
    Float64Array.from([5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1]),
  );
});
