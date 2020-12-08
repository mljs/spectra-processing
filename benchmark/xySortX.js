import { xyQuickSortX } from '../src/xy/xySortX'
import xySortX from 'ml-array-xy-sort-x'

let x = new Array(100000).fill(0).map(Math.random)
let y = new Array(100000).fill(0).map((value, index) => index)




console.time('xySortX');
for (let i = 0; i < 5; i++) {
    let result = xySortX({ x, y })
}
console.timeEnd('xySortX')

