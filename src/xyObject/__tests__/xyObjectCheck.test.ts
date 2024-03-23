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
});
