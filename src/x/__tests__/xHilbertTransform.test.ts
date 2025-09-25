import { expect, test } from 'vitest';

import { xHilbertTransform } from '../xHilbertTransform.ts';
import { xMaxValue } from '../xMaxValue.ts';

test('discrete hilbert transform', () => {
  const length = 50;
  const cos = new Float64Array(length);
  const sin = new Float64Array(length);
  const minusCos = new Float64Array(length);
  const t = 10;
  for (let i = 0; i < length; i++) {
    cos[i] = Math.cos((i * Math.PI) / t);
    sin[i] = Math.sin((i * Math.PI) / t);
    minusCos[i] = -Math.cos((i * Math.PI) / t);
  }
  const tcos = xHilbertTransform(cos);
  const tsin = xHilbertTransform(sin);
  // cos -> sin (Excluding some points due to the edge effects)
  for (let i = 5; i < 45; i++) {
    expect(tcos[i]).toBeCloseTo(sin[i], 1);
  }
  // sin -> -cos (Excluding some points due to the edge effects)
  for (let i = 15; i < 35; i++) {
    expect(tsin[i]).toBeCloseTo(minusCos[i], 1);
  }
});

test('fast hilbert transform', () => {
  const length = 64;
  const cos = new Float64Array(length);
  const sin = new Float64Array(length);
  const minusCos = new Float64Array(length);
  const t = 32;
  for (let i = 0; i < length; i++) {
    cos[i] = Math.cos((i * Math.PI) / t);
    sin[i] = Math.sin((i * Math.PI) / t);
    minusCos[i] = -Math.cos((i * Math.PI) / t);
  }
  const tcos = xHilbertTransform(cos);
  const tsin = xHilbertTransform(sin);
  // cos -> sin
  for (let i = 0; i < 64; i++) {
    expect(tcos[i]).toBeCloseTo(sin[i], 6);
  }
  // sin -> -cos
  for (let i = 0; i < 64; i++) {
    expect(tsin[i]).toBeCloseTo(minusCos[i], 6);
  }
});

test('fast hilbert transform of squareWave function', () => {
  const length = 64;
  const p = 16;
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

test('fast hilbert transform with forceFFT (array length greater than a power of 2)', () => {
  const length = 74;
  const cos = new Float64Array(length);
  const sin = new Float64Array(length);
  const minusCos = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    cos[i] = Math.cos((i * Math.PI) / (length / 2));
    sin[i] = Math.sin((i * Math.PI) / (length / 2));
    minusCos[i] = -Math.cos((i * Math.PI) / (length / 2));
  }
  const tcos = xHilbertTransform(cos, { forceFFT: true });
  const tsin = xHilbertTransform(sin, { forceFFT: true });
  // test hilbert transform of cos -> sin function
  for (let i = 0; i < length; i++) {
    expect(tcos[i]).toBeCloseTo(sin[i], 1);
  }
  // test hilbert transform of sin -> -cos function
  for (let i = 0; i < length; i++) {
    expect(tsin[i]).toBeCloseTo(minusCos[i], 1);
  }
});

test('fast hilbert transform with forceFFT (array length less than a power of 2)', () => {
  const length = 54;
  const x = new Float64Array(length);
  const cos = new Float64Array(length);
  const sin = new Float64Array(length);
  const minusCos = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    x[i] = i;
    cos[i] = Math.cos((i * Math.PI) / (length / 2));
    sin[i] = Math.sin((i * Math.PI) / (length / 2));
    minusCos[i] = -Math.cos((i * Math.PI) / (length / 2));
  }

  // force hilbert transform to use fft
  const tcos = xHilbertTransform(cos, { forceFFT: true });
  const tsin = xHilbertTransform(sin, { forceFFT: true });
  // test hilbert transform of cos -> sin function
  for (let i = 0; i < length; i++) {
    expect(tcos[i]).toBeCloseTo(sin[i], 1);
  }
  // test hilbert transform of sin -> -cos function
  for (let i = 0; i < length; i++) {
    expect(tsin[i]).toBeCloseTo(minusCos[i], 1);
  }
});
