import integral from './integral';

/**
 * function that retrieves the getEquallySpacedData with the variant "smooth"
 *
 * @param x
 * @param y
 * @param from
 * @param to
 * @param numberOfPoints
 * @return - Array of y's equally spaced with the variant "smooth"
 */
export default function equallySpacedSmooth(
  /** x coordinates */
  x: number[],
  /** y coordinates */
  y: number[],
  /** from value */
  from: number,
  /** to value */
  to: number,
  /** number of points */
  numberOfPoints: number,
) {
  let xLength = x.length;

  let step = (to - from) / (numberOfPoints > 1 ? numberOfPoints - 1 : 1);
  let halfStep = step / 2;

  // Changed Array to Float64Array
  let output = new Float64Array(numberOfPoints);

  let initialOriginalStep = x[1] - x[0];
  let lastOriginalStep = x[xLength - 1] - x[xLength - 2];

  // Init main variables
  let min = from - halfStep;
  let max = from + halfStep;

  let previousX = Number.MIN_SAFE_INTEGER;
  let previousY = 0;
  let nextX = x[0] - initialOriginalStep;
  let nextY = 0;

  let currentValue = 0;
  let slope = 0;
  let intercept = 0;
  let sumAtMin = 0;
  let sumAtMax = 0;

  let i = 0; // index of input
  let j = 0; // index of output

  function getSlope(x0: number, y0: number, x1: number, y1: number) {
    return (y1 - y0) / (x1 - x0);
  }

  let add = 0;
  main: while (true) {
    if (previousX >= nextX) throw new Error('x must be a growing series');
    if (previousX <= min && min <= nextX) {
      add = integral(0, min - previousX, slope, previousY);
      sumAtMin = currentValue + add;
    }
    while (nextX - max >= 0) {
      // no overlap with original point, just consume current value
      add = integral(0, max - previousX, slope, previousY);
      sumAtMax = currentValue + add;

      output[j++] = (sumAtMax - sumAtMin) / step;

      if (j === numberOfPoints) {
        break main;
      }

      min = max;
      max += step;
      sumAtMin = sumAtMax;
    }

    currentValue += integral(previousX, nextX, slope, intercept);

    previousX = nextX;
    previousY = nextY;

    if (i < xLength) {
      nextX = x[i];
      nextY = y[i];
      i++;
    } else if (i === xLength) {
      nextX += lastOriginalStep;
      nextY = 0;
    }

    slope = getSlope(previousX, previousY, nextX, nextY);
    intercept = -slope * previousX + previousY;
  }

  return output;
}
