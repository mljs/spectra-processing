import { FromTo } from 'cheminfo-types';

import { zonesWithPoints } from '../zonesWithPoints';

describe('zonesWithPoints', () => {
  it('no zones', () => {
    const zones: FromTo[] = [];
    const result = zonesWithPoints(zones, 1024);
    expect(result).toStrictEqual([]);
  });

  it('one zone', () => {
    const zones = [{ from: 0, to: 10 }];
    const result = zonesWithPoints(zones, 1024);
    expect(result).toStrictEqual([{ from: 0, to: 10, numberOfPoints: 1024 }]);
  });

  it('two zones', () => {
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

  it('two asymmetric zones', () => {
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

  it('two asymmetric zones with from, to', () => {
    const zones = [
      { from: 0, to: 1 },
      { from: 4, to: 7 },
    ];
    const result = zonesWithPoints(zones, 1024, { from: 2, to: 10 });
    expect(result).toStrictEqual([{ from: 4, to: 7, numberOfPoints: 1024 }]);
  });

  it('tree asymmetric zones with overlap', () => {
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

  it('tree asymmetric zones with touch', () => {
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
});