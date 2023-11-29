import { xHilbertTransform, xMaxValue, xSampling } from '../..';

describe('test discrete hilbert transform', () => {
  const length = 50;
  it('test hilbert transform of cos -> sin function', () => {
    const cos = new Array(length)
      .fill(0)
      .map((_, i) => Math.cos((i * Math.PI) / 10));
    const sin = new Array(length)
      .fill(0)
      .map((_, i) => Math.sin((i * Math.PI) / 10));
    const trs = xHilbertTransform(cos);
    const result = Array.from(trs);
    // Excluding some points due to the edge effects
    for (let i = 5; i < 45; i++) {
      expect(result[i]).toBeCloseTo(sin[i], 1);
    }
  });

  it('test hilbert transform of sin -> -cos function', () => {
    const minusCos = new Array(length)
      .fill(0)
      .map((_, i) => -Math.cos((i * Math.PI) / 10));
    const sin = new Array(length)
      .fill(0)
      .map((_, i) => Math.sin((i * Math.PI) / 10));
    const trs = xHilbertTransform(sin);
    const result = Array.from(trs);
    // Excluding some points due to the edge effects
    for (let i = 15; i < 35; i++) {
      expect(result[i]).toBeCloseTo(minusCos[i], 1);
    }
  });
});

describe('test fast hilbert transform', () => {
  const length = 2 ** 6;
  it('test hilbert transform of cos -> sin function', () => {
    const cos = new Float64Array(length).map((_, i) =>
      Math.cos((i * Math.PI) / 32),
    );
    const sin = new Float64Array(length).map((_, i) =>
      Math.sin((i * Math.PI) / 32),
    );
    const result = xHilbertTransform(cos);
    for (let i = 0; i < 64; i++) {
      expect(result[i]).toBeCloseTo(sin[i], 6);
    }
  });

  it('test hilbert transform of sin -> -cos function', () => {
    const minusCos = new Float64Array(length).map(
      (_, i) => -Math.cos((i * Math.PI) / 32),
    );
    const sin = new Float64Array(length).map((_, i) =>
      Math.sin((i * Math.PI) / 32),
    );
    const result = xHilbertTransform(sin);
    for (let i = 0; i < 64; i++) {
      expect(result[i]).toBeCloseTo(minusCos[i], 6);
    }
  });

  it('test hilbert transform of squareWave function', () => {
    const p = 2 ** 4;
    const squareWave = new Float64Array(length);
    for (let i = 0; i < length; i++) {
      squareWave[i] = i % p < p / 2 ? 1 : -1;
    }
    const result = xHilbertTransform(squareWave);
    const maxValue = xMaxValue(result);
    for (let i = 0; i < length / p; i++) {
      expect(result[i * p]).toStrictEqual(-maxValue);
      expect(result[i * p + p * 0.5]).toStrictEqual(maxValue);
      expect(result[i * p + p * 0.25]).toBeCloseTo(0, 10);
      expect(result[i * p + p * 0.75]).toBeCloseTo(0, 10);
    }
  });
});

describe('test fast hilbert transform with forceFFT (array length greater than a power of 2)', () => {
  const length = 2 ** 6;
  const x = new Float64Array(length);
  const cos = new Float64Array(length);
  const sin = new Float64Array(length);
  const minusCos = new Float64Array(length);
  const t = length;
  for (let i = 0; i < length; i++) {
    x[i] = i;
    cos[i] = Math.cos((i * Math.PI) / (t / 2));
    sin[i] = Math.sin((i * Math.PI) / (t / 2));
    minusCos[i] = -Math.cos((i * Math.PI) / (length / 2));
  }
  const diff = 10;
  const scos = xSampling(cos, { length: length + diff });
  const ssin = xSampling(sin, { length: length + diff });
  const tcos = xSampling(xHilbertTransform(scos, { forceFFT: true }), {
    length,
  });
  const tsin = xSampling(xHilbertTransform(ssin, { forceFFT: true }), {
    length,
  });
  it('test hilbert transform of cos -> sin function', () => {
    for (let i = 1; i < length - 1; i++) {
      expect(tcos[i]).toBeCloseTo(sin[i], 1);
    }
  });

  it('test hilbert transform of sin -> -cos function', () => {
    for (let i = 1; i < length - 1; i++) {
      expect(tsin[i]).toBeCloseTo(minusCos[i], 1);
    }
  });
});

describe('test fast hilbert transform with forceFFT (array length less than a power of 2)', () => {
  const length = 2 ** 6;
  const x = new Float64Array(length);
  const cos = new Float64Array(length);
  const sin = new Float64Array(length);
  const minusCos = new Float64Array(length);
  const t = length;
  for (let i = 0; i < length; i++) {
    x[i] = i;
    cos[i] = Math.cos((i * Math.PI) / (t / 2));
    sin[i] = Math.sin((i * Math.PI) / (t / 2));
    minusCos[i] = -Math.cos((i * Math.PI) / (length / 2));
  }
  const diff = -10;
  const scos = xSampling(cos, { length: length + diff });
  const ssin = xSampling(sin, { length: length + diff });
  const tcos = xSampling(xHilbertTransform(scos, { forceFFT: true }), {
    length,
  });
  const tsin = xSampling(xHilbertTransform(ssin, { forceFFT: true }), {
    length,
  });
  it('test hilbert transform of cos -> sin function', () => {
    for (let i = 0; i < length; i++) {
      expect(tcos[i]).toBeCloseTo(sin[i], 2);
    }
  });

  it('test hilbert transform of sin -> -cos function', () => {
    for (let i = 0; i < length; i++) {
      expect(tsin[i]).toBeCloseTo(minusCos[i], 2);
    }
  });
});
