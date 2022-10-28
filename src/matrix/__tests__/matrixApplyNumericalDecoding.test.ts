import { matrixApplyNumericalEncoding } from '../matrixApplyNumericalEncoding';
import { matrixNumericalEncoding } from '../matrixNumericalEncoding';

describe('matrixApplyNumericalEncoding', () => {
  let datasetForEncoding = [
    [73, 'a', 'o', 152],
    [93, 'b', 'u', 185],
    [89, 'c', 'p', 180],
    [96, 'd', 'v', 196],
    [73, 'e', 'j', 142],
    [53, 'f', 'w', 101],
    [69, 'g', 'x', 149],
    [47, 'h', 'y', 115],
    [87, 'i', 'p', 175],
    [79, 'j', 'b', 164],
    [69, 'j', 'm', 141],
    [70, 'k', 'g', 141],
    [93, 'l', 'c', 184],
    [79, 'a', 'm', 152],
    [70, 'm', 'z', 148],
    [93, 'n', 'aa', 192],
  ];

  let datasetToEncode = [
    [78, 'o', 'ab', 147],
    [81, 'p', 'u', 183],
    [88, 'q', 's', 177],
    [78, 'r', 'x', 159],
    [82, 's', 'p', 177],
    [86, 't', 'n', 175],
    [78, 'r', 'ac', 175],
    [76, 'r', 'ad', 149],
    [96, 'u', 'l', 192],
  ];

  it('should return an array of numbers', () => {
    const { dictCategoricalToNumerical } =
      matrixNumericalEncoding(datasetForEncoding);
    const matrix = matrixApplyNumericalEncoding(
      datasetToEncode,
      dictCategoricalToNumerical,
    );

    const nonNumbers = matrix
      .flat(2)
      .filter((value) => typeof value !== 'number');
    expect(nonNumbers).toHaveLength(0);
  });
});
