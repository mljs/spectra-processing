import { xUniqueSorted } from '../../index';

test('xUniqueSorted', () => {
  const array = [-1, 2, -3, 4, -1, 2];
  expect(Array.from(xUniqueSorted(array))).toStrictEqual([-3, -1, 2, 4]);
});
