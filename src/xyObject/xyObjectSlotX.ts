import { Point } from '..';

/**
 *
 * @param {Point[]} [points] array of growing points {x,y}
 * @param {{slotWidth?: number}} [options={}] Options
 * @param {number} [options.slotWidth=1] limit to join the dataPoints[]
 * @returns {Point[]} result
 */
export function xyObjectSlotX(
  points: Point[],
  options: {
    slotWidth?: number;
  } = {},
): Point[] {
  const { slotWidth = 1 } = options;
  const halfSlot = slotWidth / 2;

  // when we join we will use the center of mass
  let result: Point[] = [];
  let current: Point = {
    x: Number.MIN_VALUE,
    y: 0,
  };
  for (let point of points) {
    let slot = point.x - ((point.x + halfSlot) % slotWidth) + halfSlot;
    if (Math.abs(current.x - slot) > Number.EPSILON) {
      current = {
        x: slot,
        y: 0,
      };
      result.push(current);
    }
    current.y += point.y;
  }
  return result;
}
