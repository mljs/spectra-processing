import { xyObjectMinYPoint } from '../../index';

test('xyObjectMinYPoint', () => {
  const arrayXY = [
    { x: 1, y: 1 },
    { x: 3, y: 3 },
    { x: 2, y: 0 },
    { x: 0, y: 2 },
  ];

  expect(xyObjectMinYPoint(arrayXY)).toStrictEqual({ x: 2, y: 0, index: 2 });
});
