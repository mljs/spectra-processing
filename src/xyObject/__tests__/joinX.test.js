import { joinX } from '../joinX';

test('joinX', () => {
  let arrayXY = [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
  ];

  expect(joinX(arrayXY, { threshold: 1.1 })).toStrictEqual([
    { x: 0.5, y: 2 },
    { x: 3.5, y: 4 },
  ]);
});
