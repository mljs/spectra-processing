import { xyObjectMaxYPoint } from '../../index';

test('xyObjectMaxYPoint', () => {
  let arrayXY = [
    { x: 1, y: 1 },
    { x: 3, y: 3 },
    { x: 2, y: 0 },
    { x: 0, y: 2 },
  ];

  expect(xyObjectMaxYPoint(arrayXY)).toStrictEqual({ x: 3, y: 3, index: 1 });
});
