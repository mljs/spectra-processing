import { xHilbertTransform } from '../../index';

describe('test hilbert transform of cos(t)', () => {
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
