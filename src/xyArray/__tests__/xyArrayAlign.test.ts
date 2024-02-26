import { xyArrayAlign } from '../xyArrayAlign';

test('same length spectra, simple integers', () => {
  const data = [
    { x: [1, 2, 3], y: [1, 1, 1] },
    { x: [0.1, 1.1, 2.1, 3.1, 4.1], y: [1, 1, 1, 1, 1] },
    { x: [2.9, 3.1, 3.9, 4.9], y: [1, 1, 1, 1] },
  ];
  const result = xyArrayAlign(data, { delta: 0.15 });

  expect(result).toStrictEqual({
    x: Float64Array.from([0.1, 1.05, 2.05, 3.025, 3.9, 4.1, 4.9]),
    ys: [
      Float64Array.from([0, 1, 1, 1, 0, 0, 0]),
      Float64Array.from([1, 1, 1, 1, 0, 1, 0]),
      Float64Array.from([0, 0, 0, 2, 1, 0, 1]),
    ],
  });
});

test('The y values must be present everywhere', () => {
  const data = [
    { x: [1, 2, 3], y: [1, 1, 1] },
    { x: [0.1, 1.1, 2.1, 3.1, 4.1], y: [1, 1, 1, 1, 1] },
    { x: [2.9, 3.1, 3.9, 4.9], y: [1, 1, 1, 1] },
  ];
  const result = xyArrayAlign(data, { delta: 0.15, requiredY: true });

  expect(result).toStrictEqual({
    x: [3.025],
    ys: [[1], [1], [2]],
  });
});
