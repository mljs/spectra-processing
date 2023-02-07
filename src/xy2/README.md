# xy2

This folder deals with data structure like:

`[number,number][]`

It allows for example to convert an array of array containing 2 values to an object {x: [], y:[]}

```js
const result = xy2ToXY([
  [1, 2],
  [2, 4],
  [5, 4],
  [8, 5],
]);
console.log(result);
//  { x: [1, 2, 5, 8], y: [2, 4, 4, 5] }
```
