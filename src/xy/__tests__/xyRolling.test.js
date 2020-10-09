import { toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { xyRolling } from '../xyRolling.js';

expect.extend({ toMatchCloseTo });

test('xyRolling', function () {
  let points = {
    x: [1, 2, 3, 4, 5],
    y: [10, 20, 30, 40, 50],
  };

  expect(() => xyRolling(points)).toThrow('fct has to be a function');

  expect(xyRolling(points, () => 1, { window: 3 })).toStrictEqual({
    x: [2, 3, 4],
    y: [1, 1, 1],
  });
});
