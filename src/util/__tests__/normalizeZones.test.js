import { normalizeZones } from '../normalizeZones.js';

describe('normalizeZones', function() {
  it('test normalizeZones', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 4, to: 2 },
      { from: 1, to: 2 },
      { from: 5, to: 6 },
      { from: 6, to: 7 },
    ];

    let result = normalizeZones(zones);
    expect(result).toEqual([
      { from: 1, to: 4 },
      { from: 5, to: 7 },
    ]);
  });

  it('test normalizeZones no overlap', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = normalizeZones(zones);
    expect(result).toEqual([
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 6, to: 7 },
    ]);
  });

  it('test normalizeZones from, to', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = normalizeZones(zones, { from: 10, to: 5 });
    expect(result).toEqual([{ from: 6, to: 7 }]);
  });

  it('test normalizeZones from, to outside', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = normalizeZones(zones, { from: 10, to: 12 });
    expect(result).toEqual([]);
  });

  it('test normalizeZones from outside, to ', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = normalizeZones(zones, { from: -1, to: -5 });
    expect(result).toEqual([]);
  });

  it('test normalizeZones from 1.5, to 6.5', () => {
    let zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    let result = normalizeZones(zones, { from: 1.5, to: 6.5 });
    expect(result).toEqual([
      { from: 1.5, to: 2 },
      { from: 3, to: 4 },
      { from: 6, to: 6.5 },
    ]);
  });
});
