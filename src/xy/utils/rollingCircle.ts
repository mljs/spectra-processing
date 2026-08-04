import type { DataXY, NumberArray } from 'cheminfo-types';

import { xMinMaxValues } from '../../x/xMinMaxValues.ts';

/**
 * Two y values closer than this fraction of the local y scale are considered to
 * be touched by the same shape.
 */
const RELATIVE_TOLERANCE = 1e-10;

export interface RollingCircleOptions {
  /**
   * The radius of the rolling shape along the 'x' axis.
   * It should be a positive number and in the 'x' unit
   * @default 1
   */
  radius?: number;
  /**
   * The radius of the rolling shape along the 'y' axis, in the 'y' unit.
   * When it differs from `radius` an ellipse is rolled instead of a circle.
   * May not be combined with `relativeYRadius`.
   * @default radius
   */
  yRadius?: number;
  /**
   * The radius of the rolling shape along the 'y' axis, expressed as a fraction
   * of the amplitude of the data (`max(y) - min(y)`). This makes the result
   * independent of the intensity scale of the spectrum.
   * May not be combined with `yRadius`.
   * @default undefined
   */
  relativeYRadius?: number;
  /**
   * Should the shape scan the top or the bottom of the XY data ?
   * @default 'top'
   */
  position?: 'top' | 'bottom';
  /**
   * Should we keep the Y centers of the shapes or should we move the centers
   * so that it touches the XY data ?
   * @default true
   */
  shifted?: boolean;
}

export interface RollingCircleInternalOptions extends RollingCircleOptions {
  /**
   * Should we also compute the mask of the points touched by the shape ?
   * @default false
   */
  touching?: boolean;
}

export interface RollingCircleResult {
  /** The y position of the rolling shape for each x value. */
  y: Float64Array;
  /**
   * Contains 1 for every point touched by the shape, only present when the
   * `touching` option is set.
   */
  touching?: Uint8Array;
}

/**
 * Rolls a circle, or an ellipse of semi-axes (radius, yRadius), on the data and
 * returns the y position of its center.
 *
 * Rolling an ellipse is the same as rolling a circle of radius `radius` on data
 * scaled by `yRadius / radius`, so the scaling collapses into a single
 * multiplication and the data is never copied.
 * @param data - data with x and y arrays.
 * @param options - options.
 * @returns the curve and, on demand, the mask of the touched points.
 */
export function rollingCircle(
  data: DataXY,
  options: RollingCircleInternalOptions = {},
): RollingCircleResult {
  const { shifted = true, touching: withTouching = false } = options;
  const { x, y, radius, yRadius, position } = prepareRollingCircle(
    data,
    options,
  );

  if (x.length === 0 || y.length === 0) {
    const empty = new Float64Array();
    return withTouching
      ? { y: empty, touching: new Uint8Array() }
      : { y: empty };
  }

  const yScale = yRadius / radius;
  const radius2 = radius * radius;

  const yCenters = new Float64Array(x.length);
  const touching = withTouching ? new Uint8Array(x.length) : null;

  // x is growing, so both ends of the window only move forward: the whole scan
  // visits each point twice instead of searching the bounds for every center
  let fromX = 0;
  let toX = 0;
  for (let i = 0; i < x.length; i++) {
    const x0 = x[i]; // x center of the current shape
    while (x[fromX] - x0 < -radius) {
      fromX++;
    }
    while (toX + 1 < x.length && x[toX + 1] - x0 <= radius) {
      toX++;
    }

    // for the given radii we need to evaluate the minimal vertical shift
    let yShift = y[i] + yRadius; // this is the minimal possible shift
    for (let j = fromX; j <= toX; j++) {
      const deltaX = x[j] - x0;
      const currentMinYShift =
        y[j] + yScale * Math.sqrt(radius2 - deltaX * deltaX);
      if (currentMinYShift > yShift) {
        yShift = currentMinYShift;
      }
    }
    yCenters[i] = yShift;

    if (touching !== null) {
      // every point reaching the final shift supports the shape, and there may
      // be more than one of them when it rests in a symmetric valley.
      // squaring this comparison to avoid the square root is not faster,
      // see benchmark/xyRollingCircleMarking.ts
      const limit = yShift - RELATIVE_TOLERANCE * (Math.abs(yShift) + yRadius);
      for (let j = fromX; j <= toX; j++) {
        const deltaX = x[j] - x0;
        if (y[j] + yScale * Math.sqrt(radius2 - deltaX * deltaX) >= limit) {
          touching[j] = 1;
        }
      }
    }
  }

  if (!shifted) {
    for (let i = 0; i < yCenters.length; i++) {
      yCenters[i] -= yRadius;
    }
  }
  if (position === 'bottom') {
    for (let i = 0; i < yCenters.length; i++) {
      yCenters[i] = -yCenters[i];
    }
  }

  return touching === null ? { y: yCenters } : { y: yCenters, touching };
}

interface RollingCircleSetup {
  x: NumberArray;
  /** y values, negated when `position` is 'bottom' */
  y: NumberArray;
  radius: number;
  yRadius: number;
  position: 'top' | 'bottom';
}

/**
 * Validates the options and prepares the data so that the shape can always be
 * rolled on top of `y`.
 * @param data - data with x and y arrays.
 * @param options - options.
 * @returns the resolved radii and the y values to roll onto.
 */
function prepareRollingCircle(
  data: DataXY,
  options: RollingCircleOptions,
): RollingCircleSetup {
  const { x } = data;
  let { y } = data;
  const { radius = 1, yRadius, relativeYRadius, position = 'top' } = options;

  if (position !== 'top' && position !== 'bottom') {
    throw new Error(`Invalid position: ${String(position)}`);
  }
  if (radius <= 0) {
    throw new Error(`radius must be a positive number, got ${radius}`);
  }
  if (yRadius !== undefined && relativeYRadius !== undefined) {
    throw new Error('yRadius and relativeYRadius may not be combined');
  }

  let resolvedYRadius = yRadius ?? radius;
  if (relativeYRadius !== undefined) {
    if (relativeYRadius <= 0) {
      throw new Error(
        `relativeYRadius must be a positive number, got ${relativeYRadius}`,
      );
    }
    // empty data has no amplitude to scale on and yields an empty result anyway
    if (y.length > 0) {
      const { min, max } = xMinMaxValues(y);
      resolvedYRadius = relativeYRadius * (max - min);
    }
  }
  if (resolvedYRadius <= 0) {
    throw new Error(
      `yRadius must be a positive number, got ${resolvedYRadius}`,
    );
  }

  if (position === 'bottom') {
    y = y.slice();
    for (let i = 0; i < y.length; i++) {
      y[i] = -y[i];
    }
  }

  return { x, y, radius, yRadius: resolvedYRadius, position };
}
