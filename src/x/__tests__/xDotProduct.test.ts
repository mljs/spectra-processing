import { expect, test } from 'vitest';

import { xDotProduct } from '../xDotProduct';

test('cross-correlation linear and constant function', () => {
  const linear = [0, 1, 2, 3, 4];
  const constant = [5, 5, 5, 5, 5];

  // Scilab: constant*constant'
  expect(xDotProduct(constant, constant)).toBe(125);
  // Scilab: linear*constant'
  expect(xDotProduct(linear, constant)).toBe(50);
  // Scilab: constant*linear'
  expect(xDotProduct(constant, linear)).toBe(50);
  // Scilab: linear*linear'
  expect(xDotProduct(linear, linear)).toBe(30);
});
