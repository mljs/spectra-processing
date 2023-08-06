import { xyObjectJoinX } from '../../index';

test('xyObjectJoinX', () => {
  const arrayXY = [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
  ];

  expect(xyObjectJoinX(arrayXY, { xError: 1.1 })).toStrictEqual([
    { x: 0.5, y: 2 },
    { x: 3.5, y: 4 },
  ]);

  const arrayXYzero = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
  ];

  expect(xyObjectJoinX(arrayXYzero, { xError: 1.1 })).toStrictEqual([
    { x: 0, y: 0 },
    { x: 3, y: 0 },
  ]);
});
