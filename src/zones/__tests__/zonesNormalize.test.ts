import { zonesNormalize } from '../zonesNormalize';

describe('zonesNormalize', () => {
  it('no zones', () => {
    const result = zonesNormalize([]);
    expect(result).toStrictEqual([
      { from: Number.NEGATIVE_INFINITY, to: Number.POSITIVE_INFINITY },
    ]);
  });

  it('no zones but from to', () => {
    const result = zonesNormalize([], { from: 0, to: 10 });
    expect(result).toStrictEqual([{ from: 0, to: 10 }]);
  });

  it('test normalize', () => {
    const zones = [
      { from: 1, to: 2 },
      { from: 4, to: 2 },
      { from: 1, to: 2 },
      { from: 5, to: 6 },
      { from: 6, to: 7 },
    ];

    const result = zonesNormalize(zones);
    expect(result).toStrictEqual([
      { from: 1, to: 4 },
      { from: 5, to: 7 },
    ]);
  });

  it('test normalize no overlap', () => {
    const zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    const result = zonesNormalize(zones);
    expect(result).toStrictEqual([
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 6, to: 7 },
    ]);
  });

  it('test normalize from, to', () => {
    const zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    const result = zonesNormalize(zones, { from: 10, to: 5 });
    expect(result).toStrictEqual([{ from: 6, to: 7 }]);
  });

  it('test normalize from, to outside', () => {
    const zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    const result = zonesNormalize(zones, { from: 10, to: 12 });
    expect(result).toStrictEqual([]);
  });

  it('test normalize from outside, to', () => {
    const zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    const result = zonesNormalize(zones, { from: -1, to: -5 });
    expect(result).toStrictEqual([]);
  });

  it('test normalize from 1.5, to 6.5', () => {
    const zones = [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
      { from: 7, to: 6 },
    ];

    const result = zonesNormalize(zones, { from: 1.5, to: 6.5 });
    expect(result).toStrictEqual([
      { from: 1.5, to: 2 },
      { from: 3, to: 4 },
      { from: 6, to: 6.5 },
    ]);
  });
  it('test normalize small zones with big fractions that combined into one zone from 1 to 8', () => {
    const zones = [
      {
        from: 3.9,
        to: 4.4,
      },
      {
        from: 5.25,
        to: 5.5,
      },
      {
        from: 6.1,
        to: 6.5,
      },
      {
        from: 6.9,
        to: 7.5,
      },
      {
        from: 1.4,
        to: 8.9,
      },
    ];
    const result = zonesNormalize(zones);
    expect(result).toStrictEqual([{ from: 1.4, to: 8.9 }]);
  });
});

describe('zonesNormalize with exclusions', () => {
  it('no zones', () => {
    const result = zonesNormalize([], { exclusions: [{ from: 1, to: 2 }] });
    expect(result).toStrictEqual([
      { from: Number.NEGATIVE_INFINITY, to: 1 },
      { from: 2, to: Number.POSITIVE_INFINITY },
    ]);
  });

  it('no zones but from to', () => {
    const result = zonesNormalize([], {
      from: 0,
      to: 10,
      exclusions: [{ from: 1, to: 2 }],
    });
    expect(result).toStrictEqual([
      { from: 0, to: 1 },
      { from: 2, to: 10 },
    ]);
  });
  it('exclusions after', () => {
    const zones = [
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 7, to: 6 },
    ];

    const result = zonesNormalize(zones, {
      exclusions: [
        { from: 10, to: 13 },
        { from: 20, to: 40 },
      ],
    });
    expect(result).toStrictEqual([
      { from: 1, to: 4 },
      { from: 6, to: 7 },
    ]);
  });

  it('exclusions before', () => {
    const zones = [
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 7, to: 6 },
    ];

    const result = zonesNormalize(zones, {
      exclusions: [
        { from: -5, to: -2 },
        { from: -2, to: 0 },
      ],
    });
    expect(result).toStrictEqual([
      { from: 1, to: 4 },
      { from: 6, to: 7 },
    ]);
  });

  it('test normalize with exclusions at the beginning', () => {
    const zones = [
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 7, to: 6 },
    ];

    const result = zonesNormalize(zones, {
      exclusions: [
        { from: -1, to: 3 },
        { from: 2, to: 4 },
      ],
    });
    expect(result).toStrictEqual([{ from: 6, to: 7 }]);
  });

  it('test normalize with exclusions with same from to', () => {
    const zones = [
      { from: 1, to: 4 },
      { from: 5, to: 6 },
    ];

    const result = zonesNormalize(zones, {
      exclusions: [
        { from: 1, to: 4 },
        { from: 5, to: 6 },
      ],
    });
    expect(result).toStrictEqual([]);
  });

  it('test normalize with exclusions at the end', () => {
    const zones = [
      { from: 1, to: 4 },
      { from: 5, to: 6 },
      { from: 7, to: 8 },
    ];

    const result = zonesNormalize(zones, {
      exclusions: [{ from: 1, to: 6 }],
    });
    expect(result).toStrictEqual([{ from: 7, to: 8 }]);
  });

  it('test normalize with one exclusion and perfect match', () => {
    const zones = [
      { from: 1, to: 4 },
      { from: 5, to: 6 },
      { from: 7, to: 8 },
    ];

    const result = zonesNormalize(zones, {
      exclusions: [{ from: 5, to: 6 }],
    });
    expect(result).toStrictEqual([
      { from: 1, to: 4 },
      { from: 7, to: 8 },
    ]);
  });

  it('test normalize with one exclusion non exact', () => {
    const zones = [
      { from: 1, to: 4 },
      { from: 5, to: 6 },
      { from: 7, to: 8 },
    ];

    const result = zonesNormalize(zones, {
      exclusions: [{ from: 4.5, to: 6.5 }],
    });
    expect(result).toStrictEqual([
      { from: 1, to: 4 },
      { from: 7, to: 8 },
    ]);
  });

  it('test normalize with one exclusion not match', () => {
    const zones = [{ from: 1, to: 10 }];

    const result = zonesNormalize(zones, {
      exclusions: [
        { from: 2, to: 3 },
        { from: 5, to: 6 },
      ],
    });
    expect(result).toStrictEqual([
      { from: 1, to: 2 },
      { from: 3, to: 5 },
      { from: 6, to: 10 },
    ]);
  });

  it('test normalize with one exclusion at the beginning', () => {
    const zones = [{ from: 0, to: 10 }];

    const result = zonesNormalize(zones, {
      exclusions: [{ from: -2, to: 3 }],
    });
    expect(result).toStrictEqual([{ from: 3, to: 10 }]);
  });

  it('test normalize with complex exclusions', () => {
    const zones = [
      { from: 0, to: 10 },
      { from: 20, to: 30 },
    ];

    const result = zonesNormalize(zones, {
      exclusions: [
        { from: -2, to: 3 },
        { from: 5, to: 6 },
        { from: 9, to: 10 },
        { from: 15, to: 16 },
      ],
    });
    expect(result).toStrictEqual([
      { from: 3, to: 5 },
      { from: 10, to: 10 },
      { from: 6, to: 9 },
      { from: 10, to: 10 },
      { from: 20, to: 30 },
    ]);
  });
});
