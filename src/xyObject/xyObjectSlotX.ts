import { Point } from '../types';

export interface XYObjectSlotXOptions {
  /**
   * Limit to join the dataPoints[].
   * @default 1
   */
  slotWidth?: number;
}

/**
 * xyObjectSlotX
 * @param points - Array of growing points {x,y}.
 * @param options - Options.
 */
export function xyObjectSlotX(
  points: Point[],
  options: XYObjectSlotXOptions = {},
): Point[] {
  const { slotWidth = 1 } = options;
  const halfSlot = slotWidth / 2;

  // when we join we will use the center of mass
  const result: Point[] = [];
  let current: Point = {
    x: Number.NEGATIVE_INFINITY,
    y: 0,
  };
  for (const point of points) {
    const slot = point.x - ((point.x + halfSlot) % slotWidth) + halfSlot;
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
