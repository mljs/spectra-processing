import { DataXY } from 'cheminfo-types';

/**
 * zoneCheck.
 *
 * @param arrayXY
 * @returns boolean
 */
export function zoneCheck(
  /** points */
  arrayXY: DataXY,
): boolean {
  let { x, y } = arrayXY;
  if (x.length !== y.length) {
    return false;
  }
  return true;
}
