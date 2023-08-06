import { toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { xyObjectSlotX } from '../../index';

expect.extend({ toMatchCloseTo });

test('xyObjectSlotX', () => {
  const arrayXY = [
    { x: 0.9, y: 1 },
    { x: 1, y: 2 },
    { x: 1.01, y: 3 },
    { x: 1.9, y: 4 },
  ];

  const expected = [];
  expected.push({ x: 1, y: 6 }, { x: 2, y: 4 });

  expect(xyObjectSlotX(arrayXY)).toStrictEqual(expected);

  const result = xyObjectSlotX(arrayXY, { slotWidth: 0.05 });
  expect(result[0]).toStrictEqual({ x: 0.9, y: 1 });
  expect(result[1]).toStrictEqual({ x: 1, y: 5 });
  expect(result[2]).toMatchCloseTo({ x: 1.9, y: 4 }, 4);
});
