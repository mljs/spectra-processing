import { xyObjectSortX } from '../xyObjectSortX';

test('xyObjectSortX', () => {
  const arrayXY = [
    { x: 1, y: 1 },
    { x: 3, y: 3 },
    { x: 2, y: 2 },
    { x: 0, y: 0 },
  ];

  expect(xyObjectSortX(arrayXY)).toStrictEqual([
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
  ]);
});
