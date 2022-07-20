import { matrixCreateEmpty } from '../matrixCreateEmpty';

describe('matrixCreateEmpty', () => {
  it('should return an array of numbers', () => {
    const matrix = matrixCreateEmpty({
      nbColumns: 2,
      nbRows: 3,
      ArrayConstructor: Float32Array,
    });
    expect(matrix).toHaveLength(3);
    expect(matrix[0]).toHaveLength(2);
    expect(matrix[0]).toBeInstanceOf(Float32Array);
  });
});
