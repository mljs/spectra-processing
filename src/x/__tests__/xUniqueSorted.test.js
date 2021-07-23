import { xUniqueSorted } from '../xUniqueSorted.js';

test('xUniqueSorted', () => {
  let array = [-1, 2, -3, 4, -1, 2];
  expect(Array.from(xUniqueSorted(array))).toStrictEqual([-3, -1, 2, 4]);
});
