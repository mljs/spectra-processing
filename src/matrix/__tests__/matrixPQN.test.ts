import { FifoLogger } from 'fifo-logger';
import { expect, test } from 'vitest';

import { xSum } from '../../x/index.ts';
import { matrixPQN } from '../matrixPQN.ts';

function toRows(values: number[][]) {
  return values.map((row) => Float64Array.from(row));
}

test('a diluted spectrum with an extra peak recovers its dilution', () => {
  // B is the common profile at the same concentration as the others plus one
  // metabolite of its own: an integral normalization alone would shrink its
  // common signals to half, the median quotient brings them back.
  const data = [
    [2, 2, 2, 2],
    [1, 1, 1, 5],
    [0.5, 0.5, 0.5, 0.5],
  ];
  const result = matrixPQN(data, { max: 4 });

  expect(result.data).toStrictEqual(
    toRows([
      [1, 1, 1, 1],
      [1, 1, 1, 5],
      [1, 1, 1, 1],
    ]),
  );
  expect(result.medianOfQuotients).toStrictEqual([1, 0.5, 1]);
});

test('one median quotient per spectrum, whatever the number of variables', () => {
  const data = [
    [1, 2, 3, 4, 5],
    [2, 4, 6, 8, 10],
  ];
  const result = matrixPQN(data);

  expect(result.medianOfQuotients).toHaveLength(2);
  expect(result.data[0]).toStrictEqual(result.data[1]);
  expect(xSum(result.data[0] ?? [])).toBeCloseTo(100, 10);
});

test('variables absent from the reference are left out of the quotients', () => {
  const data = [
    [0, 1, 1, 2],
    [0, 1, 1, 2],
    [4, 1, 1, 2],
  ];
  const result = matrixPQN(data, { max: 1 });

  expect(result.medianOfQuotients.every(Number.isFinite)).toBe(true);
  expect(result.data[0]).toStrictEqual(Float64Array.from([0, 0.25, 0.25, 0.5]));
});

// Two controls, the second three times more concentrated, and three cases
// with one metabolite raised.
const controlsAndCases = [
  [1, 1, 1, 1, 1],
  [3, 3, 3, 3, 3],
  [1, 1, 1, 1, 6],
  [1, 1, 1, 1, 6],
  [1, 1, 1, 1, 6],
];

test('the median of every spectrum is the default reference', () => {
  const result = matrixPQN(controlsAndCases, { max: 5 });

  expect(result.medianOfQuotients).toStrictEqual([2, 2, 1, 1, 1]);
  expect(result.data).toStrictEqual(
    toRows([
      [0.5, 0.5, 0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5, 0.5, 3],
      [0.5, 0.5, 0.5, 0.5, 3],
      [0.5, 0.5, 0.5, 0.5, 3],
    ]),
  );
});

test('referenceRows takes the median of the control spectra as reference', () => {
  const result = matrixPQN(controlsAndCases, {
    max: 5,
    referenceRows: [0, 1],
  });

  expect(result.medianOfQuotients).toStrictEqual([1, 1, 0.5, 0.5, 0.5]);
  expect(result.data).toStrictEqual(
    toRows([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 6],
      [1, 1, 1, 1, 6],
      [1, 1, 1, 1, 6],
    ]),
  );
});

test('a given reference is brought to the integral max first', () => {
  const fromRows = matrixPQN(controlsAndCases, {
    max: 5,
    referenceRows: [0, 1],
  });
  const fromReference = matrixPQN(controlsAndCases, {
    max: 5,
    reference: [10, 10, 10, 10, 10],
  });

  expect(fromReference).toStrictEqual(fromRows);
});

test('invalid references throw', () => {
  expect(() => matrixPQN(controlsAndCases, { reference: [1, 1, 1] })).toThrow(
    'reference must have 5 values, one per column, not 3',
  );
  expect(() => matrixPQN(controlsAndCases, { referenceRows: [] })).toThrow(
    'referenceRows must contain at least one row',
  );
  expect(() => matrixPQN(controlsAndCases, { referenceRows: [0, 5] })).toThrow(
    'row indices are out of range',
  );
  expect(() =>
    matrixPQN(controlsAndCases, {
      reference: [1, 1, 1, 1, 1],
      referenceRows: [0],
    }),
  ).toThrow('reference and referenceRows cannot be used together');
});

test('variables where the reference is below minReferenceRatio of its maximum are left out', () => {
  // The four baseline variables outnumber the three peaks.
  const reference = [10, 10, 10, 0.05, 0.05, 0.05, 0.05];
  const spectrum = [10, 10, 10, 0.15, 0.15, 0.15, 0.15];
  const peaksOnly = matrixPQN([spectrum], { reference });
  const everything = matrixPQN([spectrum], {
    reference,
    minReferenceRatio: 0,
  });

  expect(peaksOnly.medianOfQuotients[0]).toBeCloseTo(30.2 / 30.6, 12);
  expect(peaksOnly.data[0]?.[0]).toBeCloseTo(1000 / 30.2, 12);
  expect(everything.medianOfQuotients[0]).toBeCloseTo((3 * 30.2) / 30.6, 12);
});

test('minReferenceRatio must be at least 0 and below 1', () => {
  expect(() => matrixPQN([[1, 2]], { minReferenceRatio: -0.1 })).toThrow(
    'minReferenceRatio must be at least 0 and below 1, not -0.1',
  );
  expect(() => matrixPQN([[1, 2]], { minReferenceRatio: 1 })).toThrow(
    'minReferenceRatio must be at least 0 and below 1, not 1',
  );
});

test('zero intensities are left out of the quotients', () => {
  const result = matrixPQN([[2, 2, 0, 0, 0]], {
    max: 5,
    reference: [1, 1, 1, 1, 1],
  });

  expect(result.medianOfQuotients).toStrictEqual([2.5]);
  expect(result.data).toStrictEqual(toRows([[1, 1, 0, 0, 0]]));
});

test('a negative median quotient keeps the integral normalization and warns', () => {
  const logger = new FifoLogger();
  const result = matrixPQN([[10, -1, -1, -1, 3]], {
    max: 5,
    reference: [1, 1, 1, 1, 1],
    logger,
  });

  expect(result.medianOfQuotients).toStrictEqual([1]);
  expect(result.data).toStrictEqual(toRows([[5, -0.5, -0.5, -0.5, 1.5]]));
  expect(
    logger
      .getLogs()
      .map(({ levelLabel, message }) => ({ levelLabel, message })),
  ).toStrictEqual([
    {
      levelLabel: 'warn',
      message:
        'row 0: the median quotient is -0.5, only its integral is normalized',
    },
  ]);
});

test('a spectrum with nothing to compare keeps the integral normalization and warns', () => {
  const logger = new FifoLogger();
  const result = matrixPQN([[0, 1, 1]], {
    max: 2,
    reference: [1, 0, 0],
    logger,
  });

  expect(result.medianOfQuotients).toStrictEqual([1]);
  expect(result.data).toStrictEqual(toRows([[0, 1, 1]]));
  expect(
    logger
      .getLogs()
      .map(({ levelLabel, message }) => ({ levelLabel, message })),
  ).toStrictEqual([
    {
      levelLabel: 'warn',
      message:
        'row 0: no variable can be compared with the reference, only its integral is normalized',
    },
  ]);
});

test('an empty matrix gives an empty result', () => {
  expect(matrixPQN([])).toStrictEqual({ data: [], medianOfQuotients: [] });
});
