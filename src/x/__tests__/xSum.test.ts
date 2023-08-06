import { xSum } from '../../index';

test('xSum', () => {
  const typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  expect(xSum([0])).toBe(0);
  expect(xSum([1])).toBe(1);
  expect(xSum([1, 2])).toBe(3);
  expect(xSum([1, 2, 1])).toBe(4);
  expect(xSum([3, 2, 1])).toBe(6);
  expect(xSum(typedArray)).toBe(6);
  expect(xSum([1, 2, 3], { fromIndex: 1 })).toBe(5);
  expect(xSum([3, 2, 1], { fromIndex: 1 })).toBe(3);
  expect(xSum([1, 2, 3], { toIndex: 1 })).toBe(3);
  expect(xSum([3, 2, 1], { toIndex: 1 })).toBe(5);
  expect(xSum([1, 2, 3], { fromIndex: 1, toIndex: 1 })).toBe(2);
  expect(xSum([3, 2, 1], { fromIndex: 1, toIndex: 1 })).toBe(2);
});
