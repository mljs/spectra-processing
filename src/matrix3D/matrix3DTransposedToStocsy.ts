import { xCorrelation } from 'ml-spectra-processing';

import type { Coordinates } from './Coordinates';

export function matrix3DTransposedToStocsy(
  matrix3D: number[][][],
  coordinates: Coordinates,
) {
  const nbRows = matrix3D.length;
  const nbColumns = matrix3D[0].length;

  const { c, r } = coordinates;
  const targetColumn = matrix3D[r][c];

  const result: Float64Array[] = [];
  for (let r = 0; r < nbRows; r++) {
    const rCorrelations = new Float64Array(nbColumns);
    for (let c = 0; c < nbColumns; c++) {
      rCorrelations[c] = xCorrelation(targetColumn, matrix3D[r][c]);
    }
    result.push(rCorrelations);
  }
  return result;
}
