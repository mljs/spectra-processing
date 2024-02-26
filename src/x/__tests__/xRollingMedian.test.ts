import { xRollingMedian } from '../../index';

test('xRollingMedian', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  expect(xRollingMedian(array)).toStrictEqual([3, 4, 5, 6, 7]);
  // prettier-ignore
  expect(xRollingMedian(array, { window: 3 })).toStrictEqual([
    2, 3, 4, 5, 6, 7, 8,
  ]);

  // prettier-ignore
  expect(xRollingMedian(array, {
    window: 3, padding: {
      algorithm: 'duplicate'
    }
  })).toMatchCloseTo([
    1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9
  ], 5);
});
