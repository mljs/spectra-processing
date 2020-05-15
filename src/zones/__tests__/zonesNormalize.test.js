import { zonesNormalize } from '../zonesNormalize.js';

describe('zonesNormalize', function () {
  it('test zonesNormalize', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 4, to: 2 },
      { from: 1, to: 2 },
      { from: 5, to: 6 },
      { from: 6, to: 7 },
    ];

    let result = zonesNormalize(zones);
    expect(result).toStrictEqual([
      { from: 1, to: 4 },
      { from: 5, to: 7 },
    ]);
  });

  it('test zonesNormalize no overlap', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = zonesNormalize(zones);
    expect(result).toStrictEqual([
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 6, to: 7 },
    ]);
  });

  it('test zonesNormalize from, to', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = zonesNormalize(zones, { from: 10, to: 5 });
    expect(result).toStrictEqual([{ from: 6, to: 7 }]);
  });

  it('test zonesNormalize from, to outside', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = zonesNormalize(zones, { from: 10, to: 12 });
    expect(result).toStrictEqual([]);
  });

  it('test zonesNormalize from outside, to', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = zonesNormalize(zones, { from: -1, to: -5 });
    expect(result).toStrictEqual([]);
  });

  it('test zonesNormalize from 1.5, to 6.5', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = zonesNormalize(zones, { from: 1.5, to: 6.5 });
    expect(result).toStrictEqual([
      { from: 1.5, to: 2 },
      { from: 3, to: 4 },
      { from: 6, to: 6.5 },
    ]);
  });
});
