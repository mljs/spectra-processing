import { xyIntegral } from '../xyIntegral';

describe('xyIntegral', () => {
  it('zero element', () => {
    let x: number[] = [];
    let y: number[] = [];
    expect(() => xyIntegral({ x, y })).toThrow(
      'data.x must have a length of at least 1',
    );
  });

  it('one element', () => {
    let x = [1];
    let y = [2];
    let result = xyIntegral({ x, y });
    expect(result).toStrictEqual({ x: [1], y: [0] });
  });

  it('no from to', () => {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let result = xyIntegral({ x, y });
    expect(result).toStrictEqual({ x: [0, 1, 2, 3], y: [0, 1, 2, 3] });
  });

  it('no from to with xyIntegral', () => {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let result = xyIntegral({ x, y }, { from: 1, to: 2 });
    expect(result).toStrictEqual({ x: [1, 2], y: [0, 1] });
  });

  it('xyIntegral too large', () => {
    let x = [1, 2, 3, 4];
    let y = [10, 20, 30, 40];
    let result = xyIntegral({ x, y }, { from: 2, to: 6 });
    expect(result).toStrictEqual({ x: [2, 3, 4], y: [0, 25, 60] });
  });

  it('no from to and inverse', () => {
    let x = [1, 2, 3, 4];
    let y = [10, 20, 30, 40];
    let result = xyIntegral({ x, y }, { reverse: true });
    expect(result).toStrictEqual({ x: [1, 2, 3, 4], y: [75, 60, 35, 0] });
  });
});
