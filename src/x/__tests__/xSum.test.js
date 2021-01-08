import { xSum } from '../xSum';

test('xSum', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  expect(xSum([0])).toStrictEqual(0);
  expect(xSum([1])).toStrictEqual(1);
  expect(xSum([1, 2])).toStrictEqual(3);
  expect(xSum([1, 2, 1])).toStrictEqual(4);
  expect(xSum([3, 2, 1])).toStrictEqual(6);
  expect(xSum(typedArray)).toStrictEqual(6);
  expect(xSum([1, 2, 3], { fromIndex: 1 })).toStrictEqual(5);
  expect(xSum([3, 2, 1], { fromIndex: 1 })).toStrictEqual(3);
  expect(xSum([1, 2, 3], { toIndex: 1 })).toStrictEqual(3);
  expect(xSum([3, 2, 1], { toIndex: 1 })).toStrictEqual(5);
  expect(xSum([1, 2, 3], { fromIndex: 1, toIndex: 1 })).toStrictEqual(2);
  expect(xSum([3, 2, 1], { fromIndex: 1, toIndex: 1 })).toStrictEqual(2);
});
