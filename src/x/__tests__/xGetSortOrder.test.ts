import { expect, test } from 'vitest';

import { xGetSortOrder } from '../xGetSortOrder.ts';

/**
 * Applies an order to the values.
 * @param values - the values.
 * @param order - the indices, in order.
 * @returns the reordered values.
 */
function apply(values: number[], order: Uint32Array): number[] {
  return Array.from(order, (index) => values[index]);
}

test('ascending order of a plain array', () => {
  const values = [3, 1, 4, 1, 5, 9, 2, 6];

  expect(Array.from(xGetSortOrder(values))).toStrictEqual([
    1, 3, 6, 0, 2, 4, 7, 5,
  ]);
  expect(apply(values, xGetSortOrder(values))).toStrictEqual([
    1, 1, 2, 3, 4, 5, 6, 9,
  ]);
});

test('descending order', () => {
  const values = [3, 1, 4, 1, 5];

  expect(
    apply(values, xGetSortOrder(values, { descending: true })),
  ).toStrictEqual([5, 4, 3, 1, 1]);
});

test('negative values order below positive ones', () => {
  const values = [1, -1, 0, -3.5, 2.5, -0.5];

  expect(apply(values, xGetSortOrder(values))).toStrictEqual([
    -3.5, -1, -0.5, 0, 1, 2.5,
  ]);
});

test('equal values keep their input order', () => {
  const values = [2, 1, 2, 1, 2, 1];

  expect(Array.from(xGetSortOrder(values))).toStrictEqual([1, 3, 5, 0, 2, 4]);
});

test('equal values keep their input order when descending', () => {
  const values = [2, 1, 2, 1, 2, 1];

  expect(Array.from(xGetSortOrder(values, { descending: true }))).toStrictEqual(
    [0, 2, 4, 1, 3, 5],
  );
});

test('empty and single element arrays', () => {
  expect(xGetSortOrder([])).toStrictEqual(new Uint32Array(0));
  expect(Array.from(xGetSortOrder([42]))).toStrictEqual([0]);
});

test('accepts a Float64Array without modifying it', () => {
  const values = Float64Array.from([3, 1, 2]);

  expect(Array.from(xGetSortOrder(values))).toStrictEqual([1, 2, 0]);
  expect(values).toStrictEqual(Float64Array.from([3, 1, 2]));
});

test('orders infinities, both zeros and subnormals like the native sort', () => {
  const values = [
    3,
    -Infinity,
    0,
    -0,
    Infinity,
    -3,
    Number.MIN_VALUE,
    -Number.MIN_VALUE,
    5e-324,
  ];
  const native = Float64Array.from(values).toSorted();

  expect(Float64Array.from(apply(values, xGetSortOrder(values)))).toStrictEqual(
    native,
  );
});

test('NaN sorts last, like the native sort', () => {
  const values = [3, Number.NaN, 1, 2];

  expect(apply(values, xGetSortOrder(values))).toStrictEqual([
    1,
    2,
    3,
    Number.NaN,
  ]);
});

test('matches the native sort on the 8 bit digit path', () => {
  const values = new Float64Array(5000);
  for (let i = 0; i < values.length; i++) {
    values[i] = Math.sin(i) * 1e6;
  }
  const sorted = values.toSorted();
  const order = xGetSortOrder(values);

  expect(order).toHaveLength(5000);
  expect(Float64Array.from(order, (index) => values[index])).toStrictEqual(
    sorted,
  );
});

test('matches the native sort on the 16 bit digit path', () => {
  const length = 70000;
  const values = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    values[i] = Math.sin(i) * 1e6 - 5e5;
  }
  const sorted = values.toSorted();
  const order = xGetSortOrder(values);

  expect(order).toHaveLength(length);
  expect(Float64Array.from(order, (index) => values[index])).toStrictEqual(
    sorted,
  );
});

test('descending is the exact reverse of ascending when values are distinct', () => {
  const values = new Float64Array(3000);
  for (let i = 0; i < values.length; i++) {
    values[i] = Math.cos(i) * 1234.5;
  }
  const ascending = Float64Array.from(xGetSortOrder(values), (i) => values[i]);
  const descending = Float64Array.from(
    xGetSortOrder(values, { descending: true }),
    (i) => values[i],
  );

  expect(descending).toStrictEqual(ascending.toReversed());
});
