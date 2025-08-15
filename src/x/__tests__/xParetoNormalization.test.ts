import { expect, test } from 'vitest';

import { xParetoNormalization } from '../xParetoNormalization.ts';

test('1,2,3', () => {
  const array = [1, 2, 3];

  expect(xParetoNormalization(array)).toStrictEqual(
    Float64Array.from([1, 2, 3]),
  );
});

test('2,1,2', () => {
  const array = [2, 1, 2];

  expect(xParetoNormalization(array)).toMatchCloseTo([
    2.6321480259049848, 1.3160740129524924, 2.6321480259049848,
  ]);
});

test('3,3,1', () => {
  const array = [3, 3, 1];

  expect(xParetoNormalization(array)).toMatchCloseTo([
    2.791814577306299, 2.791814577306299, 0.9306048591020996,
  ]);
});
