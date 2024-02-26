import { xyMinimaY } from '../xyMinimaY';

test('clear top', () => {
  const x = [1, 2, 3, 4, 5, 6];
  const y = [-2, -3, -1, -2, -3, -2];
  expect(xyMinimaY({ x, y })).toStrictEqual([
    { x: 2, y: -3, index: 1 },
    { x: 5, y: -3, index: 4 },
  ]);
});
