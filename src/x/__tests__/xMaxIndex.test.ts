import { xMaxIndex } from '../../index';

describe('array-xMaxIndex', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  let anotherArray = Uint16Array.from([3, 5, 4, 1]);

  it('should return the argmax', () => {
    expect(xMaxIndex([0])).toBe(0);
    expect(xMaxIndex([1])).toBe(0);
    expect(xMaxIndex([1, 2])).toBe(1);
    expect(xMaxIndex([1, 2, 1])).toBe(1);
    expect(xMaxIndex([3, 2, 1])).toBe(0);
    expect(xMaxIndex([4, 4, 4, 4, 4])).toBe(0);
    expect(xMaxIndex([5, 3, 6, 8, 4])).toBe(3);
    expect(xMaxIndex(typedArray)).toBe(2);
    expect(xMaxIndex([1, 2, 3], { fromIndex: 1, toIndex: 1 })).toBe(1);
    expect(xMaxIndex(anotherArray, { fromIndex: 0, toIndex: 2 })).toBe(1);
  });
});
