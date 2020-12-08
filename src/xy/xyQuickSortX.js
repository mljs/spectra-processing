/**
 *This function performs a quick sort of the x array while transforming the y array to preserve the coordinates.
 * @param {Object} [data] Object that contains property x (Array) and y (Array)
 */
export default function xyQuickSortX(data) {
  let start = 0;
  let stop = data.x.length - 1;

  quickSortRecursive(data, start, stop);
  return data;
}
//this function swaps two values in an array:
function swap(input, indexA, indexB) {
  let tempX = input.x[indexA];
  let tempY = input.y[indexA];
  input.x[indexA] = input.x[indexB];
  input.y[indexA] = input.y[indexB];
  input.x[indexB] = tempX;
  input.y[indexB] = tempY;
}

//recursive quickSort function
function quickSortRecursive(data, start, stop) {
  if (stop - start < 2) {
    insertPivot(data, start, stop);
    return 0;
  }
  let pivot = start;
  let pointerL = start + 1;
  let pointerR = stop;
  while (true) {
    if (data.x[pointerL] < data.x[pivot]) {
      pointerL++;
    } else if (data.x[pointerR] > data.x[pivot]) {
      pointerR--;
    } else if (
      data.x[pointerL] > data.x[pivot] ||
      data.x[pointerR] < data.x[pivot]
    ) {
      swap(data, pointerL, pointerR);
    }
    if (pointerR <= pointerL) {
      let newPivot = insertPivot(data, start, stop);
      quickSortRecursive(data, start, newPivot - 1);
      quickSortRecursive(data, newPivot + 1, stop);
      break;
    }
    if (data.x[pointerL] === data.x[pointerR]) {
      pointerR--;
      pointerL++;
    }
  }
}

//this function searches for the right place to insert the pivot, after which it calls arrayMove:
function insertPivot(data, start, stop) {
  let i = start;
  while (true) {
    if (data.x[start] < data.x[i]) {
      arrayMove(data, start, i - 1);
      return i - 1;
    }
    if (i === stop) {
      arrayMove(data, start, i);
      return i;
    }
    i++;
  }
}
//this function moves a value to the designated position :
function arrayMove(data, oldIndex, newIndex) {
  data.x.splice(newIndex, 0, data.x.splice(oldIndex, 1)[0]);
  data.y.splice(newIndex, 0, data.y.splice(oldIndex, 1)[0]);
}
