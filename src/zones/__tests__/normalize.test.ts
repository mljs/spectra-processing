import { normalize } from '../normalize';

describe('normalize', () => {
  it('test normalize', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 4, to: 2 },
      { from: 1, to: 2 },
      { from: 5, to: 6 },
      { from: 6, to: 7 },
    ];

    let result = normalize(zones);
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

    let result = normalize(zones);
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

    let result = normalize(zones, { from: 10, to: 5 });
    expect(result).toStrictEqual([{ from: 6, to: 7 }]);
  });

  it('test normalize from, to outside', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = normalize(zones, { from: 10, to: 12 });
    expect(result).toStrictEqual([]);
  });

  it('test normalize from outside, to', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = normalize(zones, { from: -1, to: -5 });
    expect(result).toStrictEqual([]);
  });

  it('test normalize from 1.5, to 6.5', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = normalize(zones, { from: 1.5, to: 6.5 });
    expect(result).toStrictEqual([
      { from: 1.5, to: 2 },
      { from: 3, to: 4 },
      { from: 6, to: 6.5 },
    ]);
  });
});
