/**
 * Numerically encodes the strings in the array with an encoding dictionary
 * @param array - original array before encoding
 * @param dictionnary - dictionary against which to do the encoding
 * @returns - encoded array
 */
export function applyNumericEncoding(array : (string|number)[][], dictionnary : { [nameString: string]: number }) {

    let arrayOfValues = [];
    for(let key in dictionnary) {
        arrayOfValues.push(dictionnary[key]);
    }
    let k = Math.max(...arrayOfValues);

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[0].length; j++) {
            if (typeof array[i][j] === 'string') {
                if (array[i][j] in dictionnary) {
                    array[i][j] = dictionnary[array[i][j]];
                } else {
                    k = k + 1;
                    dictionnary[array[i][j]] = k;
                    array[i][j] = k;
                }
            }
        }
    }
    return array;
}
