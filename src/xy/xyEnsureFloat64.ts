import { DataXY, NumberArray } from 'cheminfo-types';

import { xEnsureFloat64 } from '../x/xEnsureFloat64';

interface DataXYNumberArray {
  x: NumberArray;
  y: NumberArray;
}
export function xyEnsureFloat64(data: DataXYNumberArray): DataXY<Float64Array> {
  return {
    x: xEnsureFloat64(data.x),
    y: xEnsureFloat64(data.y),
  };
}
