import { DataXY } from 'cheminfo-types';

import { xFindClosestIndex } from '../x';

import { xyCheck } from './xyCheck';

export interface XYMassCenterVectorOptions {
  depth?: number;
}

/**
 * We will calculate a vector containing center of mass of DataXY as well as center of mass of both parts, etc.
 * This approach allows to efficiently represent spectra like XPS, NMR, etc. It should provide an extremely efficient
 * way to store and search similar spectra.
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options
 * @returns - Array of centers of mass
 */
export function xyMassCenterVector(
  data: DataXY,
  options: XYMassCenterVectorOptions = {},
): Float64Array {
  xyCheck(data, { minLength: 2 });
  const { depth = 5 } = options;

  const { weightedIntegral, integral } = getWeightedIntegral(data);
  const results = new Float64Array((1 << depth) - 1);
  const endIndexes = new Int32Array((1 << depth) - 1);
  endIndexes[0] = data.x.length - 1;
  const beginIndexes = new Int32Array((1 << depth) - 1);
  beginIndexes[0] = -1;

  let index = 0;
  for (let i = 0; i < depth; i++) {
    for (let j = 0; j < 1 << i; j++) {
      const currentBeginIndex = beginIndexes[index];
      const currentEndIndex = endIndexes[index];
      const currentIntegration =
        currentBeginIndex === -1
          ? integral[currentEndIndex]
          : integral[currentEndIndex] - integral[currentBeginIndex];

      // we need to solve the issue of null integration (rather in simulated spectra).
      let x = 0;
      if (currentIntegration !== 0) {
        x =
          currentBeginIndex === -1
            ? weightedIntegral[currentEndIndex] / currentIntegration
            : (weightedIntegral[currentEndIndex] -
                weightedIntegral[currentBeginIndex]) /
              currentIntegration;
      } else {
        x = (data.x[currentEndIndex] + data.x[currentBeginIndex]) / 2;
      }

      results[index++] = x;
      // we can now prepare the next level
      if (i < depth - 1) {
        const nextIndex = (1 << (i + 1)) + j * 2 - 1;
        let middleIndex = xFindClosestIndex(data.x, x);
        if (middleIndex === currentBeginIndex) {
          middleIndex++;
        }
        beginIndexes[nextIndex] = currentBeginIndex;
        endIndexes[nextIndex] = middleIndex;
        if (middleIndex === currentEndIndex) {
          middleIndex--;
        }
        beginIndexes[nextIndex + 1] = middleIndex;
        endIndexes[nextIndex + 1] = currentEndIndex;
      }
    }
  }

  return results;
}

function getWeightedIntegral(data: DataXY) {
  const { x, y } = data;
  const weightedIntegral = new Float64Array(x.length);
  const integral = new Float64Array(x.length);
  // the first point, no points before
  const firstIntegration = (x[1] - x[0]) * y[0];
  let totalIntegration = firstIntegration;
  integral[0] = totalIntegration;
  let totalWeightedIntegral = firstIntegration * x[0];
  weightedIntegral[0] = totalWeightedIntegral;
  for (let i = 1; i < x.length - 1; i++) {
    const currentIntegration = ((x[i + 1] - x[i - 1]) * y[i]) / 2;
    const currentX = x[i];
    totalIntegration += currentIntegration;
    integral[i] = totalIntegration;
    totalWeightedIntegral += currentIntegration * currentX;
    weightedIntegral[i] = totalWeightedIntegral;
  }
  // the last point, no points after
  const lastIntegration =
    ((x.at(-1) as number) - (x.at(-2) as number)) * (y.at(-1) as number);
  totalIntegration += lastIntegration;
  integral[x.length - 1] = totalIntegration;
  totalWeightedIntegral += lastIntegration * (x.at(-1) as number);
  weightedIntegral[x.length - 1] = totalWeightedIntegral;
  return { integral, weightedIntegral };
}
