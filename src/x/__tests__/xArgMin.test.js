import xArgMin from '../xArgMin';

describe('array-argmin', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  it('should return the argmin', () => {
    expect(xArgMin([0])).toStrictEqual(0);
    expect(xArgMin([1])).toStrictEqual(0);
    expect(xArgMin([1, 2])).toStrictEqual(0);
    expect(xArgMin([1, 2, 1])).toStrictEqual(0);
    expect(xArgMin([3, 2, 1])).toStrictEqual(2);
    expect(xArgMin(typedArray)).toStrictEqual(0);
  });
  it('should throw on invalid value', () => {
    expect(() => xArgMin()).toThrow(/input must be an array/);
    expect(() => xArgMin([])).toThrow(/input must not be empty/);
  });
});
