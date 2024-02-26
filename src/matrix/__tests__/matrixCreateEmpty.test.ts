import { matrixCreateEmpty } from '../matrixCreateEmpty';

test('should return an array of numbers', () => {
  const matrix = matrixCreateEmpty({
    nbColumns: 2,
    nbRows: 3,
    ArrayConstructor: Array,
  });
  expect(matrix).toHaveLength(3);
  expect(matrix[0]).toHaveLength(2);
  expect(matrix[0]).toBeInstanceOf(Array);
});
