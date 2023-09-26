import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { xBackwardLinearPrediction } from '../xBackwardLinearPrediction';

expect.extend({ toBeDeepCloseTo });

test('predict points of a polinomial', async () => {
  const data = new Float64Array(11);
  for (let i = 0; i < data.length; i++) {
    data[i] = i * 5 + 3;
  }

  const nbCoefficients = 3;
  const nbPoints = 3;
  const nbInputs = 5;

  //delete the firsts nbPoints of data.
  for (let i = 0; i < nbPoints; i++) {
    data[i] = 0;
  }

  const { predicted, output } = xBackwardLinearPrediction(data, {
    nbCoefficients,
    nbPoints,
    nbInputs,
  });
  expect(predicted).not.toBeDeepCloseTo(data.slice(0, nbPoints), 3);
  expect(predicted).toBeDeepCloseTo(output.slice(0, nbPoints), 3);
  //run the same prediction with in-place modification
  const r = xBackwardLinearPrediction(data, {
    nbCoefficients,
    nbPoints,
    nbInputs,
    output: data,
  });
  expect(r.predicted).toBeDeepCloseTo(data.slice(0, nbPoints), 3);
  expect(r.output.slice(0, nbPoints)).toBeDeepCloseTo(
    data.slice(0, nbPoints),
    3,
  );
  expect(r.predicted).toBeDeepCloseTo(output.slice(0, nbPoints), 3);
});
