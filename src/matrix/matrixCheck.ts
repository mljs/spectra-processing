import { DoubleMatrix } from '../types';

export function matrixCheck(data: DoubleMatrix): void {
  if (data.length === 0 || data[0].length === 0) {
    throw new RangeError('matrix must contain data');
  }

  const firstLength = data[0].length;
  for (let i = 1; i < data.length; i++) {
    if (data[i].length !== firstLength) {
      throw new RangeError('all rows must has the same length');
    }
  }
}
