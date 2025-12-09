import { expect, test } from 'vitest';

import { xyCheck } from '../xyCheck.ts';

test('various kind of object', () => {
  //@ts-expect-error We are testing that it throws correctly an error
  expect(() => xyCheck()).toThrowError('data must be an object');
  expect(() => xyCheck({ x: [], z: [] })).toThrowError(
    'data must be an object',
  );
  expect(() => xyCheck({ x: [], y: [] }, { minLength: 1 })).toThrowError(
    'data.x must have a length of at least 1',
  );
  expect(() => xyCheck({ x: [1], y: [1, 2] })).toThrowError(
    'the x and y arrays must have the same length',
  );
  expect(xyCheck({ x: [1], y: [1] })).toBeUndefined();
});
