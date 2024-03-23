import { expect, test } from 'vitest';

import { matrixPQN } from '../matrixPQN';

test('Probabilistic quotient normalization method', () => {
  const data = [
    [1, 2, 3],
    [2, 1, 2],
    [3, 3, 1],
  ];
  const result = matrixPQN(data, { max: 1 });

  expect(result.data).toStrictEqual([
    [0.2672612419124244, 0.5345224838248488, 0.8017837257372732],
    [0.6666666666666666, 0.3333333333333333, 0.6666666666666666],
    [0.6882472016116852, 0.6882472016116852, 0.22941573387056174],
  ]);
});
