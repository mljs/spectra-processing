import { reimAutoPhaseCorrection } from '../reimAutoPhaseCorrection';
import { join } from 'path';
import { readFileSync } from 'node:fs';
import { reimPhaseCorrection } from '../reimPhaseCorrection';

const data = JSON.parse(
  readFileSync(join(__dirname, 'data/perfect.json')).toString(),
);

test('auto phase correction', () => {
  const ph1 = 15;
  const ph0 = 90;
  const reverse = true;
  const { re, im } = reimPhaseCorrection(
    data,
    (ph0 * Math.PI) / 180,
    (ph1 * Math.PI) / 180,
    { reverse },
  );
  const { ph0: newPh0, ph1: newPh1 } = reimAutoPhaseCorrection(
    { re, im },
    {
      minRegSize: 30,
      maxDistanceToJoin: 128,
      magnitudeMode: true,
      factorNoise: 3,
      reverse,
    },
  );
  expect(ph0 + newPh0).toBeLessThan(1);
  expect(ph1 + newPh1).toBeLessThan(1);
});
