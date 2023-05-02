import { xyMaxY } from '../../index';

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

  it('with from to outside range', () => {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 1];
    expect(xyMaxY({ x, y }, { from: 10, to: 20 })).toBe(1);
  });
});
