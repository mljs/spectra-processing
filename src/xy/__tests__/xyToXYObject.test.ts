import { xyToXYObject } from '../xyToXYObject';

test('xyToXYObject', () => {
  expect(xyToXYObject({ x: [1, 3, 2, 0], y: [1, 3, 2, 0] })).toStrictEqual([
    { x: 1, y: 1 },
    { x: 3, y: 3 },
    { x: 2, y: 2 },
    { x: 0, y: 0 },
  ]);
});
