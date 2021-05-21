//Q1_如何创建一个数组大小为100，每个值都为0的数组
const arr1 = Array(100).fill(0)
// console.log("arr1", arr1)
// out:
// [
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0
// ]
const arr2 = Array.from(Array(100), x => 0)
// console.log("arr2", arr2)

const arr3 = Array.from({ length: 100 }, x => 0)
// console.log("arr3", arr3)