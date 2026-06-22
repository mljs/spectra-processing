import { expect, test } from 'vitest';

import { clearFFTCache, getFFT, setFFTCacheMaxSize } from '../fftCache.ts';

test('getFFT returns the same cached instance for the same size', () => {
  const first = getFFT(1024);
  const second = getFFT(1024);

  expect(second).toBe(first);
});

test('getFFT returns distinct instances for distinct sizes', () => {
  expect(getFFT(512)).not.toBe(getFFT(2048));
});

test('clearFFTCache forces a fresh instance to be built', () => {
  const before = getFFT(256);
  clearFFTCache();
  const after = getFFT(256);

  expect(after).not.toBe(before);
});

test('cache is bounded: a fresh instance is built after the cap is exceeded', () => {
  clearFFTCache();
  const original = getFFT(2);
  // Insert 10 further distinct sizes; the cap is 10, so reaching it clears the
  // whole cache and evicts the original size-2 instance.
  for (let power = 2; power <= 11; power++) getFFT(2 ** power);

  expect(getFFT(2)).not.toBe(original);
});

test('setFFTCacheMaxSize lowers the bound and clears when over it', () => {
  setFFTCacheMaxSize(10);
  const kept = getFFT(64);
  getFFT(128);
  getFFT(256);
  // Shrinking below the current count (3) clears the cache immediately.
  setFFTCacheMaxSize(2);

  expect(getFFT(64)).not.toBe(kept);

  setFFTCacheMaxSize(10); // restore for any later tests in this file
});

test('setFFTCacheMaxSize rejects non-positive or non-integer sizes', () => {
  expect(() => setFFTCacheMaxSize(0)).toThrow(RangeError);
  expect(() => setFFTCacheMaxSize(1.5)).toThrow(RangeError);
});
