import { xyArrayAlignToFirst } from '../xyArrayAlignToFirst.js';

describe('xyArrayAlignToFirst', function() {
  it('same length spectra, simple integers', () => {
    let data = [
      { x: [1, 1.1, 2, 4], y: [1, 1, 1, 1] },
      { x: [0.1, 0.95, 1.05, 3], y: [1, 1, 1, 1] },
      { x: [2.05, 3.9, 4.1, 4.9, 5.1], y: [1, 1, 1, 1, 3] },
    ];
    let result = xyArrayAlignToFirst(data, { delta: 0.25 });
    result.x = Array.from(result.x);
    result.ys = result.ys.map((array) => Array.from(array));
    expect(result).toStrictEqual({
      x: [0.1, 1, 1.1, 2, 3, 4, 5.05],
      ys: [
        [0, 1, 1, 1, 0, 1, 0],
        [1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 2, 4],
      ],
    });
  });
});
