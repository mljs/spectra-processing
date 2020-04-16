import { getNMaxY } from '../getNMaxY.js';

describe('getNMaxY', () => {
  it('number max peaks bigger than spectrum length', () => {
    let spectrum = { x: [1, 2, 3, 4], y: [1, 2, 3, 4] };
    let result = getNMaxY(spectrum, 6);
    expect(result.x).toHaveLength(4);
    let result2 = getNMaxY(spectrum, 4);
    expect(result2.x).toHaveLength(4);
    expect(result).toStrictEqual({ x: [1, 2, 3, 4], y: [1, 2, 3, 4] });
  });
  it('should return one peak', () => {
    let spectrum = { x: [1, 2, 3, 4], y: [1, 2, 3, 4] };
    let result = getNMaxY(spectrum, 1);
    expect(result).toStrictEqual({ x: [4], y: [4] });
  });
  it('should throw error', () => {
    let spectrum = { x: [1, 5], y: [1, 2, 3, 4] };
    expect(() => getNMaxY(spectrum, 1)).toThrow(
      'The x and y arrays mush have the same length',
    );
  });
  it('bigger spectrum', () => {
    let spectrum = {
      x: [1, 5, 7, 3, 1, 8, 9, 13, 40, 3, 4],
      y: [1, 5, 7, 3, 1, 8, 9, 13, 40, 3, 4],
    };
    let result = getNMaxY(spectrum, 3);
    expect(result).toStrictEqual({ x: [9, 13, 40], y: [9, 13, 40] });
  });
  it('test repeating values', () => {
    let spectrum = {
      x: [1, 5, 7, 3, 1, 8, 9, 13, 40, 3, 4],
      y: [1, 5, 7, 3, 1, 40, 51, 40, 40, 3, 4],
    };
    let result = getNMaxY(spectrum, 3);
    expect(result).toStrictEqual({ x: [8, 9, 13], y: [40, 51, 40] });
  });
});
