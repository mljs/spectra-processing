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

  it('flat top', () => {
    let x = [0, 1, 2, 3, 4, 5];
    let y = [-1, -2, -3, -3, -2, -1];
    let minima = xyMinimaY({ x, y }, { from: 0, to: 1 });
    expect(minima).toStrictEqual([{ x: 2, y: -3, index: 2 }]);
  });

  it('large flat top', () => {
    let x = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let y = [-1, -2, -3, -3, -3, -3, -3, -2, -1];
    let minima = xyMinimaY({ x, y }, { from: 0, to: 1 });
    expect(minima).toStrictEqual([{ x: 5, y: -3, index: 4 }]);
  });

  it('2 large flat top', () => {
    let x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    let y = [-1, -2, -3, -3, -3, -3, -3, -2, -1, -2, -2, -2, -2, -1];
    expect(xyMinimaY({ x, y }, { from: 0, to: 1 })).toStrictEqual([
      { x: 5, y: -3, index: 4 },
      { x: 11, y: -2, index: 10 },
    ]);
  });
});
