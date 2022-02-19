import { DoubleMatrix } from '..';

export function matrixCheck(data: DoubleMatrix) {
  if (data.length === 0 || data[0].length === 0) {
    throw RangeError('matrix should contain data');
  }

  const firstLength = data[0].length;
  for (let i = 1; i < data.length; i++) {
    if (data[i].length !== firstLength) {
      throw new RangeError('All rows should has the same length');
    }
  }
}
