import { xyJoinX } from '../../index';

describe('xyJoinX', () => {
  it('empty', () => {
    let data = { x: [], y: [] };

    expect(xyJoinX(data)).toStrictEqual({
      x: [],
      y: [],
    });
  });

  it('small', () => {
    let data = { x: [1], y: [2] };

    expect(xyJoinX(data)).toStrictEqual({
      x: [1],
      y: [2],
    });
  });

  it('no join', () => {
    let data = { x: [2, 4, 6], y: [1, 1, 1] };

    expect(xyJoinX(data)).toStrictEqual({
      x: [2, 4, 6],
      y: [1, 1, 1],
    });
  });

  it('full join', () => {
    let data = { x: [2, 4, 6], y: [1, 1, 1] };
    expect(xyJoinX(data, { delta: 5 })).toStrictEqual({
      x: [4],
      y: [3],
    });
  });

  it('full join 2', () => {
    let data = { x: [2, 4, 6], y: [1, 1, 1] };
    expect(xyJoinX(data, { delta: 2.5 })).toStrictEqual({
      x: [4],
      y: [3],
    });
  });

  it('partial join', () => {
    let data = { x: [2, 3, 6], y: [1, 1, 1] };
    expect(xyJoinX(data)).toStrictEqual({
      x: [2.5, 6],
      y: [2, 1],
    });
  });

  it('join with 0', () => {
    let data = { x: [2, 3, 6], y: [0, 0, 0] };
    expect(xyJoinX(data)).toStrictEqual({
      x: [2, 6],
      y: [0, 0],
    });
  });

  it('delta callback', () => {
    let data = { x: [2, 3, 4, 100, 1000], y: [1, 1, 1, 2, 3] };
    expect(xyJoinX(data, { delta: (x) => x / 1.5 })).toStrictEqual({
      x: [3, 100, 1000],
      y: [3, 2, 3],
    });
  });
});
