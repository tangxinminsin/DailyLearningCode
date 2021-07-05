/**
 * @Author: tangxinmin
 * @Date: 2021-06-08 14:30:09
 * @LastEditTime: 2021-06-08 14:35:20
 * @LastEditors: tangxinmin
 * @Description:
 * @FilePath: \LeeCode\1. 两数之和\index.js
 * @no bug
 /
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0, len = nums.length; i < len; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    } else {
      map.set(nums[i], i);
    }
  }
  return [];
};
const value = twoSum([2, 7, 11, 15], 9)
console.log(value)