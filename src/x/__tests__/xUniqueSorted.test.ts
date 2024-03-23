import { expect, test } from 'vitest';

import { xUniqueSorted } from '../xUniqueSorted';

test('xUniqueSorted', () => {
  const array = [-1, 2, -3, 4, -1, 2];
  expect(xUniqueSorted(array)).toStrictEqual(Float64Array.from([-3, -1, 2, 4]));
});
