/**
 * Numerically encodes the strings in the array and returns an encoding dictionary which can be used to encode other arrays
 * @param array - original array before encoding
 * @returns - dictionnary from string to number
 */
export function numericEncodingOfArray(array : (string|number)[][]) {

    let nRows = array.length;
    let nColumns = array[0].length;

    let dictCategoricalToNumerical: { [nameString: string]: number } = {};
    let k = 0;

    for (let i = 0; i < nRows; i++) {
        for (let j = 0; j < nColumns; j++) {
            if (typeof array[i][j] === 'string') {
                if (array[i][j] in dictCategoricalToNumerical) {
                    array[i][j] = dictCategoricalToNumerical[array[i][j]];
                } else {
                    dictCategoricalToNumerical[array[i][j]] = k;
                    array[i][j] = k;
                    k = k + 1;
                }
            }
        }
    }
    return dictCategoricalToNumerical;
}
