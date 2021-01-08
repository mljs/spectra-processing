import { xMaxValue } from '../xMaxValue';

test('xMaxValue', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  expect(xMaxValue([0])).toStrictEqual(0);
  expect(xMaxValue([1])).toStrictEqual(1);
  expect(xMaxValue([1, 2])).toStrictEqual(2);
  expect(xMaxValue([1, 2, 1])).toStrictEqual(2);
  expect(xMaxValue([3, 2, 1])).toStrictEqual(3);
  expect(xMaxValue(typedArray)).toStrictEqual(3);
  expect(xMaxValue([1, 2, 3], { fromIndex: 1 })).toStrictEqual(3);
  expect(xMaxValue([3, 2, 1], { fromIndex: 1 })).toStrictEqual(2);
  expect(xMaxValue([1, 2, 3], { toIndex: 1 })).toStrictEqual(2);
  expect(xMaxValue([3, 2, 1], { toIndex: 1 })).toStrictEqual(3);
  expect(xMaxValue([1, 2, 3], { fromIndex: 1, toIndex: 1 })).toStrictEqual(2);
  expect(xMaxValue([3, 2, 1], { fromIndex: 1, toIndex: 1 })).toStrictEqual(2);
});
