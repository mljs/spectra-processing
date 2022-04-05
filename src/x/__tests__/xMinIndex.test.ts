/* eslint-disable no-tabs */
import { xMinIndex } from '../xMinIndex';

describe('array-xMinIndex', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

	let anotherArray = new Uint16Array(4);
	anotherArray[0] = 3;
	anotherArray[1] = 5;
	anotherArray[2] = 4;
	anotherArray[3] = 1;

  it('should return the argmin', () => {
    expect(xMinIndex([0])).toBe(0);
    expect(xMinIndex([1])).toBe(0);
    expect(xMinIndex([1, 2])).toBe(0);
    expect(xMinIndex([1, 2, 1])).toBe(0);
    expect(xMinIndex([3, 2, 1])).toBe(2);
    expect(xMinIndex(typedArray)).toBe(0);
		expect(xMinIndex([4,4,4,4,4])).toBe(0);
		expect(xMinIndex(anotherArray)).toBe(3);
  });
});
