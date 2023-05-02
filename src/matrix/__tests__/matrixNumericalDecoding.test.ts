import { matrixNumericalDecoding, matrixNumericalEncoding } from '../../index';

describe('matrixNumericalDecoding', () => {
  let dataset = [
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

  it('The encoded and decoded dataset should equal the original dataset', () => {
    const { matrix, dictCategoricalToNumerical } =
      matrixNumericalEncoding(dataset);
    const decodedMatrix = matrixNumericalDecoding(
      matrix,
      dictCategoricalToNumerical,
    );
    expect(decodedMatrix).toStrictEqual(dataset);
  });
});
