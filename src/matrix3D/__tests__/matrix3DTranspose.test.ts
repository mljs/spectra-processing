import { describe, it, expect } from 'vitest';

import { matrix3DTranspose } from '../matrix3DTranspose.ts';

describe('matrix3DTranspose', () => {
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

  it('should transpose the matrix correctly', () => {
    const result = matrix3DTranspose(matrix3D);
    expect(result.map((r) => r.map((c) => Array.from(c)))).toEqual([
      [[1, 5, 9], [2, 2, 1]],
      [[3, 8, 3], [5, 10, 5]],
      [[4, 9, 8], [8, 1, 4]]
    ]);
  });
});
