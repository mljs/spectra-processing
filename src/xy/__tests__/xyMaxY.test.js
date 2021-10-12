import { xyMaxY } from '../xyMaxY.js';

describe('xyMaxY', () => {
  it('no from to', () => {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 1];
    expect(xyMaxY({ x, y })).toBe(3);
  });

  it('with from to', () => {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 1];
    expect(xyMaxY({ x, y }, { from: 0, to: 1 })).toBe(2);
  });
});
