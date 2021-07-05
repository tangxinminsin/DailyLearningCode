// ES5
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

// ES6
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
var p = new Point(1, 2);
console.log(p.toString()) //(1,2)

// 类的数据类型就是函数，类本身就指向构造函数。
typeof Point // "function"
Point === Point.prototype.constructor // true

// 构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
// 等同于
Point.prototype = {
  toString() { },
};


//Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
//Object.assign()方法可以很方便地一次向类添加多个方法。
class Point {
  constructor() {
    // ...
  }
}

Object.assign(Point.prototype, {
  toString() { },
  toValue() { }
});
//类的内部所有定义的方法，都是不可枚举的。一点与 ES5 的行为不一致。/// ES6
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
// ES5
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function () {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]


//类中定义的静态方法不能被实例继承，父类的静态方法，可以被子类继承。

// new.target属性可以用来确定构造函数是怎么调用的(只能通过new 实例化)。Class 内部调用new.target，返回当前 Class。Class 内部调用new.target，返回当前 Class。利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。