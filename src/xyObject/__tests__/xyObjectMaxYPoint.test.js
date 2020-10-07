import { xyObjectMaxXPoint } from '../xyObjectMaxXPoint';

test('xyObjectMaxXPoint', () => {
  let arrayXY = [
    { x: 1, y: 1 },
    { x: 3, y: 2 },
    { x: 2, y: 0 },
    { x: 0, y: 3 },
  ];

  expect(xyObjectMaxXPoint(arrayXY)).toStrictEqual({ x: 3, y: 2, index: 1 });
});
