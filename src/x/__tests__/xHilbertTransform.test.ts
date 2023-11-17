import { xHilbertTransform } from '../../index';

describe('test hilbert transform', () => {
  const length = 2 ** 6;
  it('test hilbert transform of cos -> sin function', () => {
    const cos = new Array(length)
      .fill(0)
      .map((_, i) => Math.cos((i * Math.PI) / 32));
    const sin = new Array(length)
      .fill(0)
      .map((_, i) => Math.sin((i * Math.PI) / 32));
    const t = xHilbertTransform(cos);
    const result = Array.from(t.im);
    for (let i = 0; i < 64; i++) {
      expect(result[i]).toBeCloseTo(sin[i], 6);
    }
  });

  it('test hilbert transform of sin -> -cos function', () => {
    const minusCos = new Array(length)
      .fill(0)
      .map((_, i) => -Math.cos((i * Math.PI) / 32));
    const sin = new Array(length)
      .fill(0)
      .map((_, i) => Math.sin((i * Math.PI) / 32));
    const t = xHilbertTransform(sin);
    const result = Array.from(t.im);
    for (let i = 0; i < 64; i++) {
      expect(result[i]).toBeCloseTo(minusCos[i], 6);
    }
  });
});
