import { probabilisticQuotientNormalization } from '../probabilisticQuotientNormalization';

test('Probabilistic quotient normalization method', () => {
  const data = [
    [1, 2, 3],
    [2, 1, 2],
    [3, 3, 1],
  ];
  const content = probabilisticQuotientNormalization(data, { max: 1 });
  let result = [];
  for (let i = 0; i < content.data.data.length; i++) {
    result[i] = Array.from(content.data.data[i]);
  }

  expect(result).toStrictEqual([
    [0.2672612419124244, 0.5345224838248488, 0.8017837257372732],
    [0.6666666666666666, 0.3333333333333333, 0.6666666666666666],
    [0.6882472016116852, 0.6882472016116852, 0.22941573387056174],
  ]);
});
