import { FromTo } from 'cheminfo-types';

import { zonesWithPoints } from '../zonesWithPoints';

describe('zonesWithPoints', () => {
  it('no zones', () => {
    let zones: FromTo[] = [];
    let result = zonesWithPoints(zones, 1024);
    expect(result).toStrictEqual([]);
  });

  it('one zone', () => {
    let zones = [{ from: 0, to: 10 }];
    let result = zonesWithPoints(zones, 1024);
    expect(result).toStrictEqual([{ from: 0, to: 10, numberOfPoints: 1024 }]);
  });

  it('two zones', () => {
    let zones = [
      { from: 0, to: 1 },
      { from: 4, to: 5 },
    ];
    let result = zonesWithPoints(zones, 1024);
    expect(result).toStrictEqual([
      { from: 0, to: 1, numberOfPoints: 512 },
      { from: 4, to: 5, numberOfPoints: 512 },
    ]);
  });

  it('two asymmetric zones', () => {
    let zones = [
      { from: 0, to: 1 },
      { from: 4, to: 7 },
    ];
    let result = zonesWithPoints(zones, 1024);
    expect(result).toStrictEqual([
      { from: 0, to: 1, numberOfPoints: 256 },
      { from: 4, to: 7, numberOfPoints: 768 },
    ]);
  });

  it('two asymmetric zones with from, to', () => {
    let zones = [
      { from: 0, to: 1 },
      { from: 4, to: 7 },
    ];
    let result = zonesWithPoints(zones, 1024, { from: 2, to: 10 });
    expect(result).toStrictEqual([{ from: 4, to: 7, numberOfPoints: 1024 }]);
  });

  it('tree asymmetric zones with overlap', () => {
    let zones = [
      { from: 0, to: 1 },
      { from: 0, to: 3 },
      { from: 4, to: 7 },
    ];
    let result = zonesWithPoints(zones, 1024);
    expect(result).toStrictEqual([
      { from: 0, to: 3, numberOfPoints: 512 },
      { from: 4, to: 7, numberOfPoints: 512 },
    ]);
  });

  it('tree asymmetric zones with touch', () => {
    let zones = [
      { from: 0, to: 1 },
      { from: 1, to: 3 },
      { from: 4, to: 7 },
    ];
    let result = zonesWithPoints(zones, 1024);
    expect(result).toStrictEqual([
      { from: 0, to: 3, numberOfPoints: 512 },
      { from: 4, to: 7, numberOfPoints: 512 },
    ]);
  });
});
