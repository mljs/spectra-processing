import { xMode } from '../xMode';

describe('array-mode', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 2;
  typedArray[1] = 3;
  typedArray[2] = 1;

  it('should return the mode', () => {
    expect(xMode([0])).toBe(0);
    expect(xMode([1])).toBe(1);
    expect(xMode([1, 2])).toBe(1);
    expect(xMode([1, 2, 1])).toBe(1);
    expect(xMode([2, 3, 1])).toBe(2);
    expect(xMode(typedArray)).toBe(2);
    expect(xMode([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4])).toBe(4);
  });

  it('should throw on invalid value', () => {
    expect(() => xMode([])).toThrow(/input must not be empty/);
  });
});
