import { xyObjectMinXPoint } from '../xyObjectMinXPoint';

test('xyObjectMinXPoint', () => {
  let arrayXY = [
    { x: 1, y: 1 },
    { x: 3, y: 2 },
    { x: 2, y: 0 },
    { x: 0, y: 3 },
  ];

  expect(xyObjectMinXPoint(arrayXY)).toStrictEqual({ x: 0, y: 3, index: 3 });
});
