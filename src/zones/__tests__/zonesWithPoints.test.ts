import type { FromTo } from 'cheminfo-types';
import { expect, test } from 'vitest';

import { zonesWithPoints } from '../zonesWithPoints';

test('no zones', () => {
  const zones: FromTo[] = [];
  const result = zonesWithPoints(zones, 1024);
  expect(result).toStrictEqual([]);
});

test('one zone', () => {
  const zones = [{ from: 0, to: 10 }];
  const result = zonesWithPoints(zones, 1024);
  expect(result).toStrictEqual([{ from: 0, to: 10, numberOfPoints: 1024 }]);
});

test('two zones', () => {
  const zones = [
    { from: 0, to: 1 },
    { from: 4, to: 5 },
  ];
  const result = zonesWithPoints(zones, 1024);
  expect(result).toStrictEqual([
    { from: 0, to: 1, numberOfPoints: 512 },
    { from: 4, to: 5, numberOfPoints: 512 },
  ]);
});

test('two asymmetric zones', () => {
  const zones = [
    { from: 0, to: 1 },
    { from: 4, to: 7 },
  ];
  const result = zonesWithPoints(zones, 1024);
  expect(result).toStrictEqual([
    { from: 0, to: 1, numberOfPoints: 256 },
    { from: 4, to: 7, numberOfPoints: 768 },
  ]);
});

test('two asymmetric zones with from, to', () => {
  const zones = [
    { from: 0, to: 1 },
    { from: 4, to: 7 },
  ];
  const result = zonesWithPoints(zones, 1024, { from: 2, to: 10 });
  expect(result).toStrictEqual([{ from: 4, to: 7, numberOfPoints: 1024 }]);
});

test('tree asymmetric zones with overlap', () => {
  const zones = [
    { from: 0, to: 1 },
    { from: 0, to: 3 },
    { from: 4, to: 7 },
  ];
  const result = zonesWithPoints(zones, 1024);
  expect(result).toStrictEqual([
    { from: 0, to: 3, numberOfPoints: 512 },
    { from: 4, to: 7, numberOfPoints: 512 },
  ]);
});

test('tree asymmetric zones with touch', () => {
  const zones = [
    { from: 0, to: 1 },
    { from: 1, to: 3 },
    { from: 4, to: 7 },
  ];
  const result = zonesWithPoints(zones, 1024);
  expect(result).toStrictEqual([
    { from: 0, to: 3, numberOfPoints: 512 },
    { from: 4, to: 7, numberOfPoints: 512 },
  ]);
});
