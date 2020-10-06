import xArgMax from '../xArgMax';

describe('array-argmax', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  it('should return the argmax', () => {
    expect(xArgMax([0])).toBe(0);
    expect(xArgMax([1])).toBe(0);
    expect(xArgMax([1, 2])).toBe(1);
    expect(xArgMax([1, 2, 1])).toBe(1);
    expect(xArgMax([3, 2, 1])).toBe(0);
    expect(xArgMax(typedArray)).toBe(2);
  });
  it('should throw on invalid value', () => {
    expect(() => xArgMax()).toThrow(/input must be an array/);
    expect(() => xArgMax([])).toThrow(/input must not be empty/);
  });
});
