import { maximaY } from '../maximaY.js';

describe('maximaY', function () {
  it('clear top', function () {
    let x = [1, 2, 3, 4, 5, 6];
    let y = [2, 3, 1, 2, 3, 2];
    expect(maximaY({ x, y })).toStrictEqual([{ x: 2, y: 3, index: 1 }, { x: 5, y: 3, index: 4 }]);
  });

  it('flat top', function () {
    let x = [0, 1, 2, 3, 4, 5];
    let y = [1, 2, 3, 3, 2, 1];
    expect(maximaY({ x, y }, { from: 0, to: 1 })).toStrictEqual([{ x: 2, y: 3, index: 2 }]);
  });

  it('large flat top', function () {
    let x = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let y = [1, 2, 3, 3, 3, 3, 3, 2, 1];
    expect(maximaY({ x, y }, { from: 0, to: 1 })).toStrictEqual([{ x: 5, y: 3, index: 4 }]);
  });
});
