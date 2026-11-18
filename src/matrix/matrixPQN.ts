import type { DoubleMatrix, LightLogger, NumberArray } from 'cheminfo-types';
import type { AbstractMatrix } from 'ml-matrix';
import { Matrix, MatrixRowSelectionView, WrapperMatrix2D } from 'ml-matrix';

import { xMaxValue, xMedian } from '../x/index.ts';

export interface MatrixPQNOptions {
  /**
   * Receives a warning for each spectrum (row) whose dilution cannot be
   * estimated, which then only has its integral normalized.
   * @default undefined — nothing is reported
   */
  logger?: LightLogger;

  /**
   * Integral every spectrum (row) is brought to before the quotients are
   * computed.
   * @default 100
   */
  max?: number;

  /**
   * The quotients are only taken over the variables where the reference is
   * above this fraction of its maximum, which keeps the baseline and the noise
   * out of the median. With 0, every variable where the reference is positive
   * is used.
   * @default 0.01
   */
  minReferenceRatio?: number;

  /**
   * Reference spectrum, one value per column, for example the reference of a
   * training set to normalize new samples the same way. It is brought to the
   * integral `max` like every spectrum, so its own scale does not matter.
   * Cannot be combined with `referenceRows`.
   * @default the median spectrum of `referenceRows`
   */
  reference?: NumberArray;

  /**
   * Indices of the spectra (rows) whose median spectrum is the reference,
   * typically the control samples.
   * @default every row
   */
  referenceRows?: number[];
}

/**
 * Performs a Probabilistic quotient normalization (PQN) over the dataset to account dilution based in median spectrum.
 * Dieterle, F., Ross, A., Schlotterbeck, G., & Senn, H. (2006). Probabilistic quotient normalization as robust method to account for dilution of complex biological mixtures. Application in 1H NMR metabonomics. Analytical chemistry, 78(13), 4281-4290.
 * DOI: 10.1021/ac051632c
 *
 * Each spectrum (row) is first brought to the integral `max`. The reference is
 * the median spectrum (of `referenceRows`, or of every row), or the given
 * `reference`. Each spectrum is then divided by the median of its quotients
 * with the reference, taken over the variables where the reference is above
 * `minReferenceRatio` of its maximum and the spectrum is not zero. A spectrum
 * without any quotient, or whose median quotient is not positive, only has its
 * integral normalized and is reported to the `logger`.
 * @param matrix - matrix [rows][cols].
 * @param options - options
 * @returns - {data: Normalized dataset, one Float64Array per spectrum, medianOfQuotients: The median quotient of each spectrum (row), its dilution relative to the reference}
 */
export function matrixPQN(
  matrix: DoubleMatrix,
  options: MatrixPQNOptions = {},
): {
  data: Float64Array[];
  medianOfQuotients: number[];
} {
  const {
    logger,
    max = 100,
    minReferenceRatio = 0.01,
    reference,
    referenceRows,
  } = options;
  if (!(minReferenceRatio >= 0 && minReferenceRatio < 1)) {
    throw new RangeError(
      `minReferenceRatio must be at least 0 and below 1, not ${minReferenceRatio}`,
    );
  }

  const output = matrix.map((row) => new Float64Array(row));
  if (output.length === 0) return { data: output, medianOfQuotients: [] };
  const data = new WrapperMatrix2D(output);
  const factors = data.sum('row');
  for (let i = 0; i < factors.length; i++) {
    factors[i] = factors[i] === 0 ? 1 : max / factors[i];
  }
  data.mulColumnVector(factors);

  const referenceSpectrum = reference
    ? getGivenReference(reference, data.columns, max, referenceRows)
    : getMedianSpectrum(
        referenceRows ? new MatrixRowSelectionView(data, referenceRows) : data,
      );
  const threshold =
    data.columns === 0
      ? 0
      : minReferenceRatio * Math.max(0, xMaxValue(referenceSpectrum));

  const medianOfQuotients: number[] = [];
  const quotients = new Float64Array(data.columns);
  for (let i = 0; i < data.rows; i++) {
    const row = output[i];
    let count = 0;
    for (let j = 0; j < data.columns; j++) {
      if (referenceSpectrum[j] <= threshold) continue;
      const quotient = row[j] / referenceSpectrum[j];
      if (quotient !== 0 && Number.isFinite(quotient)) {
        quotients[count++] = quotient;
      }
    }

    let dilution = 1;
    if (count === 0) {
      logger?.warn(
        `row ${i}: no variable can be compared with the reference, only its integral is normalized`,
      );
    } else {
      const median = xMedian(quotients, { exact: true, toIndex: count });
      if (median > 0 && Number.isFinite(median)) {
        dilution = median;
      } else {
        logger?.warn(
          `row ${i}: the median quotient is ${median}, only its integral is normalized`,
        );
      }
    }
    medianOfQuotients.push(dilution);
  }
  data.divColumnVector(medianOfQuotients);

  return { data: output, medianOfQuotients };
}

function getGivenReference(
  reference: NumberArray,
  nbColumns: number,
  max: number,
  referenceRows: number[] | undefined,
): number[] {
  if (referenceRows) {
    throw new Error('reference and referenceRows cannot be used together');
  }
  if (reference.length !== nbColumns) {
    throw new RangeError(
      `reference must have ${nbColumns} values, one per column, not ${reference.length}`,
    );
  }
  const vector = Matrix.rowVector(reference);
  const sum = vector.sum();
  return vector.mul(sum === 0 ? 1 : max / sum).to1DArray();
}

function getMedianSpectrum(rows: AbstractMatrix): Float64Array {
  if (rows.rows === 0) {
    throw new RangeError('referenceRows must contain at least one row');
  }
  const spectrum = new Float64Array(rows.columns);
  const column = new Float64Array(rows.rows);
  for (let j = 0; j < rows.columns; j++) {
    for (let k = 0; k < rows.rows; k++) column[k] = rows.get(k, j);
    spectrum[j] = xMedian(column, { exact: true });
  }
  return spectrum;
}
