import { xyMinimaY } from '../xyMinimaY';

describe('xyMinimaY', () => {
  it('clear top', () => {
    let x = [1, 2, 3, 4, 5, 6];
    let y = [-2, -3, -1, -2, -3, -2];
    expect(xyMinimaY({ x, y })).toStrictEqual([
      { x: 2, y: -3, index: 1 },
      { x: 5, y: -3, index: 4 },
    ]);
  });
});
