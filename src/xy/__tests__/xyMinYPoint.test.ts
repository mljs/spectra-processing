import { xyMinYPoint } from '../../index';

describe('xyMinYPoint', () => {
  it('no from to', () => {
    const x = [0, 1, 2, 3];
    const y = [1, 2, 3, 1];
    expect(xyMinYPoint({ x, y })).toStrictEqual({ x: 0, y: 1, index: 0 });
  });

  it('with from to', () => {
    const x = [0, 1, 2, 3];
    const y = [2, 2, 1, 3];
    expect(xyMinYPoint({ x, y }, { from: 0, to: 2 })).toStrictEqual({
      x: 2,
      y: 1,
      index: 2,
    });
  });

  it('with from to inverted', () => {
    const x = [0, 1, 2, 3];
    const y = [2, 2, 1, 3];
    expect(xyMinYPoint({ x, y }, { from: 3, to: 0 })).toStrictEqual({
      x: 2,
      y: 1,
      index: 2,
    });
  });
});
