import { xyCheck } from './xyCheck';
import xyQuickSortX from './xyQuickSortX';
/**
 *
 * @param {Object} [data] Object that contains property x (Array) and y (Array)
 * @param {Object} [options] Object containing a property algorithm (can be 'sum' or 'average', the latter being the default value), and a property isSorted (boolean indicating if the x-array is sorted).
 */
export default function xyUniqueX(
  data,
  { algorithm = 'average', isSorted = true },
) {
  xyCheck(data);

  if (isSorted === false) {
    xyQuickSortX(data);
  }

  let newData = { x: [], y: [] };
  let cumulativeY = data.y[0];
  let error = new Error('incorrect parameter!');

  switch (algorithm) {
    case 'average':
      let divider = 1;
      for (let i = 1; i < data.x.length; i++) {
        if (!(data.x[i] == data.x[i - 1])) {
          newData.x.push(data.x[i - 1]);
          newData.y.push(cumulativeY / divider);
          cumulativeY = 0;
          divider = 0;
        }
        cumulativeY += data.y[i];
        divider++;
      }
      if (data.x[data.x.length - 1] == data.x[data.x.length - 2]) {
        newData.x.push(data.x[data.x.length - 1]);
        newData.y.push(cumulativeY / divider);
      } else if (!(data.x[data.x.length - 1] == data.x[data.x.length - 2])) {
        newData.x.push(data.x[data.x.length - 1]);
        newData.y.push(data.y[data.y.length - 1]);
      }
      break;

    case 'sum':
      for (let i = 1; i < data.x.length; i++) {
        if (!(data.x[i] == data.x[i - 1])) {
          newData.x.push(data.x[i - 1]);
          newData.y.push(cumulativeY);
          cumulativeY = 0;
        }
        cumulativeY += data.y[i];
      }
      if (data.x[data.x.length - 1] == data.x[data.x.length - 2]) {
        newData.x.push(data.x[data.x.length - 1]);
        newData.y.push(cumulativeY);
      } else if (!(data.x[data.x.length - 1] == data.x[data.x.length - 2])) {
        newData.x.push(data.x[data.x.length - 1]);
        newData.y.push(data.y[data.y.length - 1]);
      }

      break;

    default:
      throw error;
  }

  return newData;
}
