import { xMinMaxDelta } from '../../index';

test('xMinMaxDelta', () => {
  const typedArray = new Uint16Array(6);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;
  typedArray[3] = 4;
  typedArray[4] = 6;
  typedArray[5] = 7;

  expect(xMinMaxDelta(typedArray)).toStrictEqual({ min: 1, max: 2 });
});
