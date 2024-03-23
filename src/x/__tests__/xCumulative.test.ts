import { expect, test } from 'vitest';

import { xCumulative } from '../xCumulative';

test('zero length array', () => {
  const result = xCumulative([]);
  expect(result).toStrictEqual(new Float64Array(0));
});

test('1,2,3 array', () => {
  const result = xCumulative([1, 2, 3]);
  expect(result).toStrictEqual(Float64Array.from([1, 3, 6]));
});
