import { expect, test } from 'vitest';

import { reimMatrixPhaseCorrection } from '../reimMatrixPhaseCorrection.ts';

test('reimMatrixPhaseCorrection: no correction when phi0 and phi1 are 0', () => {
  const data = {
    re: [Float64Array.from([0, 1, 2, 3]), Float64Array.from([4, 5, 6, 7])],
    im: [Float64Array.from([0, 1, 2, 3]), Float64Array.from([4, 5, 6, 7])],
  };

  const result = reimMatrixPhaseCorrection(data, 0, 0);

  expect(Array.from(result.re[0])).toStrictEqual(Array.from(data.re[0]));
  expect(Array.from(result.re[1])).toStrictEqual(Array.from(data.re[1]));
  expect(Array.from(result.im[0])).toStrictEqual(Array.from(data.im[0]));
  expect(Array.from(result.im[1])).toStrictEqual(Array.from(data.im[1]));
});

test('reimMatrixPhaseCorrection: direction rows by default', () => {
  const data = {
    re: [Float64Array.from([1, 0, 0, 0])],
    im: [Float64Array.from([0, 0, 0, 0])],
  };

  const resultDefault = reimMatrixPhaseCorrection(data, Math.PI / 4, 0);
  const resultRows = reimMatrixPhaseCorrection(data, Math.PI / 4, 0, {
    direction: 'rows',
  });

  expect(Array.from(resultDefault.re[0])).toStrictEqual(
    Array.from(resultRows.re[0]),
  );
  expect(Array.from(resultDefault.im[0])).toStrictEqual(
    Array.from(resultRows.im[0]),
  );
});

test('reimMatrixPhaseCorrection: zero order phase correction on rows', () => {
  const data = {
    re: [Float64Array.from([1, 0, 0, 0])],
    im: [Float64Array.from([0, 0, 0, 0])],
  };

  const result = reimMatrixPhaseCorrection(data, Math.PI, 0, {
    direction: 'rows',
  });

  // After applying pi phase, the real and imaginary parts should be negated
  expect(result.re[0][0]).toBeCloseTo(-1, 5);
  expect(result.im[0][0]).toBeCloseTo(0, 5);
});

test('reimMatrixPhaseCorrection: first order phase correction on rows', () => {
  const data = {
    re: [Float64Array.from([1, 1, 1, 1])],
    im: [Float64Array.from([0, 0, 0, 0])],
  };

  const result = reimMatrixPhaseCorrection(data, 0, Math.PI / 2, {
    direction: 'rows',
  });

  // With first order phase correction, different elements get different phases
  expect(result.re[0][0]).toBeCloseTo(1, 5); // First element gets phase 0
  expect(Math.hypot(result.re[0][3], result.im[0][3])).toBeCloseTo(1, 5); // Magnitude preserved
});

test('reimMatrixPhaseCorrection: combined zero and first order correction on rows', () => {
  const data = {
    re: [Float64Array.from([1, 1, 1, 1])],
    im: [Float64Array.from([0, 0, 0, 0])],
  };

  const result = reimMatrixPhaseCorrection(data, Math.PI / 4, Math.PI / 2, {
    direction: 'rows',
  });

  // All magnitudes should be preserved
  for (let i = 0; i < 4; i++) {
    const magnitude = Math.hypot(result.re[0][i], result.im[0][i]);

    expect(magnitude).toBeCloseTo(1, 5);
  }
});

test('reimMatrixPhaseCorrection: phase correction on columns', () => {
  const data = {
    re: [
      Float64Array.from([1, 0]),
      Float64Array.from([1, 0]),
      Float64Array.from([1, 0]),
      Float64Array.from([1, 0]),
    ],
    im: [
      Float64Array.from([0, 0]),
      Float64Array.from([0, 0]),
      Float64Array.from([0, 0]),
      Float64Array.from([0, 0]),
    ],
  };

  const result = reimMatrixPhaseCorrection(data, Math.PI / 4, 0, {
    direction: 'columns',
  });

  // All rows in the same column should be corrected the same way
  for (let i = 0; i < 4; i++) {
    expect(result.re[i][0]).toBeCloseTo(result.re[0][0], 5);
    expect(result.im[i][0]).toBeCloseTo(result.im[0][0], 5);
  }
});

test('reimMatrixPhaseCorrection: reverse option on rows', () => {
  const data = {
    re: [Float64Array.from([1, 1, 1, 1])],
    im: [Float64Array.from([0, 0, 0, 0])],
  };

  const resultForward = reimMatrixPhaseCorrection(
    structuredClone(data),
    0,
    Math.PI / 2,
    {
      direction: 'rows',
      reverse: false,
    },
  );

  const resultReverse = reimMatrixPhaseCorrection(data, 0, Math.PI / 2, {
    direction: 'rows',
    reverse: true,
  });

  // Reverse should apply phase in opposite direction
  // Both should have same magnitude but different phases for later elements
  for (let i = 0; i < 4; i++) {
    const magForward = Math.hypot(
      resultForward.re[0][i],
      resultForward.im[0][i],
    );
    const magReverse = Math.hypot(
      resultReverse.re[0][i],
      resultReverse.im[0][i],
    );

    expect(Math.abs(magForward - magReverse)).toBeLessThan(1e-14);
  }

  // But later elements should have different real parts
  expect(resultForward.re[0][2]).not.toBeCloseTo(resultReverse.re[0][2], 2);
});

test('reimMatrixPhaseCorrection: inPlace option creates new arrays when false', () => {
  const data = {
    re: [Float64Array.from([1, 2, 3])],
    im: [Float64Array.from([4, 5, 6])],
  };

  const result = reimMatrixPhaseCorrection(data, Math.PI / 4, 0, {
    inPlace: false,
  });

  // Results should not share array references with input
  expect(result.re[0]).not.toStrictEqual(data.re[0]);
  expect(result.im[0]).not.toStrictEqual(data.im[0]);
});

test('reimMatrixPhaseCorrection: inPlace option modifies original arrays when true', () => {
  const data = {
    re: [Float64Array.from([1, 0, 0, 0])],
    im: [Float64Array.from([0, 0, 0, 0])],
  };

  const originalReBuffer = data.re[0].buffer;
  const originalImBuffer = data.im[0].buffer;

  const result = reimMatrixPhaseCorrection(data, Math.PI / 2, 0, {
    inPlace: true,
  });

  // Results should share the same array buffers
  expect(result.re[0].buffer).toStrictEqual(originalReBuffer);
  expect(result.im[0].buffer).toStrictEqual(originalImBuffer);
});

test('reimMatrixPhaseCorrection: multiple rows with row-wise correction', () => {
  const data = {
    re: [
      Float64Array.from([1, 1, 1, 1]),
      Float64Array.from([2, 2, 2, 2]),
      Float64Array.from([3, 3, 3, 3]),
    ],
    im: [
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
    ],
  };

  const result = reimMatrixPhaseCorrection(data, Math.PI / 4, Math.PI / 6, {
    direction: 'rows',
  });

  // Each row should be corrected independently
  expect(result.re).toHaveLength(3);
  expect(result.im).toHaveLength(3);

  // Magnitude of each row should be preserved
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const expectedMagnitude = row + 1; // Original magnitude
      const actualMagnitude = Math.hypot(
        result.re[row][col],
        result.im[row][col],
      );

      expect(actualMagnitude).toBeCloseTo(expectedMagnitude, 5);
    }
  }
});

test('reimMatrixPhaseCorrection: multiple columns with column-wise correction', () => {
  const data = {
    re: [
      Float64Array.from([1, 2, 3]),
      Float64Array.from([1, 2, 3]),
      Float64Array.from([1, 2, 3]),
      Float64Array.from([1, 2, 3]),
    ],
    im: [
      Float64Array.from([0, 0, 0]),
      Float64Array.from([0, 0, 0]),
      Float64Array.from([0, 0, 0]),
      Float64Array.from([0, 0, 0]),
    ],
  };

  const result = reimMatrixPhaseCorrection(data, Math.PI / 4, Math.PI / 6, {
    direction: 'columns',
  });

  // Each column should be corrected independently
  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 4; row++) {
      const expectedMagnitude = col + 1;
      const actualMagnitude = Math.hypot(
        result.re[row][col],
        result.im[row][col],
      );

      expect(actualMagnitude).toBeCloseTo(expectedMagnitude, 5);
    }
  }
});

test('reimMatrixPhaseCorrection: empty matrix', () => {
  const data = { re: [], im: [] };

  const result = reimMatrixPhaseCorrection(data, Math.PI / 4, Math.PI / 6);

  expect(result.re).toStrictEqual([]);
  expect(result.im).toStrictEqual([]);
});

test('reimMatrixPhaseCorrection: single element', () => {
  const data = {
    re: [Float64Array.from([5])],
    im: [Float64Array.from([0])],
  };

  const result = reimMatrixPhaseCorrection(data, Math.PI / 4, 0);

  expect(result.re[0][0]).toBeCloseTo(5 * Math.cos(Math.PI / 4), 5);
  expect(result.im[0][0]).toBeCloseTo(5 * Math.sin(Math.PI / 4), 5);
});

test('reimMatrixPhaseCorrection: throws RangeError when rows have different lengths', () => {
  const data = {
    re: [
      Float64Array.from([1, 0, 0, 0]),
      Float64Array.from([0, 1, 0, 0, 0, 0, 0, 0]),
    ],
    im: [
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0, 0, 0, 0, 0]),
    ],
  };

  expect(() => reimMatrixPhaseCorrection(data, Math.PI / 4, 0)).toThrowError(
    RangeError,
  );
});

test('reimMatrixPhaseCorrection: throws RangeError indicating which row has the wrong length', () => {
  const data = {
    re: [
      Float64Array.from([1, 0, 0, 0]),
      Float64Array.from([0, 1, 0, 0]),
      Float64Array.from([0, 0, 1, 0, 0, 0, 0, 0]),
    ],
    im: [
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0]),
      Float64Array.from([0, 0, 0, 0, 0, 0, 0, 0]),
    ],
  };

  expect(() => reimMatrixPhaseCorrection(data, Math.PI / 4, 0)).toThrowError(
    /row 2/,
  );
});

test('reimMatrixPhaseCorrection: handles undefined options gracefully', () => {
  const data = {
    re: [Float64Array.from([1, 0, 0, 0])],
    im: [Float64Array.from([0, 0, 0, 0])],
  };

  const result = reimMatrixPhaseCorrection(data);

  expect(result.re).toHaveLength(1);
  expect(result.im).toHaveLength(1);
});

test('reimMatrixPhaseCorrection: handles NaN and Infinity gracefully', () => {
  const data = {
    re: [Float64Array.from([1, 0, 0, 0])],
    im: [Float64Array.from([0, 0, 0, 0])],
  };

  const result = reimMatrixPhaseCorrection(data, Number.NaN, Infinity);

  // NaN and Infinity should be converted to 0
  expect(Array.from(result.re[0])).toStrictEqual(Array.from(data.re[0]));
  expect(Array.from(result.im[0])).toStrictEqual(Array.from(data.im[0]));
});

test('reimMatrixPhaseCorrection: all options combined', () => {
  const data = {
    re: [Float64Array.from([1, 1, 1, 1]), Float64Array.from([2, 2, 2, 2])],
    im: [Float64Array.from([0, 0, 0, 0]), Float64Array.from([0, 0, 0, 0])],
  };

  const result = reimMatrixPhaseCorrection(data, Math.PI / 6, Math.PI / 4, {
    reverse: true,
    inPlace: false,
    direction: 'rows',
  });

  // Verify it produces a valid result
  expect(result.re).toHaveLength(2);
  expect(result.im).toHaveLength(2);

  // Magnitudes should be preserved
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      const expectedMagnitude = row + 1;
      const actualMagnitude = Math.hypot(
        result.re[row][col],
        result.im[row][col],
      );

      expect(actualMagnitude).toBeCloseTo(expectedMagnitude, 5);
    }
  }
});

test('reimMatrixPhaseCorrection: preserves magnitude along all directions', () => {
  const data = {
    re: [Float64Array.from([3, 4, 5]), Float64Array.from([6, 8, 10])],
    im: [Float64Array.from([4, 3, 12]), Float64Array.from([8, 6, 24])],
  };

  const originalMagnitudes = data.re.map((row, i) =>
    row.map((r, j) => Math.hypot(r, data.im[i][j])),
  );

  const result = reimMatrixPhaseCorrection(data, Math.PI / 3, Math.PI / 6, {
    direction: 'rows',
  });

  // Verify magnitudes are preserved
  for (let row = 0; row < data.re.length; row++) {
    for (let col = 0; col < data.re[row].length; col++) {
      const magnitude = Math.hypot(result.re[row][col], result.im[row][col]);

      expect(magnitude).toBeCloseTo(originalMagnitudes[row][col], 5);
    }
  }
});
