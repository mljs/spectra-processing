import { xCorrelation } from 'ml-spectra-processing';

import type { Coordinates } from './Coordinates';
import { getZArray } from './utils/getZArray';

export function matrix3DToStocsy(
  matrix3D: number[][][],
  coordinates: Coordinates,
) {
  const nTraces = matrix3D.length;
  const nbRows = matrix3D[0].length;
  const nbColumns = matrix3D[0][0].length;

  const targetColumn = getZArray(matrix3D, coordinates);

  const result: Float64Array[] = [];
  for (let r = 0; r < nbRows; r++) {
    const rCorrelations = new Float64Array(nbColumns);
    for (let c = 0; c < nbColumns; c++) {
      rCorrelations[c] = xCorrelation(
        targetColumn,
        getZArray(matrix3D, { r, c }),
      );
    }
    result.push(rCorrelations);
  }
  return result;
}
