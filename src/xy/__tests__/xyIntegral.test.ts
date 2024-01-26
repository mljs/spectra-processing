import { xyIntegral } from '../../index';

describe('xyIntegral', () => {
  it('zero element', () => {
    const x: number[] = [];
    const y: number[] = [];
    expect(() => xyIntegral({ x, y })).toThrow(
      'data.x must have a length of at least 1',
    );
  });

  it('one element', () => {
    const x = [1];
    const y = [2];
    const result = xyIntegral({ x, y });
    expect(result).toStrictEqual({ x: [1], y: [0] });
  });

  it('no from to', () => {
    const x = [0, 1, 2, 3];
    const y = [1, 1, 1, 1];
    const result = xyIntegral({ x, y });
    expect(result).toStrictEqual({ x: [0, 1, 2, 3], y: [0, 1, 2, 3] });
  });

  it('no from to with xyIntegral', () => {
    const x = [0, 1, 2, 3];
    const y = [1, 1, 1, 1];
    const result = xyIntegral({ x, y }, { from: 1, to: 2 });
    expect(result).toStrictEqual({ x: [1, 2], y: [0, 1] });
  });

  it('xyIntegral too large', () => {
    const x = [1, 2, 3, 4];
    const y = [10, 20, 30, 40];
    const result = xyIntegral({ x, y }, { from: 2, to: 6 });
    expect(result).toStrictEqual({ x: [2, 3, 4], y: [0, 25, 60] });
  });

  it('no from to and inverse', () => {
    const x = [1, 2, 3, 4];
    const y = [10, 20, 30, 40];
    const result = xyIntegral({ x, y }, { reverse: true });
    expect(result).toStrictEqual({ x: [1, 2, 3, 4], y: [75, 60, 35, 0] });
  });
});