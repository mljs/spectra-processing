import { crossCorrelation } from './crossCorrelation';

export function autoCorrelation(A, options = {}) {
  let { tau = 1, lag = A.length - 1 } = options;
  let result = crossCorrelation(A, A, { tau, lag });
  return result;
}
