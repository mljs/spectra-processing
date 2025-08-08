import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { reimAutoPhaseCorrection } from '../reimAutoPhaseCorrection';
import { reimPhaseCorrection } from '../reimPhaseCorrection';

const data = JSON.parse(
  readFileSync(join(__dirname, 'data/perfect.json')).toString(),
);

const onlyOneBaselineZone = JSON.parse(
  readFileSync(join(__dirname, 'data/onlyOneBaselineZone.json')).toString(),
);

test('reverse true', () => {
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

test('onlyOneBaselineZone data should not be NaN', () => {
  const { ph0, ph1 } = reimAutoPhaseCorrection(onlyOneBaselineZone, {
    reverse: true,
  });

  expect(ph0).not.toBeNaN();
  expect(ph1).not.toBeNaN();
});

test('onlyOneBaselineZone data should not be NaN, 128 zero points', () => {
  const re = new Float64Array(128);
  const im = new Float64Array(128);
  const { ph0, ph1 } = reimAutoPhaseCorrection(
    { re, im },
    {
      reverse: true,
    },
  );

  expect(ph0).not.toBeNaN();
  expect(ph1).not.toBeNaN();
  expect(ph0).toBe(0);
  expect(ph1).toBe(0);
});

test('reverse true with outlier', () => {
  const ph1 = 10;
  const ph0 = 90;
  const reverse = true;
  const { re, im } = reimPhaseCorrection(
    data,
    (ph0 * Math.PI) / 180,
    (ph1 * Math.PI) / 180,
    { reverse },
  );

  const start = 1400;
  const end = 1800;
  const { re: partRe, im: partIm } = reimPhaseCorrection(
    {
      re: re.slice(1400, 1800),
      im: im.slice(1400, 1800),
    },
    (ph0 * Math.PI) / 180,
    0,
    { reverse },
  );

  for (let i = 0; i < end - start; i++) {
    re[i + start] = partRe[i];
    im[i + start] = partIm[i];
  }

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

test('reverse false', () => {
  const ph1 = 15;
  const ph0 = 90;
  const reverse = false;
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

test('reverse false with outlier', () => {
  const ph1 = 10;
  const ph0 = 90;
  const reverse = false;
  const { re, im } = reimPhaseCorrection(
    data,
    (ph0 * Math.PI) / 180,
    (ph1 * Math.PI) / 180,
    { reverse },
  );

  const start = 1400;
  const end = 1800;
  const { re: partRe, im: partIm } = reimPhaseCorrection(
    {
      re: re.slice(start, end),
      im: im.slice(start, end),
    },
    (ph0 * Math.PI) / 180,
    0,
    { reverse },
  );

  for (let i = 0; i < end - start; i++) {
    re[i + start] = partRe[i];
    im[i + start] = partIm[i];
  }

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
