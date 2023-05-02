import { xMinMaxValues } from '../../index';

test('xMinMaxValues', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  expect(xMinMaxValues([0])).toStrictEqual({ min: 0, max: 0 });
  expect(xMinMaxValues([1])).toStrictEqual({ min: 1, max: 1 });
  expect(xMinMaxValues([1, 2])).toStrictEqual({ min: 1, max: 2 });
  expect(xMinMaxValues([1, 2, 1])).toStrictEqual({ min: 1, max: 2 });
  expect(xMinMaxValues([3, 2, 1])).toStrictEqual({ min: 1, max: 3 });
  expect(xMinMaxValues(typedArray)).toStrictEqual({ min: 1, max: 3 });
});
