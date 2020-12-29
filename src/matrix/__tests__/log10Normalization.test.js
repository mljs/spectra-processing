import { log10Normalization } from '../log10Normalization';

test('Log 10 of each point', () => {
  const data = [
    [1, 2, 3],
    [2, 1, 2],
    [3, 3, 1],
  ];
  const content = log10Normalization(data);
  let result = [];
  for (let i = 0; i < content.data.length; i++) {
    result[i] = Array.from(content.data[i]);
  }

  expect(result).toStrictEqual([
    [0, 0.3010299956639812, 0.47712125471966244],
    [0.3010299956639812, 0, 0.3010299956639812],
    [0.47712125471966244, 0.47712125471966244, 0],
  ]);
});
