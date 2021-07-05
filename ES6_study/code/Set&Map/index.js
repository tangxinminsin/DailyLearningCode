/**
 * @Author: tangxinmin
 * @Date: 2021-06-08 16:08:23
 * @LastEditTime: 2021-06-08 17:14:52
 * @LastEditors: tangxinmin
 * @Description:
 * @FilePath: \ES6_study\code\Set&Map\index.js
 * @no bug
 */
//Set
const s = new Set();
const t = new Set();
const v = 'stringing';
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
t.add(v)

for (let i of s) {
  console.log(i);// 2 3 5 4
}
//Array.from方法可以将 Set 结构转为数组。
console.log(Array.from([...t]))//[ 'stringing' ] 
console.log([...new Set('ababbc')].join(''))//"abc"
console.log([...new Set('ababbc')])//"abc"
const st = new Set("stringing");
console.log(st)
console.log(new Set(v))

//两个对象总是不相等的。
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2


//Map
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"