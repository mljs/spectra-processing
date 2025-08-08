import { expect, test } from 'vitest';

import { xyObjectNormedY } from '../xyObjectNormedY';

test('xyObjectNormedY', () => {
  const arrayXY = [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
  ];
  const result = xyObjectNormedY(arrayXY, { algorithm: 'max', value: 100 });

  expect(result).toStrictEqual([
    { x: 1, y: 25 },
    { x: 2, y: 50 },
    { x: 3, y: 75 },
    { x: 4, y: 100 },
  ]);
});
