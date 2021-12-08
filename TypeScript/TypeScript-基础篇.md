#  TypeScript

## 基础篇

### 重塑“类型思维”

+ JavaScript是一门动态弱类型语言，对变量的类型非常的宽容，而且不会在这些变量和他们的调用者之间建立解构化的契约。
+ TypeScript是拥有类型系统的JavaScript的超集，可以编译成纯JavaScript。

+  为什么要用TypeScript？

  + 三要点：

  1. 类型检查：TypeScript会在编译代码时，进行严格的静态类型检查
  2. 语言扩展：TypeScript会包括来自ES6和未来提案中的特性，比如异步操作和装饰器
  3. 工具属性：TypeScript可以编译成标准的JavaScript，可以在任何浏览器、操作系统上运行

  +  其他好处:

  1. 接口定义可以直接代替文档，
  2. 同时也可以提高开发效率，降低维护成本，
  3. 更重要的是TypeScript可以重塑“类型思维”。

### 类型基础

+ 强类型和弱类型
  + 强类型

    强类型语言不能改变变量的数据类型，除非进行强制转换：Java、C#、Python

  + 弱类型

    弱类型语言可以改变变量的数据类型：JavaScript、PHP

+ 动态类型和静态类型
  + 动态类型

    动态类型语言在执行阶段确定变量的类型：JavaScript、PHP、Python

  + 静态类型

    静态类型语言在编译阶段确定变量的类型：Java、C#、C/C++

### 编写第一个TypeScript程序

+ 创建一个文件夹，初始化工程

> npm init -y

+ 全局安装TypeScript,生成ts配置项

> npm install -g typescript
>
> tsc --init

+ 编译一个ts文件
  + 新建一个src文件夹，新建index.ts，内容如下：

  >  let hello:string = "hello TypeScrip"

  + 编译

  > tsc ./src/index.ts

  + 然后可以看到src目录下生成了一个index.js文件，内容如下：

  > "use strict";
  >
  > var hello = "hello TypeScrip";

+ 配置构建工具webpack
  
  + 安装需要的包

> npm i webpack webpack -cli webpack-dev-server -D
>
> npm i ts-loader typescript -D
>
> npm i html-webpack-plugin -D
>
> npm i clean-webpack-plugin -D
>
> npm i webpack-merge -D

+ 配置文件
  + 在配置webpack时需要区分开发环境和生产环境，因为两个环境是不一样的，需要做不同的事情，为了可维护性，将开发环境、生产环境和公共环境的配置分开写，然后使用插件合并。  

  + 新建build目录。创建四个配置文件:webpack.base.config.js(公共环境配置文件)、webpcak.config.js(所有配置文件的入口文件)、webpack.dev.config.js(开发环境)、webpack.pro.config.js(生产环境)

+ 配置文件内容

webpack.base.config.js(公共环境配置文件)

```JS
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.ts',//入口文件
    output: {
        filename: 'app.js'//输出文件
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']//指定扩展名
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: [{
                    loader: 'ts-loader'//npm i ts-loader typescript -D
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
       //HtmlWebpackPlugin通过一个模板生成html首页，并把输出文件自动嵌入到这个文件中
            template: './src/tpl/index.html'
        })
    ]
}

```

webpack.dev.config.js(开发环境)

```JS
module.exports = {
    devtool: 'cheap-module-eval-source-map'
}
//cheap 表示source-map会忽略文件的列信息，因为在调试的时候列信息是没有用的
//module 会定位到我们的ts源码，而不是结果loader转义后的js源码
//eval-source-map - 每个模块使用 eval() 执行，并且 SourceMap 转换为 DataUrl 后添加到 eval() 中。初始化 SourceMap 时比较慢，但是会在重构建时提供很快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中
```

webpack.pro.config.js(生产环境)

```JS
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// npm i clean-webpack-plugin -D
//作用：每次成功构建之后清空dist目录，因为每次构建都会生成带hash的文件，这些带 hash 的 app.bundle.js 只有最新的才有用，其他的都没用，我们要在 build 之前把它们全清空，这真是 clean-webpack-plugin 发挥的作用。
module.exports = {
    plugins: [
        new CleanWebpackPlugin()
    ]
}

```

webpcak.config.js(所有配置文件的入口文件)

```JS
const { merge } = require('webpack-merge')//合并配置文件
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

module.exports = (env, argv) => {
    let config = argv.mode === 'development' ? devConfig : proConfig;
    //判断当前是开发环境还是生产环境
    return merge(baseConfig, config);
};
```



+ 编写模板文件

在src下创建tpl文件夹，在tpl文件夹下创建index.html文件，内容如下：

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypeScrip Demo1</title>
</head>

<body>
    <div class="app"></div>
</body>

</html>
```



+ 修改npm的脚本package.json

```json
{
    "name": "ts_demo1",
    "version": "1.0.0",
    "description": "",
    "main": "./src/index.js",//更改入口
    "scripts": {
        "start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",//启动命令 设置为开发环境   指定配置文件
        "build": "webpack  --mode=production --config ./build/webpack.config.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "clean-webpack-plugin": "^3.0.0",
        "html-webpack-plugin": "^4.3.0",
        "ts-loader": "^8.0.1",
        "typescript": "^3.9.7",
        "webpack": "^4.43.0",
        "webpack-cli": "^3.3.12",
        "webpack-dev-server": "^3.11.0",j
        "webpack-merge": "^5.0.9"
    }
}
```

+ 修改index.ts,并运行

```json
 let hello:string = "hello TypeScrip"
//将字符串插入到html页面中
 document.querySelectorAll('.app')[0].innerHTML = hello
 //uerySelectorAll() 方法返回文档中匹配指定 CSS 选择器的所有元素

```

+ 运行：

> npm run start

+ 构建

> npm  run build

构建成功后，目录中会生成dist目录，包含app.js和index.html

### 基本数据类型

+ ES6和TypeScript对比

  |      ES6      |  TypeScript   | TypeScript新增 |
  | :-----------: | :-----------: | :------------: |
  |  **Boolean**  |  **Boolean**  |    **void**    |
  |  **Number**   |  **Boolean**  |    **any**     |
  |  **String**   |  **String**   |   **never**    |
  |   **Array**   |   **Array**   |    **元组**    |
  | **Function**  | **Function**  |    **枚举**    |
  |  **Object**   |  **Object**   |  **高级类型**  |
  |  **Symbol**   |  **Symbol**   |                |
  | **undefined** | **undefined** |                |
  |   **null**    |   **null**    |                |

+ 类型注解

  作用：相当于强类型语言中的类型声明

  语法：（变量/函数）：type

+ 数据类型的定义

  ```JS
  //原始类型
  let bool: boolean =true
  let num: number = 123
  let str: string = 'sin'
  //str = 123 会报错，因为不允许改变数据类型
  
  //数组
  let arr1: number[] = [1,2,3]
  let arr2: Array<number|String> = [1,2,3,'4']
  //Array泛型接口，若要在数组中添加其他类型数据，则使用“|”实现联合类型
  
  //元组
  let tuple: [number,string] = [0,"1"]
  //元组是一种特殊的数组，它限定了数据的类型和个数
  /**
  元组越界问题：
  使用:tuple.push(2),不会报错，在控制台也可以看到元组中新增了一个2
  但是使用：tuple[2]会报错，不能访问该下标 
  **/
  
  //函数
  let add1 = (x:number,y:number) => x+y
  let add2 = (x:number,y:number):number => x+y//最后一个number为定义函数的返回类型，默认可以省略
  let compute:(x:number,y:number)=>number
  compute=(a,b)=>a+b
  // console.log(add1(1,2))
  // console.log(compute(3,4))
  
  //对象
  /**
  let obj: object = {x:1,y:2}
  obj.x=3 
  在js中可以通过obj.x修改x属性，但在js中是不允许的，因为只是定义object，并没有定义具体包含哪些属性
  **/
  let obj: {x:number,y:number} = {x:1,y:2}
  obj.x=3 
  
  // symbol 
  //symbol的含义就是具有唯一的值
  // 凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
  let s1:symbol = Symbol()
  let s2 = Symbol()
  //console.log(s1===s2)   //return false
  
  //undefined,null
  let un: undefined = undefined   //若给un赋值其他类型会报错
  let nu: null = null
  /** 
  undefined和null是任何类型的子类型，说明它们可以被赋值给其他类型
  解决方案：
  1.在tsconfig.js中找到strictNullChecks，将它设置为false
  2.使用联合类型“|”：let num ：number|undefined|null
  num = undefined
  num = null
  **/
  
  // void
  let noReturn =() =>{}
  // void让任何表达式返回undefined  如在 viod 0 
  // console.log(void 0)
  //  当一个函数没有返回值时，通常会见到其返回值类型是 void
  
  // any 任何类型，使用any类型就和js没有区别了
  // ts 通过any类型实现了对js的兼容
  let x
  // x = 1
  // x = []
  // x = () =>{}
  
  //never
  // nerve 表示永远不会有返回值的类型
  let error = () =>{
      throw new Error('error')//当函数抛出异常就不会有返回值
  }
  let endless = () =>{
      while(true){}//死循环
  }
  ```

  

### 枚举类型

+ 枚举：一组有名字的常量集合

```TS
//数字枚举
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
// console.log(Direction.Up)//1
// console.log(Direction[1])//Up
// console.log(Direction)
//Up使用初始化为 1。 其余的成员会从 1开始自动增长。 换句话说， Direction.Up的值为 1， Down为 2， Left为 3， Right为 4。若是没有初始化，则从0开始自增

//字符串枚举
enum Message {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

//异构枚举   混合字符串和数字成员
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

//枚举成员
// Direction.Up =2  会报错，枚举中的值只读不可修改
enum Char{
    //const 常量枚举  会在编译的阶段进行计算，以常量的形式出现在运行环境
    a,//没有初始值
    b=Char.a,//对已有枚举成员的引用
    c=1+3,//常量表达式
    //computed 需要被计算的枚举成员  这些值不会在编译阶段进行计算，而会被保留到程序的执行阶段
    d=Math.random(),
    e='123'.length,

    //在需要被计算的枚举成员的后面的枚举成员需要赋初始值
    w=4
}

//常量枚举 用const声明
//特性：在编译阶段会被移除
//当我们不需要一个对象，而需要一个值的时候就可以用常量枚举，这样会减少我们在编译阶段的代码
const enum Month{
    Jan,
    Feb,
    Mar
}
// let month=[Month.Jan,Month.Feb,Month.Mar]
// console.log(month)

//枚举类型
//在某先情况下，枚举和枚举类型都可以作为一种单独的类型存在
enum E {a,b}//枚举成员未定义初始值
enum F {a=0,b=1}//所有成员都是数字枚举
enum G {a='123',b='sin'}//所有成员都是字符串枚举

//定义枚举类型 e f
let e: E = 3//将任意的number类型赋值给枚举类型，取值可以超出枚举成员的定义
let f: F = 3
// e === f //会报错，因为e和f的枚举类型不一样

//定义三个枚举成员类型
let e1: E.a
let e2: E.b
let e3: E.a
// e1===e2 //不能比较，因为枚举成员类型不一样
// e1===e3 可以比较，因为枚举成员类型是一样的

//字符串枚举的取值只能是他的成员的枚举类型
let g1: G =G.a
let g2: G =G.b//可以取值a/b
let g3: G.a =G.a//只能取值自身
```



### 接口

+ 接口：可以用来约束对象、函数、以及类的结构和类型

+ 对象类型的接口

  ```TS
  interface List {
      id: number,
      name: String
  }
  interface Result{
      data: List[]
  }
  
  function render(result:Result){
      result.data.forEach((value)=>{
          console.log(value.id,value.name)
      })
  }
  
  let result ={
      data:[
          {id:1,name:'A'},
          {id:2,name:'B'}
      ]
  }
  
  render(result)
  
  
  //额外的属性检查
  
  //当数据中传递过来预定之外的字段
  // data:[
  //     {id:1,name:'A',sex:'male'},
  //     {id:2,name:'B'}
  // ]
  
  //在上述代码中，如果在render中直接传入对象字面量,TS就会对额外的字段进行类型检查，就会报错
  // render({
  //     data:[
  //         {id:1,name:'A',sex:'male'},
  //         {id:2,name:'B'}
  //     ]
  // })
  
  //绕过检查的方法一共有三种
  
  //第一种：就是和最开始一样，将对象字面量赋值给一个对象，上述中为result
  
  //第二种：使用类型断言 
  //类型断言第一种方式
  // render({
  //     data:[
  //         {id:1,name:'A',sex:'male'},
  //         {id:2,name:'B'}
  //     ]
  // } as Result) //as 后面添加这个对象的类型，类型断言就是我们明确的告诉编译器这个对象的类型就是Result，这样编译器就会绕过类型检查
  //类型断言第二种方式  但是这种方法在React中会产生歧义
  // render(<Result>{
  //     data:[
  //         {id:1,name:'A',sex:'male'},
  //         {id:2,name:'B'}
  //     ]
  // })
  
  //第三种：使用字符串索引签名
  // interface List {
  //     id: number,
  //     name: String,
  //     [x: string]:any
  //     //定义一个x，它的返回值类型是any，用任意的字符串去索引List,可以得到任意的结果，这样List就可以支持多个属性了
  // }
  
  //接口成员的属性
  //可选属性：
  interface List {
      id: number,
      name: String,
      age?:number //可选属性
  }
  
  //只读属性
  interface List {
      readonly id: number,//只读属性
      name: String,
      age?:number //可选属性
  }
  
  //当不确定接口中有多少个属性的时候，可以用可索引的类型接口
  //用数字索引的接口
  interface StringArray{
      [index: number]:string
      //用任意的数字去索引StingArray,都会得到一个string返回值。
  }
      //相当于声明了一个字符串类型的数组
      // let stringArray:StringArray = ['A','B']
  
  //用字符串索引的接口
  interface Names{
      [x: string]:string
      // y:number  //这时候就不能再声明一个number类型的成员
  }
  
  //数字和字符串索引的接口
  interface NumberString{
      [x: number]:string,
      [y: string]:string
  }
  
  // interface NumberError{
  //     [x: number]:number,//和返回值string不兼容报错
  //     [y: string]:string
  // }
  
  interface NumberError{
      [x: number]:number,
      [y: string]:any//兼容number
      }
  ```

  

+ 函数类型的接口

  ```TS
  //用一个变量定义函数类型
  let add: (x: number, y: number)=> number
  
  //用接口定义
  interface Add1{
      (x: number, y: number): number
  }
  
  //使用类型别名——为函数起一个名字
  type Add2 = (x: number, y: number) => number
  
  let sum: Add2 = (a,b) => a + b
  // console.log(sum(1,2))
  
  
  //混合类型接口——既可以定义一个函数，又可以像对象一样拥有属性和方法
  
  interface Lib{
      ():void; //无返回值的函数
      version:string;
      doSomething():void;//无返回值的方法
  }
  //封装getLib 调用接口
  function getLib(){
      let lib:Lib = (() => {}) as Lib;
      lib.version = '1.0'
      lib.doSomething = () => {}
      return lib
  }
  
  //创建实例
  let lib1 = getLib()
  lib1();
  // console.log(lib1)
  lib1.doSomething()
  // console.log(lib1.doSomething())
  let lib2 = getLib()
  ```

  

### 函数相关知识梳理

```TS
//函数定义的四种方式
//第一种
function add3(x:number,y:number){
    return x + y
}

//第二种
//仅函数的定义，并未实现
let add4: (x:number,y:number) => number

//第三种
type add5 = (x:number,y:number) => number

//第四种
interface add6 {
    (x:number,y:number):number
}

// JS中对函数参数的个数是没有限制的　　
// TS 中形参和实参必须一一对应
//add3(1)  //×
//add3(1,2,3) //×
//add3(1,2) //√

//可选参数   可选参数必须位于必选参数之后
function add7 (x:number,y?:number){
    return y? x+y:x
}
// add7(1)

//参数默认值
function add8(x:number,y=0,z:number,k=1){
    return x+y+z+k
}
//在传递参数是,必选参数此前,默认参数要用undefined代替,若是默认参数后没有必选参数,则可以省略
// console.log(add8(1,undefined,2))

//剩余参数  当不确定有多少个参数时,使用剩余参数
function add9(x:number,...rest:number[]){
    //剩余参数用数组来接收
    //reduce():计算数组元素相加后的总和
    // reduce(total,currentValue, index,arr) 参数:
    //total:必需。初始值, 或者计算结束后的返回值。
    //currentValue:必需。当前元素
    //index:可选。当前元素的索引
    //arr:可选。当前元素所属的数组对象。
    return x + rest.reduce((pre,cur) => pre + cur)
}
// console.log(add9(1,2,3,4,5))

//函数重载   ---两个函数名称相同,但是参数个数或者参数类型不同  好处:不需要为了相似功能的函数选用不同的函数名称
//同一个函数提供多个函数类型定义来进行函数重载。 编译器会根据这个列表去处理函数的调用。
function add10(...rest: number[]):number
function add10(...rest: string[]):string 
function add10(...rest: any[]):any{
    let first = rest[0];
    if(typeof first === 'string'){
        //如果类型是string则进行字符串的拼接
        return rest.join('')
    }
    if(typeof first === 'number'){
        //如果是number类型则进行数据的相加
        return rest.reduce((pre,cur) =>pre+cur)
    }
} 
//为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。
//function add10(...rest: any[]):any并不是重载列表的一部分，因此这里只有两个重载：一个是接收字符串另一个接收数字。 以其它参数调用 pickCard会产生错误。
// console.log(add10(1,2,3))
// console.log(add10('hello',' ','world'))
```



### 类

+ 继承和成员修饰符

  ```TS
  //类的基本实现
  class Dog{
      //构造函数的返回值为类的本身
      constructor(name: string){//为构造函数的参数添加了类型注解
          this.name = name
      }
      name:string//与es不同的是，这个class中添加了一个类型注解
      run(){}//默认返回值：void
  }
  //注意两个问题：
  
  //第一点：无论在ts还是es中，类成员的属性都是实例属性，而不是原型属性。类成员的方法都是实例方法
  console.log(Dog.prototype)//{run: ƒ, constructor: ƒ} 不包含name属性
  //创建类的实例
  let dog = new Dog('wangwang')
  console.log(dog)//Dog {name: "wangwang"} 可以看出name属性只在实例上
  
  //第二点：与es不同的是。ts的实例属性必须有初始值，或者在构造函数中被初始化
  class Dog1{
      constructor(name: string){
          // this.name = name
      }
      //name:string //构造函数中 this.name = name被注释掉之后，改行代码就会报错。被要求赋予初始值
      //赋值
      // name:string = 'dog'
      //设为可选参数
      name?: string 
      run(){}
  }
  //========================================
  //类的继承
  
  //定义Dog的子类
  class  DogChild extends Dog{
      //父类中构造函数中有一个name属性，那么子类中的构造函数中也要有
      constructor(name:string,color:string){
          //派生类的构造函数必须包含 "super" 调用。super代表父类的实例
          super(name)
          //this要在super调用之后再调用
          this.color = color
      }
      //为子类添加自己的属性，并在构造函数中初始化
      color:string
  }
  
  //====================================
  //类的成员修饰符
  
  //public 公共成员 默认属性
  
  //---------------------------------
  
  //private 私有成员 不能在声明它的类的外部访问（子类也是也一样）
  class Animal {
      private name: string;
      constructor(theName: string) { this.name = theName; }
  }
  
  //new Animal("Cat").name; // 错误: 'name' 是私有的.
  
  //若是给构造函数添加私有属性，那么这个类既不能被继承也不能被实例化
  class Animal1 {
      name: string;
      private constructor(theName: string) { this.name = theName; }
  }
  // class  Animal1Child extends Animal1{}
  //无法扩展类“Animal1”。类构造函数标记为私有。
  //let animaChild = new Animal1()
  //类“Animal1”的构造函数是私有的，仅可在类声明中访问
  
  //--------------------------------
  
  //protected 受保护成员与 private修饰符的行为很相似，但有一点不同。protected能在子类中访问，但是不能在类的实例中访问
  
  class Person {
      protected name: string;
      constructor(name: string) { this.name = name; }
  }
  
  class Employee extends Person {
      private department: string;
      constructor(name: string, department: string) {
          super(name)
          this.name//在子类中调用
          this.department = department;
      }
  
  }
  let howard = new Employee("Howard", "Sales");
  //在实例中调用
  //console.log(howard.name);
  // 错误 属性“name”受保护，只能在类“Person”及其子类中访问。
  
  //若是给构造函数添加protected，则这个类不能被实例化，只能被继承
  
  //----------------------------
  
  //readonly 只读修饰符 只读属性必须在声明时或构造函数里被初始化。
  class Octopus {
      readonly name: string;
      readonly numberOfLegs: number = 8;
      constructor (theName: string) {
          this.name = theName;
      }
  }
  let dad = new Octopus("Man with the 8 strong legs");
  // dad.name = "Man with the 3-piece suit"; 
  // 错误! name 是只读的.
  
  //static静态属性 为实例添加静态属性，则能通过类名来访问，而不能通过实例来访问
  //类的基本实现
  class Dog2{
      constructor(name: string){
          this.name = name
      }
      name:string
      static food:string = "regou"
  }
  let dog2 = new Dog('wangwang')
  // console.log(Dog2.food)//√
  // console.log(dog2.food)//× 类型“Dog”上不存在属性“food”
  
  //==============================
  
  //参数属性
  //除了类的成员可以用修饰符，构造函数的参数也可以使用
  //若是给构造函数的参数添加修饰符，参数就变成了实例属性了
  
  class canshu{
      constructor(public name: string){
          this.name = name
      }
      // 标识符“name”重复。
      // name:string
      //因为在构造函数中为name参数添加public修饰符，name变成了实例属性，此时name实例就会与构造函数中的name实例重复
  }
  ```

  

+ 抽象类与多态——含特殊的TS类型（this类型）

  ```TS
  //抽象类与多态
  
  //抽象类：只能被继承，不能被实例化
  //抽象类的好处：可以抽离出一些事务的共性，实现代码的复用和扩展
  abstract class Abstrc{
      eat(){
          console.log("eat")
      }
      //在抽象类中也不可以不指定方法的具体实现——构成了抽象方法
      // 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
      abstract sleep():void
  }
  // let animal = new Abstrc()//无法创建抽象类的实例。
  //可以被继承
  class AbstrcChild extends Abstrc{
      constructor(){
          super()
      }
      sleep(){
          console.log("sleep")
      }
  }
  let abc = new AbstrcChild()
  // console.log(abc.eat())
  // console.log(abc.sleep())
  
  
  //=====================
  
  //抽象类也可以实现多态
  //多态：在（抽象类）父类中定义一个抽象方法，在多个子类中对这个方法又不同的实现。在程序运行的时候会更具不同的对象，执行不同的操作，这样就实现了运行时的绑定
  
  
  //实现一个多态
  abstract class Polym{
      eat(){
          console.log("eat")
      }
      abstract sleep():void
  }
  
  class Dog4 extends Polym{
      sleep(){
          console.log("Dog4 Sleep")
      }
      constructor(name:string){
          super()
          this.name = name 
      }
      name: string
  }
  let dog4 = new Dog4('Dog4')
  
  
  class Cat extends Polym{
      sleep(){
          console.log("Cat Sleep")
      }
  }
  let cat = new Cat();
  
  //定义一个polym数组将子类存入
  let polym: Polym[] = [dog4,cat]
  polym.forEach(i => {
      //判断i是哪一种实例，然后实现对应的方法
      i.sleep()
      // Dog4 Sleep
      // Cat Sleep
  })
  
  //特殊的TS类型——this类型
  //类的成员方法可以直接返回一个this,这样就可以很方便的实现链式调用
  
  class WorkFlow{
      step1(){
          return this
          //this 指的是实例对象
      }
      step2(){
          return this
      }
  }
  new WorkFlow().step1().step2()
  
  //在继承的时候this类型也可以表现出多态——这里的多态意思是：this既可以是父类型也可以是子类型
  class Myflow extends WorkFlow{
      next(){
          return this
      }
  }
  new Myflow().next().step1().next().step2()
  ```

  

### 类与接口的关系

```TS
//类实现接口——类 类型接口

//1.一个接口可以约束类型成员有哪些属性以及他们的类型
//2.接口只能约束类的公有成员
//3.接口也不能约束类的构造函数
interface Human{
    // new (name:string):void //3.类“Asian”错误实现接口“Human”。
    name: string,
    eat():void
}

//通过关键字implements实现了接口
//类实现接口的时候 必须实现接口中声明的所有属性
class Asian implements Human{
    constructor(name:string){
        this.name = name
    }
    // private name: string //2.属性“name”在类型“Asian”中是私有属性，但在类型“Human”中不是。
    name: string
    eat(){}
}

//=============================

//接口的继承
//接口可以像类一样被继承，并且一个接口可以继承多个接口

interface Man extends Human{
    run():void
}
interface Child {
    cry():void
}
interface Boy extends Man,Child{}
// let boy: Boy = {} //类型“{}”缺少类型“Boy”中的以下属性: run, name, eat, cry
let boy: Boy = {
    name:'',
    run(){},
    eat(){},
    cry(){}
} 
//从接口的继承可以看出，接口的继承可以抽离出可重用的接口，也可以将多个接口合并成一个接口

//===========================

//接口继承类——相当于接口把类的成员都抽象了出来，只有类的成员结构而没有具体的实现

class Auto{
    state = 1
}
interface AutoInterface extends Auto{
    //这样这个接口中就隐含了state属性
}
//要想实现这个AutoInterface,只要有一个类的成员有state属性就可以了
class A implements AutoInterface{
    state = 1
}

//此外，Auto的子类也可以是实现AutoInterface这个接口
class Bus extends Auto implements AutoInterface{
    //在这个子类中，不必实现state属性，因为他是Auto的子类，继承了state属性
}


 // 注意:接口在抽离类的成员的时候，不仅抽离了公共成员，而且抽离了私有成员和受保护成员
//  class Auto2{
//     state = 1
//     private state2 = 0 
// }
// interface AutoInterface extends Auto2{
//     //接口中含有私有属性
// }
// class B implements AutoInterface{
//     state = 1
//     //类“B”错误实现接口“AutoInterface”。类型 "B" 中缺少属性 "state2"，但类型 "AutoInterface" 中需要该属性
// }
```



### 泛型

+ 泛型概念

  不预先确定的数据类型，具体的类型在使用的时候才确定。以使用`泛型`来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。

+ 使用泛型的好处

  + 函数和类可以轻松地支持多种类型。增加程序的扩展性
  + 不必写多条函数重载。冗长的联合类型声明。增加代码的可读性
  + 灵活控制类型之间的约束

+ 泛型函数与泛型接口

  ```TS
  //函数定义
  function log(value:any):any{
      // console.log(value)
      return value
  }
  
  //泛型函数定义
  function log1<T>(value:T):T{
          console.log(value)
          return value
  }
  
  //调用泛型函数
  //第一种方式，直接指明T的类型
  log1<string[]>(['a','b'])
  
  //第二种方式，利用TS的类型推断，省略类型的参数
  log1(['c','d'])
  
  //利用泛型定义函数类型
  type Log = <T>(value:T) => T
  let myLog: Log = log1
  
  //泛型接口
  interface Log1{
      <T>(value:T):T//使用泛型约定一个函数
  }
  
  interface Log2<T>{//使用泛型约定接口中的所有成员
     (value:T):T
  }
  let MyLog2: Log2<number> = log//泛型类型“Log2<T>”需要 1 个类型参数。
  MyLog2(1)
  
  //设置泛型默认属性
  interface Log3<T = string>{
      (value:T):T
   }
   let MyLog3: Log3<number> = log1
   let MyLog4: Log3 = log1
   MyLog3(1)
  //  MyLog4(1)//类型“1”的参数不能赋给类型“string”的参数
   MyLog4('1')
  
  ```

  

+ 泛型类与泛型约束

  ```TS
   //泛型类与泛型约束
  
   //泛型类
   //泛型约束类的成员
  class Log4<T>{
      run(value:T){
          console.log(value)
          return value
      }
  }
  //实例化Log3
  let log4 = new Log4<number>()//指定类型为number
  log4.run(1)
  let log41 = new Log4()//不指定类型
  log41.run(1)//可以传任意值
  log41.run('1')
  
  
  //泛型不能用于类的静态成员
  // class Log4<T>{
  //     static run(value:T){//静态成员不能引用类类型参数。
  //         console.log(value)
  //         return value
  //     }
  // }
  
  //---------------------------------------
  //泛型约束
  function log2<T>(value:T):T{
      // console.log(value,value.length)//类型“T”上不存在属性“length”。
      return value
  }
  //在上述函数中当我们想要打印参数的属性时，会提示我们类型“T”上不存在属性“length”。这时，我们需要用到类型约束
  
  //首先预定义一个接口
  interface Length{
      length: number
  }
  //然后让泛型T继承这个接口
  function log3<T extends Length>(value:T):T{
      console.log(value,value.length)
      return value
  }
  //此时T受到了一定的约束，不在是什么类型都可以传了，输入的参数必须具有length属性
  log3([1])
  log3("123")
  log3({length:3})
  
  ```

  

### 类型检查机制

+ 类型检查机制

  TypeScript编译器在做类型检查时，所秉承的一些原则。以及表现出的一些行为。

+ 作用：辅助开发，提高效率

+ 类型判断

  + 类型推断

    不需要指定变量的类型（函数的返回值类型），TypeScript可以根据某些规则自动地为其推断出一个类型

  + 基础类型推断

    TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。

    ```TS
    let x = 3;
    //变量x的类型被推断为数字。 这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。
    ```

  + 最佳通用类型推断

    当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型

    ```TS
    let x = [0, 1, null];
    //为了推断x的类型，我们必须考虑所有元素的类型。 这里有两种选择： number和null。 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型
    ```

  + 上下文类型推断

    TypeScript类型推论也可能按照相反的方向进行。 这被叫做“按上下文归类”。按上下文归类会发生在表达式的类型与所处的位置相关时。

    ```TS
    window.onmousedown = function(mouseEvent) {
        console.log(mouseEvent.button);  //<- Error
    };
    //这个例子会得到一个类型错误，TypeScript类型检查器使用Window.onmousedown函数的类型来推断右边函数表达式的类型。 因此，就能推断出 mouseEvent参数的类型了。 如果函数表达式不是在上下文类型的位置， mouseEvent参数的类型需要指定为any，这样也不会报错了。
    ```

    

+ 类型兼容性

  + 类型兼容性

    + 当一个类型Y可以赋值给另一个类型X时，我们可以说类型X兼容类型Y。

      X兼容Y：X(目标类型) = Y(源类型)

    + 口诀：

      结构之间兼容：成员少的兼容成员多的

      函数之间兼容：参数多的兼容参数少的

    ```TS
    //X兼容Y：X(目标类型) = Y(源类型)
    
    
    let s: string = 'a'
    // s = null   //不能将类型“null”分配给类型“string”
    //strictNullChecks:false 关闭严格空校验后，string可以兼容null类型，null是字符型string的子类型
    
    // 接口兼容性
    interface X {
        a: any;
        b: any;
    }
    interface Y {
        a: any;
        b: any;
        c: any;
    }
    let x: X = {a: 1, b: 2}
    let y: Y = {a: 1, b: 2, c: 3}
    x = y //x可以兼容y
    // y = x //y不能兼容x  <源类型>必须要具备<目标类型>的所有属性
    //接口兼容性总结：成员少的兼容成员多的
    
    // 函数兼容性
    type Handler = (a: number, b: number) => void
    
    function hof(handler: Handler) {
        return handler
    }
    
    //函数兼容需要满足的三个条件：
    // 1)参数个数 
    let handler1 = (a: number) => {}
    hof(handler1)
    let handler2 = (a: number, b: number, c: number) => {}
    // hof(handler2) //错误
    //<目标函数>的参数个数一定要多于<源函数>的参数个数
    
    // 可选参数和剩余参数
    let a = (p1: number, p2: number) => {}
    let b = (p1?: number, p2?: number) => {}
    let c = (...args: number[]) => {}
    //固定参数可以兼容可选参数可剩余参数
    a = b
    a = c
    //可选参数不兼容固定参数和剩余参数
    //此时可以通过关闭选项："strictFunctionTypes": false,  来实现兼容
    // b = a
    // b = c
    //剩余参数可以兼容固定参数和可选参数
    c = a
    c = b
    
    // 2)参数类型
    let handler3 = (a: string) => {}
    // hof(handler3) //handler3的类型是string不兼容number类型
    
    interface Point3D {
        x: number;
        y: number;
        z: number;
    }
    interface Point2D {
        x: number;
        y: number;
    }
    let p3d = (point: Point3D) => {}
    let p2d = (point: Point2D) => {}
    p3d = p2d //p3d中的参数是三个，p2d中的参数是两个，函数中参数多的兼容参数少的
    // p2d = p23 //此时可以通过关闭选项："qstrictFunctionTypes": false,  来实现兼容
    //这种函数之间相互赋值的情况叫做：函数参数双向协变
    
    // 3) 返回值类型 目标函数的返回值类型必须与原函数相同
    let q = () => ({name: 'Alice'})
    let g = () => ({name: 'Alice', location: 'Beijing'})
    q = g
    //成员少的兼容成员多的
    // g = q //不能将类型“() => { name: string; }”分配给类型“() => { name: string; location: string; }”。类型 "{ name: string; }" 中缺少属性 "location"，但类型 "{ name: string; location: string; }" 中需要该属性。
    //q返回值类型是g返回值类型的子类型
    
    
    // 函数重载
    function overload(a: number, b: number): number
    function overload(a: string, b: string): string//目标函数
    function overload(a: any, b: any): any {}//原函数
    //在重载函数中，目标函数中的参数可以多余原函数，原函数中的参数个数不可以多余目标函数中的参数个数
    // function overload(a: any): any {}
    // function overload(a: any, b: any): any {}
    // function overload(a: any, b: any, c: any) {}
    
    // 枚举兼容性
    enum Fruit { Apple, Banana }
    enum Color { Red, Yellow }
    let fruit: Fruit.Apple = 1//枚举类型可以和number相互兼容
    let no: number = Fruit.Apple
    // let color: Color.Red = Fruit.Apple //枚A举类型之间是不兼容的
    
    // 类兼容性——和接口的相容性相似，比较结构，静态成员和构造函数不参与比较
    class AA {
        constructor(p: number, q: number) {}
        id: number = 1
        private name: string = ''
    }
    class B {
        static s = 1
        constructor(p: number) {}
        id: number = 2
        private name: string = ''
    }
    class C extends AA {}
    let aa = new AA(1, 2)
    let bb = new B(1)
    //两个实例是兼容的 他们都具有一个实例id
    //如果类中含有两个私有成员，那么他们就不兼容了
    // aa = bb
    // bb = aa
    //父类和子类是可以相互兼容的
    let cc = new C(1, 2)
    aa = cc
    cc = aa
    
    // 泛型兼容性
    
    //当泛型接口中没有任何成员
    interface Empty1<T> {
    }
    let obj1: Empty1<number> = {};
    let obj2: Empty1<string> = {};
    obj1 = obj2//此时两个变量是兼容的
    
    interface Empty2<T> {
        value:T
    }
    let obj3: Empty2<number> = {value:3};
    let obj4: Empty2<string> = {value:'3'};
    //obj3 = obj4 //不能将类型“Empty2<string>”分配给类型“Empty2<number>”。不能将类型“string”分配给类型“number”
    
    //也就是说，只有类型参数T被接口成员使用时，才会影响泛型的兼容性
    
    
    //泛型函数
    let log11 = <T>(x: T): T => {
        console.log('x')
        return x
    }
    let log22 = <U>(y: U): U => {
        console.log('y')
        return y
    }
    //如果两个泛型函数的定义相同，但是没有指定类型参数，那么他们之间也是可以相互兼容的
    log11 = log22
    
    let log111 = <T>(x: T): T => {
        console.log('x')
        return x
    }
    let log222 = <U>(y: U): U => {
        console.log('y')
        return y
    }
    let log_1 = log11(1)
    let log_2 = log11('1')
    // log_1 = log_2 //不能将类型“string”分配给类型“number”。
    
    ```

+ 类型保护

  + 类型保护

    TypeScript能够在特定的区块中保证变量的某种确定的类型。可以在此区块中放心的引用此类型的属性。或者调用此类型的方法。

  ```TS
  enum Type { Strong, Week }
  
  class Java {
      helloJava() {
          console.log('Hello Java')
      }
      java: any
  }
  
  class JavaScript {
      helloJavaScript() {
          console.log('Hello JavaScript')
      }
      js: any
  }
  
  
  //类型保护机制解决的问题：
  //通过getLanguage_test函数，判断type是否为Strong类型，然后实现两个类中的方法
  function getLanguage_test(type:Type){
      let lang = type === Type.Strong ? new Java() : new JavaScript();
  
      //此时会报错提示我们实例lang是两个类的联合类型，TS不能判断lang到底是哪一种类型
      //类型“Java | JavaScript”上不存在属性“helloJava”。类型“JavaScript”上不存在属性“helloJava”。
      // if (lang .helloJava) {
      //     lang .helloJava();
      // } else {
      //     lang .helloJavaScript();
      // }
  
      //添加类型断言 但是此方案并不理想，类型保护机制就是用来解决这个问题的，它可以提前对类型做出预判
      if (!!(lang as Java).helloJava) {
          (lang as Java).helloJava();
      } else {
          (lang as JavaScript).helloJavaScript();
      }
      return lang
  }
  
  //类型保护的方法
  //1.instanceof:判断一个实例是否属于某个类
  //2.in:判断一个属性是否属于某个对象
  //3.typeof:判断一个变量的类型
  //4.创建类型保护函数来判断对象的类型——自定义类型保护的类型谓词
  
  //第四种方法：自定义类型保护的类型谓词 
  function isJava(lang: Java | JavaScript): lang is Java {
      //返回值lang is Java 称作类型谓词
      return (lang as Java).helloJava !== undefined
  }
  
  function getLanguage(type: Type, x: string | number) {
      let lang = type === Type.Strong ? new Java() : new JavaScript();
      
      if (isJava(lang)) {
          lang.helloJava();
      } else {
          lang.helloJavaScript();
      }
  
      // if ((lang as Java).helloJava) {
      //     (lang as Java).helloJava();
      // } else {
      //     (lang as JavaScript).helloJavaScript();
      // }
  
      //第一种方法：instanceof
      // if (lang instanceof Java) {
      //     lang.helloJava()
      //     // lang.helloJavaScript()
      // } else {
      //     lang.helloJavaScript()
      // }
  
      // 第二种方法：in
      // if ('java' in lang) {
      //     lang.helloJava()
      // } else {
      //     lang.helloJavaScript()
      // }
  
      // 第三种方法：typeof
      // if (typeof x === 'string') {
      //     console.log(x.length)
      // } else {
      //     console.log(x.toFixed(2))
      // }
  
      return lang;
  }
  
  getLanguage(Type.Week, 1)
   
  ```

  

### 高级类型

+ 交叉类型与联合类型

  + 交叉类型

    交叉类型是将多个类型合并为一个类型。

  + 联合类型

    声明的类型并不确定，可为多个类型中的一个

  ```TS
  //交叉类型 ——取成员并集
  interface DogInterface {
      run(): void
  }
  interface CatInterface {
      jump(): void
  }
  //pet为两个接口的交叉类型
  let pet: DogInterface & CatInterface = {
      run() {},
      jump() {}
  }
  
  //联合类型：声明的类型并不确定，可为多个类型中的一个 —— 取成员交集
  let a1: number | string = 1 //a既可以去number类型也可去string类型
  let b1: 'a' | 'b' | 'c'//限定字符串字面量联合类型，限定了取值范围
  let c1: 1 | 2 | 3
  
  //对象的联合类型
  class Dogs implements DogInterface {
      run() {}
      eat() {}
  }
  class Cats  implements CatInterface {
      jump() {}
      eat() {}
  }
  enum Master { Boy, Girl }
  function getPet(master: Master) {
      let pet = master === Master.Boy ? new Dogs() : new Cats();
      // pet.run()
      //类型“Dogs | Cats”上不存在属性“run”。类型“Cats”上不存在属性“run”
      // pet.jump()
      pet.eat()
      return pet
  }
  
  
  //一种模式：可区分的联合类型——结合了联合类型和字面量类型的一种类型保护方法
  //核心思想：一个类型如果是多个类型的联合类型，并且每个类型之间有一个公共的属性，那么我们可以凭借这个公共属性创建不同的类型保护区块
  interface Square {
      kind: "square";//公共属性kind
      size: number;
  }
  interface Rectangle {
      kind: "rectangle";
      width: number;
      height: number;
  }
  interface Circle {
      kind: "circle";
      radius: number;
  }
  
  type Shape = Square | Rectangle | Circle
  
  function area(s: Shape) {
      switch (s.kind) {
          //创建不同的类型保护区块
          case "square":
              return s.size * s.size;
          case "rectangle":
              return s.height * s.width;
          case 'circle':
              return Math.PI * s.radius ** 2
          default:
              //never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 
              return ((e: never) => {throw new Error(e)})(s)
              //若是省略“circle”，s则会报错
              //类型“Circle”的参数不能赋给类型“never”的参数。
      }
  }
  console.log(area({kind: 'circle', radius: 1}))
  
  ```

  

+ 索引类型

  + 索引类型：使用索引类型，编译器就能够检查使用了动态属性名的代码。

  ```TS
  //在JS中获取对象中属性的值
  let obj11 = {
      a: 1,
      b: 2,
      c: 3
  }
  
  // function getValues1(obj11: any, keys: string[]) {
  //     return keys.map(key => obj11[key])
  // }
  // console.log(getValues1(obj11, ['a', 'b']))//(2) [1, 2]
  // console.log(getValues1(obj11, ['d', 'e']))//(2) [undefined, undefined] 指定obj11中没有的属性但不会报错
  
  // keyof T 索引类型的查询操作符
  //对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合
  interface Obj {
      a: number;
      b: string;
  }
  let key: keyof Obj //let key: "a" | "b"
  
  // T[K] 索引访问操作符
  let value: Obj['a']//let value: number
  
  //泛型约束  T extends U
  
  function getValues2<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
      return keys.map(key => obj[key])
  }
  // console.log(getValues2(obj11, ['a', 'b']))
  // console.log(getValues2(obj11, ['d', 'e']))//不能将类型“"d"”分配给类型“"a" | "b" | "c"”。
  
  
  ```

  

+ 映射类型

  + 映射类型：TypeScript允许将一个类型映射成另外一个类型

  ```TS
  interface Obj {
      a: string;
      b: number;
  }
  
  //将接口成员变为只读类型
  type ReadonlyObj = Readonly<Obj>
  
  //将接口成员变为可选
  type PartialObj = Partial<Obj>
  
  //抽取Obj子集 a,b被单独抽取出来形成新的类型
  // type PickObj = {
  //     a: number;
  //     b: string;
  // }
  type PickObj = Pick<Obj, 'a' | 'b'>
  
  //以上三种类型，官方称为同态，只会作用与Obj属性，不会引入新的属性
  
  //非同态
  type RecordObj = Record<'x' | 'y', Obj>
  
  ```

  

+ 条件类型

  + 条件类型：有条件表达式所决定的类型

  ```TS
  // T extends U ? X : Y   如果类型T可以被赋值给类型U，那么结果类型就是X否则就是Y类型
  
  type TypeName<T> =
      T extends string ? "string" :
      T extends number ? "number" :
      T extends boolean ? "boolean" :
      T extends undefined ? "undefined" :
      T extends Function ? "function" :
      "object";
  type T1 = TypeName<string>//type T1 = "string"
  type T2 = TypeName<string[]>//type T2 = "object"
  
  
  // (A | B) extends U ? X : Y
  // (A extends U ? X : Y) | (B extends U ? X : Y)
  type T3 = TypeName<string | string[]>//type T3 = "string" | "object"
  
  type Diff<T, U> = T extends U ? never : T
  type T4 = Diff<"a" | "b" | "c", "a" | "e">//type T4 = "b" | "c"
  // Diff<"a", "a" | "e"> | Diff<"b", "a" | "e"> | Diff<"c", "a" | "e">
  // never | "b" | "c"
  // "b" | "c"
  
  type NotNull<T> = Diff<T, null | undefined>
  type T5 = NotNull<string | number | undefined | null>//type T5 = string | number
  
  //内置类型实现上述两种方法
  // Exclude<T, U>//从类型T中过滤掉可以赋值给类型U的类型
  type T6 = Exclude<"a" | "b" | "c", "a" | "e">//type T6 = "b" | "c"
  // NonNullable<T>
  type T7 = NonNullable<string | number | undefined | null>//type T7 = string | number
  
  // Extract<T, U> //与Exclude的作用相反——从类型T中抽取出可以赋值给类型U的类型
  type T9 = Extract<"a" | "b" | "c", "a" | "e">//type T9 = "a"
  
  // ReturnType<T>//获取一个函数返回值的类型
  type T10 = ReturnType<() => string>//type T10 = string
  
  ```

  





