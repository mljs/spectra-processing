import { expect, test } from 'vitest';

import { xyObjectCheck } from '../xyObjectCheck';

test('xyObjectCheck', () => {
  expect(xyObjectCheck([{ x: 0, y: 1 }])).toBeUndefined();
  // @ts-expect-error this is a testcase
  expect(() => xyObjectCheck([{ x: 0, y: 'a' }])).toThrow(
    'points must be an array of {x,y} objects',
  );
  // @ts-expect-error this is a testcase
  expect(() => xyObjectCheck('a')).toThrow(
    'points must be an array of {x,y} objects',
  );
  expect(
    xyObjectCheck(
      [
        { x: 0, y: 1 },
        { x: 2, y: 3 },
      ],
      { minLength: 2 },
    ),
  ).toBeUndefined();
  expect(() => xyObjectCheck([{ x: 0, y: 1 }], { minLength: 2 })).toThrow(
    'points must have a length of at least 2',
  );
});
