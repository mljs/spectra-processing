import { xRolling } from '../xRolling';

test('xRolling', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  expect(() => xRolling(array)).toThrow('fct must be a function');
  // prettier-ignore
  expect(xRolling(array, () => 1, { window: 5 })).toStrictEqual([
    1, 1, 1, 1, 1
  ]);
});
