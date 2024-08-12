import { DataXY } from 'cheminfo-types';

export interface XYFilterOptions {
  /**
   * callback
   * @default ()=>true
   */
  filter?: (x: number, y: number) => boolean;
}

/**
 * Filter an array x/y based on various criteria x points are expected to be sorted
 * @param data - object containing 2 properties x and y
 * @param options - options
 * @returns filtered array
 */
export function xyFilter(
  data: DataXY,
  options: XYFilterOptions = {},
): DataXY<number[]> {
  const { x, y } = data;
  const { filter } = options;
  const newX: number[] = [];
  const newY: number[] = [];

  for (let i = 0; i < x.length; i++) {
    if (!filter || filter(x[i], y[i])) {
      newX.push(x[i]);
      newY.push(y[i]);
    }
  }

  return {
    x: newX,
    y: newY,
  };
}
