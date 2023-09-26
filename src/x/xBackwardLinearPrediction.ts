import { DoubleArray } from 'cheminfo-types';
import { SVD, Matrix } from 'ml-matrix';

export interface BackwardLPOptions {
  /**
   * Number of coefficients to be calculated in the SVD.
   */
  nbCoefficients: number;
  /**
   * Number of points used in the prediction.
   */
  nbInputs: number;
  /**
   * Number of points to predict
   */
  nbPoints: number;
  /**
   * Output array that could be used for in-place modification.
   */
  output?: Float64Array[]
}


/**
 * Predict back points by singular value decomposition.
 * to append the predicted points is it needed to append nbPoints zeros at the beginning of input data.
 */
export function xBackwardLinearPrediction(
  data: DoubleArray,
  options: BackwardLPOptions,
) {
  const {
    nbCoefficients,
    nbInputs,
    nbPoints,
  } = options;

  const lpMatrix: Float64Array[] = [];
  for (let i = 0; i < nbInputs; i++) {
    const row = new Float64Array(nbCoefficients);
    for (let j = 0; j < nbCoefficients; j++) {
      row[j] = data[i + j + nbPoints + 1];
    }
    lpMatrix.push(row);
  }
  const svd = new SVD(lpMatrix);
  const dataInput = new Float64Array(nbInputs);
  for (let i = 0; i < nbInputs; i++) {
    dataInput[i] = data[i + nbPoints];
  }
  const coefficients = svd
    .solve(Matrix.from1DArray(dataInput.length, 1, dataInput))
    .to1DArray();

  const { output = Float64Array.from(data) } = options;
  for (let m = 0; m < nbPoints; m++) {
    let sum = 0;
    for (let i = 0; i < coefficients.length; i++) {
      sum += coefficients[i] * data[i + nbPoints - m];
    }
    output[nbPoints - m - 1] = sum;
  }
  return { output, predicted: output.slice(0, nbPoints) };
}
