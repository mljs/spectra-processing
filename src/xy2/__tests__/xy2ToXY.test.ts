import { xy2ToXY } from '../xy2ToXY';

test('xy2ToXY', () => {
  expect(
    xy2ToXY([
      [1, 2],
      [2, 4],
      [5, 4],
      [8, 5],
    ]),
  ).toStrictEqual({ x: [1, 2, 5, 8], y: [2, 4, 4, 5] });
});
