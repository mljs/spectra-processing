import { xRollingMax } from '../../index';

test('xRollingMax', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  expect(xRollingMax(array)).toStrictEqual([5, 6, 7, 8, 9]);

  expect(xRollingMax(array, { window: 3 })).toStrictEqual([
    3, 4, 5, 6, 7, 8, 9,
  ]);

  expect(
    xRollingMax(array, {
      window: 3,
      padding: {
        algorithm: 'duplicate',
      },
    }),
  ).toMatchCloseTo([1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9]);
});
