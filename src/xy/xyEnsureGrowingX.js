export function xyEnsureGrowingX(x, y) {
  let prevX = -Infinity;
  let ansX = [];
  let ansY = [];

  for (let index = 0; index < x.length; index++) {
    if (prevX < x[index]) {
      ansX.push(x[index]);
      ansY.push(y[index]);
      prevX = x[index];
    }
  }
  return [ansX, ansY];
}
