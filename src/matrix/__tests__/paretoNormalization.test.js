import { paretoNormalization } from '../paretoNormalization';

test('Pareto normalization method', () => {
  const data = [
    [1, 2, 3],
    [2, 1, 2],
    [3, 3, 1],
  ];
  const content = paretoNormalization(data);
  let result = [];
  for (let i = 0; i < content.data.length; i++) {
    result[i] = Array.from(content.data[i]);
  }

  expect(result).toStrictEqual([
    [1, 2, 3],
    [2.6321480259049848, 1.3160740129524924, 2.6321480259049848],
    [2.791814577306299, 2.791814577306299, 0.9306048591020996],
  ]);
});
