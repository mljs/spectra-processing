import type { DataXY } from 'cheminfo-types';

import { xEnsureFloat64 } from '../x/index.ts';

export function xyEnsureFloat64(data: DataXY): DataXY<Float64Array> {
  return {
    x: xEnsureFloat64(data.x),
    y: xEnsureFloat64(data.y),
  };
}
