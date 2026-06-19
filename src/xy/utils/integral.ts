/**
 * Function that calculates the integral of the line between two
 * x-coordinates, given the slope and intercept of the line.
 * @param x0 - first x coordinate.
 * @param x1 - second x coordinate.
 * @param slope - slope of the line.
 * @param intercept - y-intercept of the line.
 * @returns integral value.
 */
export default function integral(
  /** first coordinate of point */
  x0: number,

  /** second coordinate of point */
  x1: number,

  /** slope of the line */
  slope: number,

  /** intercept of the line on the y axis */
  intercept: number,
): number {
  return (
    0.5 * slope * x1 * x1 +
    intercept * x1 -
    (0.5 * slope * x0 * x0 + intercept * x0)
  );
}
