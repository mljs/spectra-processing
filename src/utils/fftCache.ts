import FFT from 'fft.js';

// An FFT instance precomputes size-dependent twiddle factors and a bit-reversal
// table; for a 64k transform that setup dominates the cost. A single shared
// cache keeps one instance per size so every FFT-based function in the library
// (spectra, matrices, Hilbert transforms…) reuses it instead of rebuilding the
// tables on each call.
class FFTCache {
  #maxSize: number;
  readonly #instances = new Map<number, FFT>();

  constructor(maxSize = 1) {
    this.#maxSize = maxSize;
  }

  get maxSize(): number {
    return this.#maxSize;
  }

  set maxSize(value: number) {
    if (!Number.isInteger(value) || value < 1) {
      throw new RangeError(
        `FFT cache size must be a positive integer, got ${value}.`,
      );
    }
    this.#maxSize = value;
    // Honour the new bound right away: if already over it, drop everything,
    // matching the clear-when-full strategy used in get().
    if (this.#instances.size > value) this.#instances.clear();
  }

  get(size: number): FFT {
    let fft = this.#instances.get(size);
    if (fft === undefined) {
      // Bound the cache so transforming many different sizes cannot grow it
      // without limit. Rather than track insertion order to evict a single
      // entry, drop everything once full: distinct sizes are rare, so the
      // common workload never hits this and stays at full speed.
      if (this.#instances.size >= this.#maxSize) this.#instances.clear();
      fft = new FFT(size);
      this.#instances.set(size, fft);
    }
    return fft;
  }

  clear(): void {
    this.#instances.clear();
  }
}

// Process-wide singleton: a single shared cache, like a static global, but kept
// as an instance so its state stays fully encapsulated.
const fftCache = new FFTCache();

/**
 * Returns a cached `fft.js` instance for the given transform size, building it
 * on first use. Shared by every FFT-based function in the library so the
 * size-dependent lookup tables are computed once and reused across calls.
 * @param size - number of points of the transform.
 * @returns a reusable FFT instance for that size.
 */
export function getFFT(size: number): FFT {
  return fftCache.get(size);
}

/**
 * Releases every cached FFT instance. The library keeps one FFT instance per
 * transform size to avoid rebuilding its lookup tables on each call; each
 * instance holds tables proportional to its size (≈1 MB for a 64k transform).
 * Call this to free that memory once you are done transforming — for example
 * after processing a batch of large spectra. Subsequent transforms simply
 * rebuild whatever sizes they need.
 */
export function clearFFTCache(): void {
  fftCache.clear();
}

/**
 * Sets the maximum number of distinct transform sizes kept in the shared FFT
 * cache (default 1). When the cache is full and a new size is requested, the
 * whole cache is dropped and rebuilt on demand. Lowering the limit below the
 * current number of cached sizes clears the cache immediately.
 * @param maxSize - maximum number of cached sizes; must be a positive integer.
 */
export function setFFTCacheMaxSize(maxSize: number): void {
  fftCache.maxSize = maxSize;
}
