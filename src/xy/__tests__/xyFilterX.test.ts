import { xyFilterX } from '../xyFilterX';

describe('xyFilterX', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const points = { x, y };

  it('no filter', () => {
    let result = xyFilterX(points);
    expect(result).toStrictEqual({
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    });
  });

  it('keep 2 zones', () => {
    let result = xyFilterX(points, {
      zones: [
        { from: 1, to: 2 },
        { from: 5, to: 7 },
      ],
    });
    expect(result).toStrictEqual({
      x: [1, 2, 5, 6, 7],
      y: [2, 3, 6, 7, 8],
    });
  });

  it('from filter', () => {
    let result = xyFilterX(points, { from: 5 });
    expect(result).toStrictEqual({
      x: [5, 6, 7, 8, 9, 10],
      y: [6, 7, 8, 9, 10, 11],
    });
  });

  it('to filter', () => {
    let result = xyFilterX(points, { to: 5 });
    expect(result).toStrictEqual({
      x: [0, 1, 2, 3, 4, 5],
      y: [1, 2, 3, 4, 5, 6],
    });
  });

  it('from / to filter', () => {
    let result = xyFilterX(points, { from: 3, to: 5 });
    expect(result).toStrictEqual({
      x: [3, 4, 5],
      y: [4, 5, 6],
    });
  });

  it('one exclusion', () => {
    let result = xyFilterX(points, { exclusions: [{ from: 2, to: 8 }] });
    expect(result).toStrictEqual({
      x: [0, 1, 2, 8, 9, 10],
      y: [1, 2, 3, 9, 10, 11],
    });
  });

  it('exclusions and from, to', () => {
    let result = xyFilterX(points, {
      from: 2.5,
      to: 8.5,
      exclusions: [
        { from: 2, to: 4.5 },
        { from: 5.5, to: 8 },
      ],
    });
    expect(result).toStrictEqual({
      x: [5, 8],
      y: [6, 9],
    });
  });

  it('exclusions and other from, to', () => {
    let result = xyFilterX(points, {
      from: -5,
      to: 20,
      exclusions: [
        { from: 2, to: 4.5 },
        { from: 5.5, to: 8 },
      ],
    });
    expect(result).toStrictEqual({
      x: [0, 1, 2, 5, 8, 9, 10],
      y: [1, 2, 3, 6, 9, 10, 11],
    });
  });
});
