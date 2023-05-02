import { xyObjectSumY } from '../../index';

test('xyObjectSumY', () => {
  let arrayXY = [
    { x: 0.9, y: 1 },
    { x: 1, y: 2 },
    { x: 1.01, y: 3 },
    { x: 1.9, y: 4 },
  ];

  expect(xyObjectSumY(arrayXY)).toBe(10);
});
