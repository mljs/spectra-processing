import { toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { xyRolling } from '../../index';

expect.extend({ toMatchCloseTo });

test('xyRolling', () => {
  let points = {
    x: [1, 2, 3, 4, 5],
    y: [10, 20, 30, 40, 50],
  };

  expect(() => xyRolling(points)).toThrow('fct has to be a function');

  expect(xyRolling(points, () => 1, { window: 3 })).toStrictEqual({
    x: [2, 3, 4],
    y: [1, 1, 1],
  });

  expect(xyRolling(points, () => 1, { window: 2 })).toStrictEqual({
    x: [1.5, 2.5, 3.5, 4.5],
    y: [1, 1, 1, 1],
  });
});
