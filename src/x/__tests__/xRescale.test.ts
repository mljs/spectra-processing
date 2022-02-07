import { xRescale } from '../xRescale';

describe('xRescale', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  it('should return a rescaled array', () => {
    expect(xRescale([0, 2])).toStrictEqual([0, 1]);
    expect(xRescale([0, 1])).toStrictEqual([0, 1]);
    expect(xRescale([0, 1, 2])).toStrictEqual([0, 0.5, 1]);
    expect(xRescale([0, 1, 2])).toStrictEqual([0, 0.5, 1]);
  });

  it('should throw min == max', () => {
    expect(() => xRescale([1, 1])).toThrow(
      /minimum and maximum input values are equal\. Cannot rescale a constant array/,
    );
  });

  it('should fill the provided output', () => {
    const array = [0, 1, 2, 3, 4];
    const output = new Array(5);
    xRescale(array, { output });
    expect(output).toStrictEqual([0, 0.25, 0.5, 0.75, 1]);
    expect(array).toStrictEqual([0, 1, 2, 3, 4]);
  });

  it('should work in-place', () => {
    const array = [0, 1, 2, 3, 4];
    xRescale(array, { output: array });
    expect(array).toStrictEqual([0, 0.25, 0.5, 0.75, 1]);
  });

  it('should work with custom min/max', () => {
    expect(xRescale([0, 1, 2], { min: -1, max: 1 })).toStrictEqual([-1, 0, 1]);
    expect(xRescale(typedArray, { min: -1, max: 1 })).toStrictEqual([-1, 0, 1]);
    expect(xRescale([0, 1, 2], { min: 0.5 })).toStrictEqual([0.5, 0.75, 1]);
    expect(xRescale([0, 1, 2], { max: 0.5 })).toStrictEqual([0, 0.25, 0.5]);
    expect(xRescale([0, 1, 2], { min: 50, max: 100 })).toStrictEqual([
      50, 75, 100,
    ]);
    expect(xRescale([-25, 0, 25, 50, 75], { min: -50, max: 0 })).toStrictEqual([
      -50, -37.5, -25, -12.5, 0,
    ]);
  });

  it('should throw on bad inputs', () => {
    expect(() => xRescale([0, 1, 2], { min: 2 })).toThrow(
      /min option must be smaller than max option/,
    );
    expect(() => xRescale([0, 1, 2], { max: -1 })).toThrow(
      /min option must be smaller than max option/,
    );
    expect(() => xRescale([0, 1, 2], { min: 2, max: 0 })).toThrow(
      /min option must be smaller than max option/,
    );
    expect(() => xRescale([0, 1, 2], { min: 1, max: 1 })).toThrow(
      /min option must be smaller than max option/,
    );
    expect(() => xRescale([], { min: 0, max: 1 })).toThrow(
      /input must not be empty/,
    );
  });

  it('should work with current min/max', () => {
    expect(xRescale([0, 1, 2], { min: 1, autoMinMax: true })).toStrictEqual([
      1, 1.5, 2,
    ]);
    expect(xRescale([0, 1, 2], { max: 3, autoMinMax: true })).toStrictEqual([
      0, 1.5, 3,
    ]);
  });
});
