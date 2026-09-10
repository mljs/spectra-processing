import { XSadd } from 'ml-xsadd';
import { expect, test } from 'vitest';

import { xGetApproximateSortOrder } from '../xGetApproximateSortOrder.ts';

/**
 * Applies an order to the values.
 * @param values - the values.
 * @param order - the indices, in order.
 * @returns the reordered values.
 */
function apply(values: number[], order: Uint32Array): number[] {
  return Array.from(order, (index) => values[index]);
}

test('ascending order of well separated values', () => {
  const values = [3, 1, 4, 1, 5, 9, 2, 6];

  expect(apply(values, xGetApproximateSortOrder(values))).toStrictEqual([
    1, 1, 2, 3, 4, 5, 6, 9,
  ]);
});

test('descending order of well separated values', () => {
  const values = [3, 1, 4, 1, 5];

  expect(
    apply(values, xGetApproximateSortOrder(values, { descending: true })),
  ).toStrictEqual([5, 4, 3, 1, 1]);
});

test('negative values order below positive ones', () => {
  const values = [1, -1, 0, -3.5, 2.5, -0.5];

  expect(apply(values, xGetApproximateSortOrder(values))).toStrictEqual([
    -3.5, -1, -0.5, 0, 1, 2.5,
  ]);
});

test('equal values keep their input order', () => {
  const values = [2, 1, 2, 1, 2, 1];

  expect(Array.from(xGetApproximateSortOrder(values))).toStrictEqual([
    1, 3, 5, 0, 2, 4,
  ]);
});

test('empty and single element arrays', () => {
  expect(xGetApproximateSortOrder([])).toStrictEqual(new Uint32Array(0));
  expect(Array.from(xGetApproximateSortOrder([42]))).toStrictEqual([0]);
});

test('values closer than the key resolution keep their input order', () => {
  // The high word ignores the low 32 bits of the mantissa, so these three share a key.
  const values = [1, 1 + 2 ** -40, 1 + 2 ** -30];

  expect(
    Array.from(xGetApproximateSortOrder(values, { descending: true })),
  ).toStrictEqual([0, 1, 2]);
});

test('orders to 20 bits of relative precision on the 16 bit digit path', () => {
  const length = 70000;
  const values = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    values[i] = Math.abs(Math.sin(i)) * 1e6 + 1;
  }
  const ordered = Array.from(
    xGetApproximateSortOrder(values),
    (i) => values[i],
  );

  expect(ordered).toHaveLength(length);

  let worst = 0;
  for (let i = 1; i < length; i++) {
    if (ordered[i] < ordered[i - 1]) {
      worst = Math.max(worst, (ordered[i - 1] - ordered[i]) / ordered[i - 1]);
    }
  }

  expect(worst).toBeLessThan(2 ** -20);
});

test('stays within the key resolution of a native descending sort', () => {
  const length = 5000;
  const values = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    values[i] = Math.abs(Math.cos(i)) * 1e4 + 1;
  }
  const ordered = Float64Array.from(
    xGetApproximateSortOrder(values, { descending: true }),
    (i) => values[i],
  );
  const native = values.toSorted().toReversed();
  let worst = 0;
  for (let i = 0; i < length; i++) {
    worst = Math.max(worst, Math.abs(ordered[i] - native[i]) / native[i]);
  }

  expect(worst).toBeLessThan(2 ** -20);
});

test('matches a comparator sort on seeded values spanning many magnitudes', () => {
  const random = new XSadd(7);
  const values = new Float64Array(10000);
  for (let i = 0; i < values.length; i++) {
    values[i] = (random.random() - 0.5) * 10 ** ((random.random() - 0.5) * 40);
  }

  const expected = Array.from(
    { length: values.length },
    (_, index) => index,
  ).toSorted((first, second) => values[second] - values[first]);

  expect(
    Array.from(xGetApproximateSortOrder(values, { descending: true })),
  ).toStrictEqual(expected);
});
