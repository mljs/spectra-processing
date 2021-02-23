import { xyArrayAlign } from '../xyArrayAlign.js';

describe('xyArrayAlign', function () {
  it('same length spectra, simple integers', () => {
    let data = [
      { x: [1, 2, 3], y: [1, 1, 1] },
      { x: [0.1, 1.1, 2.1, 3.1, 4.1], y: [1, 1, 1, 1, 1] },
      { x: [2.9, 3.1, 3.9, 4.9], y: [1, 1, 1, 1] },
    ];
    let result = xyArrayAlign(data, { delta: 0.15 });

    result.x = Array.from(result.x);
    result.ys = result.ys.map((array) => Array.from(array));

    expect(result).toStrictEqual({
      x: [0.1, 1.05, 2.05, 3.025, 3.9, 4.1, 4.9],
      ys: [
        [0, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 0],
        [0, 0, 0, 2, 1, 0, 1],
      ],
    });
  });
});
