import { xyFilterXPositive } from '../xyFilterXPositive';

test('xyFilterXPositive', () => {
  const data = {
    x: [1, 2, 3, -1, 4, -5],
    y: [1, 2, 3, 4, 4, 5],
  };
  expect(xyFilterXPositive(data)).toStrictEqual({
    x: [1, 2, 3, 4],
    y: [1, 2, 3, 4],
  });
});
