/**
 * Aligns spectra
 * @param {Array<DataXY>} spectra
 * @param {object} [options={}]
 * @param {number|function} [options.delta=1] The range in which the two x values of the spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
 * @param {boolean} [options.common=true] If `true`, only the data common to the first spectrum are kept. If `false`, the data y arrays are completed with zeroes where no common values are found
 * @param {string} [options.x='first'] Defines what x values that should be kept. Currently only 'first' is allowed
 */
export function xyArrayAlign(spectra, options = {}) {
  const { delta = 1, common = true, x = 'first' } = options;

  let result = {
    x: [],
    y: new Array(spectra.length),
  };

  let positions = new Array(spectra.length);

  while (i < length1 && j < length2) {
    let maxDiff = 0;

    if (typeof delta === 'function') {
      let mean = (data1.x[i] + data2.x[j]) / 2; // is this a good thing to do?
      maxDiff = delta(mean);
    } else {
      maxDiff = delta;
    }

    let difference = data1.x[i] - data2.x[j];

    if (Math.abs(difference) > maxDiff) {
      if (difference > 0) {
        if (!common) {
          result.x.push(data2.x[j]);
          result.y1.push(0);
          result.y2.push(data2.y[j]);
          if (j === length2 - 1) {
            while (i < length1) {
              result.x.push(data1.x[i]);
              result.y1.push(data1.y[i]);
              result.y2.push(0);
              i++;
            }
          }
        }
        // console.log({ i, j }, result);
        j++;
      } else {
        if (!common) {
          result.x.push(data1.x[i]);
          result.y1.push(data1.y[i]);
          result.y2.push(0);
          if (i === length1 - 1) {
            while (j < length2) {
              result.x.push(data2.x[j]);
              result.y1.push(0);
              result.y2.push(data2.y[j]);
              j++;
            }
          }
        }
        // console.log({ i, j }, result);
        i++;
      }
    } else {
      let weightedX =
        (data1.x[i] * data1.y[i] + data2.x[j] * data2.y[j]) /
        (data1.y[i] + data2.y[j]);

      switch (x) {
        case 'x1':
          result.x.push(data1.x[i]);
          break;
        case 'x2':
          result.x.push(data2.x[j]);
          break;
        case 'weighted':
          result.x.push(weightedX);
          break;
        default:
          throw new Error(`Error: Unknown x option value: ${x}`);
      }

      result.y1.push(data1.y[i]);
      result.y2.push(data2.y[j]);

      // console.log({ i, j }, result);

      i++;
      j++;
    }
  }
  return result;
}
