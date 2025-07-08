import { describe, it, expect } from 'vitest';

import { getZArray } from '../getZArray.ts';

describe('getZArray', () => {
  const matrix3D = [
    [
      [1, 3, 4],
      [2, 5, 8]
    ],
    [
      [5, 8, 9],
      [2, 10, 1]
    ],
    [
      [9, 3, 8],
      [1, 5, 4]
    ]
  ];

  it('should extract the correct z-array for {r: 0, c: 1}', () => {
    const result = getZArray(matrix3D, { r: 0, c: 1 });
    expect(Array.from(result)).toEqual([3, 8, 3]);
  });

  it('should extract the correct z-array for {r: 1, c: 2}', () => {
    const result = getZArray(matrix3D, { r: 1, c: 2 });
    expect(Array.from(result)).toEqual([8, 1, 4]);
  });
});
