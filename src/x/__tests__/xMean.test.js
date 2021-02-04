import { xMean } from '../xMean';

test('xMean', () => {
  let typedArray = new Uint16Array(5);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;
  typedArray[3] = 4;
  typedArray[4] = 5;

  expect(xMean([0])).toStrictEqual(0);
  expect(xMean([1])).toStrictEqual(1);
  expect(xMean([1, 2])).toStrictEqual(1.5);
  expect(xMean([1, 2, 3])).toStrictEqual(2);
  expect(xMean([3, 2, 1])).toStrictEqual(2);
  expect(xMean(typedArray)).toStrictEqual(3);
  expect(xMean([1, 2, 3], { fromIndex: 1 })).toStrictEqual(2.5);
  expect(xMean([3, 2, 1], { fromIndex: 1 })).toStrictEqual(1.5);
  expect(xMean([1, 2, 3], { toIndex: 1 })).toStrictEqual(1.5);
  expect(xMean([3, 2, 1], { toIndex: 1 })).toStrictEqual(2.5);
  expect(xMean([1, 2, 3], { fromIndex: 1, toIndex: 1 })).toStrictEqual(2);
  expect(xMean([3, 2, 1], { fromIndex: 1, toIndex: 1 })).toStrictEqual(2);
});
