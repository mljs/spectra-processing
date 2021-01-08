import { xMinValue } from '../xMinValue';

test('xMinValue', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  expect(xMinValue([0])).toStrictEqual(0);
  expect(xMinValue([1])).toStrictEqual(1);
  expect(xMinValue([1, 2])).toStrictEqual(1);
  expect(xMinValue([1, 2, 1])).toStrictEqual(1);
  expect(xMinValue([3, 2, 1])).toStrictEqual(1);
  expect(xMinValue(typedArray)).toStrictEqual(1);
  expect(xMinValue([1, 2, 3], { fromIndex: 1 })).toStrictEqual(2);
  expect(xMinValue([3, 2, 1], { fromIndex: 1 })).toStrictEqual(1);
  expect(xMinValue([1, 2, 3], { toIndex: 1 })).toStrictEqual(1);
  expect(xMinValue([3, 2, 1], { toIndex: 1 })).toStrictEqual(2);
  expect(xMinValue([1, 2, 3], { fromIndex: 1, toIndex: 1 })).toStrictEqual(2);
  expect(xMinValue([3, 2, 1], { fromIndex: 1, toIndex: 1 })).toStrictEqual(2);
});
