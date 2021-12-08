/**
 * @Author: tangxinmin
 * @Date: 2021-08-20 14:50:26
 * @LastEditors: tangxinmin
 * @LastEditTime: 2021-08-20 14:53:22
 * @Description: file content
 */
class Person {
  constructor() {
    this.name = "sin"
  }
  getName() {
    return this.name
  }
}
let value = new Person()
alert(value.getName())