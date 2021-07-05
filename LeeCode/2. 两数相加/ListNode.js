/**
 * @Author: tangxinmin
 * @Date: 2021-06-10 18:09:33
 * @LastEditTime: 2021-06-10 18:23:19
 * @LastEditors: tangxinmin
 * @Description: file content
 */
// 实现一个单链表
function Node(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

function ListNode() {
  let head = null
  let length = 0
  // 添加元素
  this.add = function (val) {
    let newNode = new Node(val)
    let current = null
    if (!head) {
      head = newNode
    } else {
      // current = head
      // while (current.next) {
      //   current = current.next
      // }
      current = this.findByNode(length - 1)
      current.next = newNode
    }

    length++
    return true
  }
  this.edit = function (val, newVal) {
    let current = this.find(val)
    current.val = newVal
    return newVal
  }
  // 插入节点
  this.insert = function (val, point) {
    let newNode = new Node(val)
    // 查询要插入节点位置的前驱节点
    // let index = 0
    // let prev = null
    // let current = head;
    if (point > -1 && point <= length) {
      if (point === 0) {
        newNode.next = head
        head = newNode
      } else {
        let current = this.findPreByNode(point)
        newNode.next = current && current.next ? current.next : null;
        current.next = newNode
        // while (index++ < point) {
        //   prev = current;
        //   current = current.next;
        // }
        // newNode.next = current;
        // prev.next = newNode;
      }
      length++
      return true
    } else {
      throw Error("超出节点范围！")
    }



  }
  // 查询元素下标
  this.indexOf = function (val) {
    let current = head, index = -1
    while (current) {
      index++
      if (current.val === val) {
        return index
      }
      current = current.next
    }
    return -1
  }
  // 查询节点（根据节点元素）
  this.find = function (val) {
    let current = head
    while (current && current.val !== val) {
      current = current.next
      // 若节点不存在 current === null 跳出循环
    }
    return current
  }
  // 查询节点(根据节点位置)
  this.findByNode = function (point) {
    let current = head
    let i = 0
    while (current && point > -1 && i++ < point) {
      current = current.next
    }
    return current
  }
  // 查询节点的前驱节点
  this.findPre = function (val) {
    let current = head
    while (current && !(current.next !== null && current.next.val === val)) {
      current = current.next
      // 若没有前驱节点 current === null 跳出循环 
    }
    return current
  }
  // 查询节点的前驱节点(根据节点位置)
  this.findPreByNode = function (point) {

    if (point > -1 && point <= length) {
      let current = head
      let i = 0
      if (point === 0) {
        return null
      } else {
        while (++i < point) {
          current = current.next
        }
        return current
      }
    } else {
      return null
    }

  }
  // 删除元素(根据元素)
  this.delete = function (val) {
    let current = this.findPre(val)
    if (current) {
      current.next = current.next.next
      length--
      return val
    } else {
      return null
    }


  }
  // 删除元素(根据节点位置)
  this.deleteByNode = function (point) {
    if (point > -1 && point < length) {
      let current = head
      let index = 0
      let prev = null

      if (point === 0) {
        head = current.next;
        length--
        return current.point
      } else {
        while (index++ < point) {
          prev = current;
          current = current.next;
        }
        prev.next = current.next;
        // console.log(head === prev) // true 指向同一个对象
        length--;
        return current.val;
      }
    } else {
      return null;
    }
  }
  // 返回链表长度
  this.size = function () {
    return length;
  }
  // 显示链表
  this.show = function () {
    let current = head;
    let str = ''
    while (current) {
      str += current.val
      current = current.next;
      if (current) {
        str += ' -> '
      }
    }
    // javascript -> html -> css -> react -> vue
    return str
  };
  // 判断链表是否为空
  this.isEmpty = function () {
    return length === 0
  }
  // 获取头节点
  this.getHead = function () {
    return head;
  }
}

const linked = new ListNode();
linked.add("0");
linked.add("1");
linked.add("2");
linked.add("3");
linked.add("4");
linked.insert("5", 5)



console.log("-----------------------显示链表------------------------")
console.log(linked.show())

// console.log("-----------------------编辑链表------------------------")
// console.log(linked.edit("2", "22"))
// console.log(linked.show())

// console.log("-----------------------判断链表是否为空------------------------")
// console.log(linked.isEmpty());

// console.log("-----------------------获取头节点------------------------")
// console.dir(linked.getHead(), { depth: 100 });

// console.log("-----------------------节点个数------------------------")
// console.log(linked.size());

// console.log("-----------------------查询元素下标------------------------")
// console.log(linked.indexOf("3"));

// console.log("-----------------------查询节点 根据节点元素------------------------")
// console.log(linked.find("0"));

// console.log("-----------------------查询节点 根据节点位置------------------------")
// console.log(linked.findByNode(0))

// console.log("-----------------------前驱节点------------------------")
// console.log(linked.findPre("0"));

// console.log("-----------------------前驱节点 根据节点位置------------------------")
// console.log(linked.findPreByNode(5));

// console.log("-----------------------根据元素 删除节点------------------------")
// console.log(linked.delete("6"))
// console.log(linked.size());
// console.log(linked.show())

// console.log("-----------------------根据节点 删除节点------------------------")
// console.log(linked.deleteByNode(1))
// console.log(linked.size());
// console.log(linked.show())


// 在删除中，没有直接给head直接赋值、，却改变了head的值 why?
let obj1 = { test: "1" }
let obj2 = { test: "1" }
// console.log(obj1 === obj2) // false  指针指向指向地址不同
//  === 两个复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，而是比较它们是否指向同一个对象。
let obj3 = { test: "1" }
let obj4 = obj3
// console.log(obj3 === obj4) //true
obj4.test = "2"
 // console.log(obj3) //{ test: '2' }