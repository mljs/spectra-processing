import { zonesNormalize } from '../zonesNormalize';

describe('normalize', () => {
  it('test normalize', () => {
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

  it('test normalize no overlap', () => {
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

  it('test normalize from, to', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = zonesNormalize(zones, { from: 10, to: 5 });
    expect(result).toStrictEqual([{ from: 6, to: 7 }]);
  });

  it('test normalize from, to outside', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = zonesNormalize(zones, { from: 10, to: 12 });
    expect(result).toStrictEqual([]);
  });

  it('test normalize from outside, to', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = zonesNormalize(zones, { from: -1, to: -5 });
    expect(result).toStrictEqual([]);
  });

  it('test normalize from 1.5, to 6.5', () => {
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
  it('test normalize small zones with big fractions that combined into one zone from 1 to 8', () => {
    let zones = [
      {
        from: 3.9099321719248614,
        to: 4.445177851049571,
      },
      {
        from: 5.237341456154142,
        to: 5.526374122881485,
      },
      {
        from: 6.104439456336173,
        to: 6.586160567548412,
      },
      {
        from: 6.918012888605731,
        to: 7.538897876390395,
      },
      {
        from: 1.445177851049571,
        to: 8.918012888605731,
      },
    ];
    let result = zonesNormalize(zones);
    expect(result).toStrictEqual([
      { from: 1.445177851049571, to: 8.918012888605731 },
    ]);
  });
});
