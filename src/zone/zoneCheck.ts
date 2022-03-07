import { DataXY } from 'cheminfo-types';

/**
 * zoneCheck.
 *
 * @param data
 * @returns boolean
 */
export function zoneCheck(
  /** points */
  data: DataXY,
): boolean {
  let { x, y } = data;
  if (x.length !== y.length) {
    return false;
  }
  return true;
}
