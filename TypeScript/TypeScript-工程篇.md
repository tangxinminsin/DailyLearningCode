# TypeScript

## 工程篇

### ES6与CommonJS的模块系统——TypeScript对两种模块化的支持和兼容

+ ES6模块的导入导出

  定义a.ts、b.ts、c.ts。c依赖于a，a依赖于b.在index.ts中引入c.ts

**a.ts**

```TS
// 单独导出
export let a = 1

// 批量导出
let b = 2
let c = 3
export { b, c }

// 导出接口
export interface P {
    x: number;
    y: number;
}

// 导出函数
export function f() {}

// 导出时起别名
function g() {}
export { g as G }

// 默认导出，无需函数名
export default function () {
    console.log("I'm default")
}

// 引入外部模块，重新导出
export { str as hello } from './b'

```

**b.ts**

```TS
// 导出常量
export const str = 'Hello'
```

**c.ts**

```TS
import { a, b, c } from './a'; // 批量导入
import { P } from './a';       // 导入接口
import { f as F } from './a';  // 导入时起别名
import * as All from './a';    // 导入模块中的所有成员，绑定在 All 上
import myFunction from './a';  // 不加{}，导入默认

console.log(a, b, c)

let p: P = {
    x: 1,
    y: 1
}

console.log(All)

myFunction()
```

+ #### CommonJS的模块

  + node是commonjs的一种实现，在src文件夹下新建node文件夹，创建三个文件a.node.ts、b.node.ts、c.node.ts

**a.node.ts**

```TS
let a = {
    x: 1,
    y: 2
}

// 整体导出
module.exports = a

```

**b.node.js**

```TS
// exports === module.exports
// 导出多个变量
// module.exports = {}
exports.c = 3
exports.d = 4
```

**c.node.js**

```TS
//导入
let c1 = require('./a.node')
let c2 = require('./b.node')
let c3 = require('../es6/a')
import c4 = require('../es6/d')

console.log(c1)
console.log(c2)
// c3()
// console.log(c3)
// c3.default()
c4()

```

+ node运行ts文件工具：

  当我们在node环境运行ts文件时（$node ./src/node/c.node.ts），会有错误提示，因为node默认寻找js文件,所以node不能直接执行ts文件。只有将ts文件编译成js文件才可以用node命令来执行。但是这样比较麻烦，可以通过一个工具" ts-node"来实现：

  全局安装

  > npm  i ts-node -g

+ 编译选项tsconfig.json ——”target“、”module“

  + target（命令行中简写：‘-t’）：设置我们要编译的语言版本， "target": "es5",  默认es5。在命令行中使用tsc命令默认为es3

  + module（命令行中简写：‘-m’）：设置代码编译的模块系统，"module": "commonjs", 默认为commonjs。在命令行中也为commonjs

  + 实操：

    若是在命令行中指定了输入文件，那么TS就会自动的忽略配置文件tsconfig.json，所有的配置要在命令行中声明

    + 编译a.ts文件

    > **//当target指定为es6时，module就会被默认指定为es6模块**
    >
    > $ tsc  ./src/es6/a.ts  -t  es6  

    > //默认配置——"target": "es3", "module": "commonjs"
    >
    > $ tsc  ./src/es6/c.ts

+ ES6和Commonjs的兼容性问题

  当我们使用默认配置时"target": "es3", "module": "commonjs"，就存在两个模块之间的兼容性问题。在编译时就会把所有的模块编译成commonjs模块。这是，ts在处理es6默认的导入导出的时候就会做一些特殊的处理。

  + 编译es6模块中的c.ts

    > $ tsc  ./src/es6/c.ts

    编译成功后，会出现a.js,b.s,c.js三个js文件。

    在导出时，a.js中：

    ```TS
    //原先在a.ts中，导出了一个默认函数
    // 默认导出，无需函数名
    export default function () {
        console.log("I'm default")
    }
    
    //在编译后的JS文件中，为这个默认函数添加了一个默认的名字
    // 默认导出，无需函数名
    function default_1() {
        console.log("I'm default");
    }
    exports["default"] = default_1;
    //这个函数被绑定到了exports.default属性下 
    //此时，这个默认的导出不在是整个模块的顶级属性
    ```

    在导入时，c.js中：

    ```JS
    "use strict";
    exports.__esModule = true;
    var a_2 = require("./a"); 
    a_2["default"]();
    //需要通过default属性来调用这个函数
    ```

    之所以这样处理，是因为两个模块在处理顶级导入导出的时候时不兼容的

    在es6中允许有一个顶级导出，同时也允许有次级导出 a.ts中：

    ```
    // export default 顶级导出
    export default function () {
        console.log("I'm default")
    }
    
    // export次级导出
    export { str as hello } from './b'
    ```

    在commonjs中，只允许一个模块有一个顶级的导出:

    ```TS
    // a.node.ts:
    let a = {
        x: 1,
        y: 2
    }
    
    // module.exports 顶级导出
    module.exports = a
    
    //如果一个模块中有次级导出，那么就不允许有顶级导出，如果有顶级导出，那么顶级导出就会覆盖次级导出
    exports.c = 3
    exports.d = 4
    // module.exports = {}
    ```

  + 在node（commonjs）模块中引入es6模块

    **从两个模块的导入导出可见两个模块不兼容的地方，如果我们在程序中都使用es6模块的话，那么是不会有问题的，在ES6中即使在将ts编译成js后，导出函数中添加了一个”default“，但在导入后调用时,它也会自动的为我们添加一个”default“.**

    **但是如果一个模块用es6的方式做了默认导出，另一个模块用非es6的模块做了导入，就会产生问题。**

    + 在c.node.ts模块中导入es6中的a.ts模块

    ```TS
    let c1 = require('./a.node')
    let c2 = require('./b.node')
    let c3 = require('../es6/a')
    
    console.log(c1)//{ x: 1, y: 2 }
    console.log(c2)//{ c: 3, d: 4 }
    //在es6的a.ts中默认导出了一个函数，但是当我们用c3()却会提示我们c3不是一个函数
    //c3()//c3 is not a function
    //通过打印c3结构，可以看到结构中函数添加了一个default属性
    // console.log(c3)
    // c3.default() //正确的调用方式 //但是这种调用方式容易发生错误
    ```

    + 处理两个模块之间不兼容性的问题（两个方案）

      + 方案一：两个模块之间不要混用

      + TS提供了一个兼容性的语法

        + 在es6文件夹下创建一个d.ts，使用**”export  =“** 来导出一个函数

        ```TS
        //顶级导出，同时也意味着这个模块中不能有其他的导出了
        export = function () {
            console.log("I'm default")
        }
        // export let a = 1 //再写一个导出就会报错
        ```

        + 在c.node.ts中导入这个模块

          ```TS
          let c1 = require('./a.node')
          let c2 = require('./b.node')
          let c3 = require('../es6/a')
          //使用import导入
          import c4 = require('../es6/d')
          //es6方式导入
          // import c4 from '../es6/d'
          //这里涉及一个配置项： "esModuleInterop": true, 
          //如果将这个配置项关闭掉，则不能使用es6的方式导入
          
          console.log(c1)//{ x: 1, y: 2 }
          console.log(c2)//{ c: 3, d: 4 }
          c3.default()
          c4()
          ```

### 使用命名空间

+ 在JavaScript中命名空间能够有效的避免全局污染，在es6引用了模块系统后，命名空间就很少被提及了，但ts仍然实现了这个特性。在TS的早期版本中，命名空间也叫内部模块，本质上就是一个闭包，可以用于隔离作用域。尽管在一个模块系统中，我们完全不用考虑全局污染问题。但是如果使用了一些全局类库，命名空间仍然是一个比较好的解决方案。
+ 命名空间作用：隔离作用域，主要是兼容旧系统全局变量
+ 特点：利用闭包的原理，创建了一个立即执行函数

**a.ts**

```TS
//使用namespace关键字声明命名空间
namespace Shape {
    //未导出的属性只能在Shape命名空间之下访问
    const pi = Math.PI
    //使用export导出，可实现全局访问
    export function cricle(r: number) {
        return pi * r ** 2
    }
}
//命名空间可以实现拆分，在b.ts中有一个函数共享Shape命名空间
```

**b.ts**

```TS
//共享Shape命名空间
/// <reference path="a.ts" />
namespace Shape {
    export function square(x: number) {
        return x * x
    }
}

//明确原则：命名空间和模块不要混用，不要在一个模块中使用命名空间。命名空间最好在一个全局环境下使用
//首先将a.ts和b.ts编译成js文件，然后在index.html中引入


console.log(Shape.cricle(2))
//square在a.ts中定义，此时b.ts构成了对a.ts的引用，在这里需要用到三斜线指令
console.log(Shape.square(2))

//使用import为函数起别名 —— 这个import和模块中的import没有关系
import cricle = Shape.cricle
console.log(cricle(2))


//TS文档对三斜线指令的解释：
//三斜线指令是包含单个XML标签的单行注释。 注释的内容会做为编译器指令使用。

//三斜线指令仅可放在包含它的文件的最顶端。 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令。 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。三斜线引用告诉编译器在编译过程中要引入的额外的文件。

///// <reference path="..." />指令是三斜线指令中最常见的一种。 它用于声明文件间的依赖。

```

**编译后的命名空间a.js**

```TS
"use strict";
var Shape;
(function (Shape) {
    var pi = Math.PI;
    function cricle(r) {
        return pi * Math.pow(r, 2);
    }
    Shape.cricle = cricle;
})(Shape || (Shape = {}));

//命名空间被编译成一个立即执行函数，这个函数创建了一个闭包。在闭包中有一些私有成员，导出的成员 “Shape.cricle”会被挂在在全局变量下

```



### 理解声明并合

+ 声明合并：是指编译器将针对同一个名字的两个独立声明合并为单一声明。 合并后的声明同时拥有原先两个声明的特性。 任何数量的声明都可被合并；不局限于两个声明。

```TS
//接口声明合并——在全局模块下，两个接口甚至可以不在一个文件中
interface A {
    x: number;
    // y: string;//对于接口中非函数的成员，要保证唯一性,下面第二个接口将会报错：后续属性声明必须属于同一类型。属性“y”的类型必须为“string”，但此处却为类型“number”。
    foo(bar: number): number; // 5
    foo(bar: 'a'): string; // 2
}
//再定义一个同名接口，此时两个接口就会合并
interface A {
    y: number;
    foo(bar: string): string; // 3
    foo(bar: string[]): string[]; // 4
    foo(bar: 'b'): string; // 1
}
//定义变量a属于接口类型A,变量a具有接口A的所有属性
let a: A = {
    x: 1,
    y: 2,
    //对于函数成员，每一个函数都会被声明一个函数重载
    foo(bar: any) {
        return bar
    }
    //在接口合并时函数重载声明顺序：在接口内部，然书写顺序来确定，后面的接口会排在前面，如果一个函数的参数是一个字面量，那么这个函数的声明就会被提升到整个函数声明的最顶端
}


//命名空间之间的合并——学习命名空间时定义的a.ts和b.ts实现了命名合并
//在命名空间中，导出的函数不可以重复定义，而接口中可以

//命名空间和类的合并
class C {}
namespace C {
    //相当于给类添加静态的属性
    export let state = 1
}
console.log(C.state)

//命名空间和函数的合并
function Lib() {}
namespace Lib {
    export let version = '1.0'
}
console.log(Lib.version)



//命名空间和枚举的合并
enum Color {
    Red,
    Yellow,
    Blue
}
namespace Color {
    //相当于给枚举类型增加了一个方法
    export function mix() {}
}
console.log(Color)

//命名空间在于函数、类进行声明合并，命名空间一定要防止函数声明或类声明的后面
//枚举和命名空间的声明位置没有要求

//类与函数必须要先定义才能添加对应的成员或者属性及方法；枚举的话本身就是直接在个对象上添加属性，与命名空间无前后之分，都会创建这个名称的对象。

```



### 如何编写声明文件

+ 背景：在TS中使用一个类库时，需要ts声明文件对外暴露API，有时候声明文件在源码中，大部分是单独提供额外安装。

+ 类库：类库一般分为三类：全局类库，模块类库，umd类库
+ 声明文件查询：http://microsoft.github.io/TypeSearch/
+ 如何为社区贡献声明文件的方法：http://definitelytyped.org/guides/contributing.html

+ 在TS中引入外部类库jQuery：

  jQuery是一种UMD库，既可以通过全局方式来引用，也可以模块化引用。

  安装jQuery：

  > $  npm  i  jquery

  采用模块发的方式引用：

  ```TS
  import $ from 'jquery'
  //此时会有一个提示：无法找到模块“jquery”的声明文件。
  //这是一位jQuery使用JavaScript编写的，在使用非ts编写的类库时，必须为这个类库编写声明文件，对外暴露它的API
  ```

  安装jQuery类型声明包——声明文件名称为@types/类库名：

  > npm i @types/jquery -D

  安装之后"jquery"就没有报错了，然后就可以使用jQuery了。

+ 三种类库声明文件的写法

  + 全局类库

    + 创建一个全局类库文件global-lib.js，定义一个全局方法

    ```
    function globalLib(options) {
        console.log(options);
    }
    
    //为方法添加属性
    globalLib.version = '1.0.0';
    
    globalLib.doSomething = function() {
        console.log('globalLib do something');
    };
    
    ```

    + 使用全局类库

      + 在index.html中引入全局类库

      ```html
          <script src="../04_libs/global-lib.js"></script>
      ```

      + 在index.ts中调用全局类库

      ```TS
      globalLib({x: 1})
      globalLib.doSomething()
      //此时会给我提示：找不到名称“globalLib” 因为现在还没有为global-lib.js编写声明文件
      ```

      + global-lib.js声明文件——global-lib.d.ts

      ```TS
      //declare为外部变量提供类型声明
      //函数和命名空间的声明合并
      declare function globalLib(options: globalLib.Options): void;
      
      declare namespace globalLib {
          const version: string;
          function doSomething(): void;
          //使用接口约束参数option，放在命名空间中避免全局暴露出来
          interface Options {
              [key: string]: anyTS
          }
      }
      ```

  + 模块类库

    + 创建一个模块类库文件module-lib.js

    ```JS
    const version = '1.0.0';
    
    function doSomething() {
        console.log('moduleLib do something');
    }
    
    function moduleLib(options) {
        console.log(options);
    }
    
    moduleLib.version = version;
    moduleLib.doSomething = doSomething;
    
    module.exports = moduleLib;
    
    ```

    + 在index.ts引入该模块

    ```TS
    import moduleLib from './module-lib'
    //此时会报错:无法找到模块'./module-lib'的声明文件
    ```

    + module-lib.js声明文件—module-lib.d.ts

    ```TS
    declare function moduleLib(options: Options): void
    
    //因为这个声明文件本身就是一个模块，所以在命名空间外部定义也不会向外暴露
    interface Options {
        [key: string]: any
    }
    
    declare namespace moduleLib {
        const version: string
        function doSomething(): void
    }
    
    export = moduleLib
    
    ```

  + umd类库

    + 创建一个umd类库文件umd-lib.js

    ```JS
    (function (root, factory) {
        if (typeof define === "function" && define.amd) {
            define(factory);
        } else if (typeof module === "object" && module.exports) {
            module.exports = factory();
        } else {
            root.umdLib = factory();
        }
    }(this, function() {
        return {
            version: '1.0.0',
            doSomething() {
                console.log('umdLib do something');
            }
        }
    }));
    
    ```

    + 在index.ts引入该模块

    ```TS
    import umdLib from './umd-lib'
    //此时会报错:无法找到模块'./umd-lib'的声明文件
    ```

    + umd-lib.js声明文件—umd-lib.d.ts

    ```TS
    declare namespace umdLib {
        const version: string
        function doSomething(): void
    }
    
    export as namespace umdLib
    
    export = umdLib
    
    ```

    + umd全局引用——在index.html中：

    ```HTML
      <script src="../04_libs/umd-lib.js"></script>
    ```

    此时在index.ts中注释掉原先的模块引入并调用模块中的方法时：

    ```
    // import umdLib from './umd-lib'
    umdLib.doSomething()
    //umdLib会报错：“umdLib”指 UMD 全局，但当前文件是模块。请考虑改为添加导入。
    ```

    tsconfig.json配置项：  "allowUmdGlobalAccess": true, 可以解决这个报错

  + 插件

    用来给类库添加一些自定义的方法

    + 模块插件

      安装moment类库:

      > $ npm  i moment

      为moment类库添加自定义方法：

      ```TS
      import m from 'moment';
      m.myFunction = () => {}
      //此时会给我们报错：类型“typeof moment”上不存在属性“myFunction”。提示我们moment上没有这个自定义的方法
      ```

      使用declare为模块声明一个自定义的方法：

      ```TS
      import m from 'moment';
      declare module 'moment' {
         // 导出自定义方法
          export function myFunction(): void;
      }
      m.myFunction = () => {}
      ```

    + 全局插件

      给全局变量添加方法

      ```TS
      // 全局插件——使用declare global
      declare global {
      //为globalLib增加自定义的方法
          namespace globalLib {
              function doAnyting(): void
          }
      }
      globalLib.doAnyting = () => {}
      //但是这样会对全局命名空间照成一定的污染
      ```

      

### 配置tsconfig.json

如果没有任何配置，编译器将会按照默认的配置编译ts文件（.ts/.d.ts/.tsx）

+ 文件选项

  + **"files"：[]**：表示编译器需要编译的单个文件的列表

  ```json
  {
  "files":[
  "src/a.ts"
  ]
  }
  ```

  + **"include"：[]**:编译器需要编译的文件或目录。files和include会合并

  ```JS
  {
  "files":[
  "src/a.ts"
  ],
  "include":[
      "src"，//src目录下的所有文件
  //支持通配符
      ”src/*“，//只编译src目录的一级目录
      ”src/*/*“，//只编译src目录的二级目录
  ]
  }
  ```

  + **”exclude“：[]**：编译器需要排除的文件或文件夹。默认会排除node_module下所有的文件

  + 配置文件之间的继承

    1. 新建tsconfig.base.json
    2. 在tsconfig.json中通过extends导入

    ```json
    {
    "extends":"./tsconfig.base.json"
    //在tsconfig.json中可以覆盖tsconfig.base.json中的配置
    ”compileOnSave“:true //保存文件时让编译器自动编译    当前vscode不再支持该属性
    }
    ```

+ 编译选项

```json
{
  "compilerOptions": {
       // 增量编译——ts在以第一次编译后，生成一个可以存储编译信息的文件（tsconfig.tsbuildinfo），在二次编译时，根据这个文件做增量编译，提高编译速度
      // "incremental": true,  
      
      // 增量编译文件的存储位置
      // "tsBuildInfoFile": "./buildFile",   
      
      // 打印诊断信息——增量编译提高编译速度时可开启这个功能来查看编译速度的提升
      // "diagnostics": true,               

      // "target": "es5",           // 目标语言的版本
      // "module": "commonjs",      // 生成代码的模块标准
      // "outFile": "./app.js",     // 将多个相互依赖的文件生成一个文件，可以用在 AMD 模块中

      // "lib": [],                 // TS 需要引用的库，即声明文件，es5 默认 "dom", "es5", "scripthost"

      // "allowJs": true,           // 允许编译 JS 文件（js、jsx）
      // "checkJs": true,           // 允许在 JS 文件中报错，通常与 allowJS 一起使用
      // "outDir": "./out",         // 指定输出目录
      // "rootDir": "./",           // 指定输入文件目录（用于输出）

      // "declaration": true,         // 自动生成声明文件
      // "declarationDir": "./d",     // 声明文件的路径
      // "emitDeclarationOnly": true, // 只生成声明文件（没有生成对应的js文件）
      // "sourceMap": true,           // 生成目标文件的 sourceMap
      // "inlineSourceMap": true,     // 生成目标文件的 inline sourceMap
      // "declarationMap": true,      // 生成声明文件的 sourceMap
      // "typeRoots": [],             // 声明文件目录，默认 node_modules/@types
      // "types": [],                 // 声明文件包

      // "removeComments": true,    // 删除注释

      // "noEmit": true,            // 不输出文件
      // "noEmitOnError": true,     // 发生错误时不输出文件

      // "noEmitHelpers": true,     // 不生成 helper 函数，需额外安装 ts-helpers
      // "importHelpers": true,     // 通过 tslib 引入 helper 函数，文件必须是模块

      // "downlevelIteration": true,    // 降级遍历器的实现（es3/5）

      //类型检查
      // "strict": true,                        // 开启所有严格的类型检查
      // "alwaysStrict": false,                 // 在代码中注入 "use strict";
      // "noImplicitAny": false,                // 不允许隐式的 any 类型
      // "strictNullChecks": false,             // 不允许把 null、undefined 赋值给其他类型变量
      // "strictFunctionTypes": false           // 不允许函数参数双向协变
      // "strictPropertyInitialization": false, // 类的实例属性必须初始化
      // "strictBindCallApply": false,          // 严格的 bind/call/apply 检查
      // "noImplicitThis": false,               // 不允许 this 有隐式的 any 类型

      //函数相关选项
      // "noUnusedLocals": true,                // 检查只声明，未使用的局部变量
      // "noUnusedParameters": true,            // 检查未使用的函数参数
      // "noFallthroughCasesInSwitch": true,    // 防止 switch 语句贯穿
      // "noImplicitReturns": true,             // 每个分支都要有返回值

      // "esModuleInterop": true,               // 允许 export = 导出，由import from 导入
      // "allowUmdGlobalAccess": true,          // 允许在模块中访问 UMD 全局变量
      // "moduleResolution": "node",            // 模块解析策略node/classic
      // "baseUrl": "./",                       // 解析非相对模块的基地址
      // "paths": {                             // 路径映射，相对于 baseUrl
      //   "jquery": ["node_modules/jquery/dist/jquery.slim.min.js"]
      // },
      // "rootDirs": ["src", "out"],            // 将多个目录放在一个虚拟目录下，用于运行时.相当于将src和out两个目录放在同一个虚拟目录下

      // "listEmittedFiles": true,        // 打印输出的文件
      // "listFiles": true,               // 打印编译的文件（包括引用的声明文件）
  }
}

```

+ 工程引用——ts3.0新特性

  + 背景：有时候我们会在一个代码仓库中存放多个需要单独构建（build）的工程。假设代码仓库有一个src目录和一个测试目录test，src目录下存放了一个前端代码文件夹client,一个后端文件夹server,和一个共享文件夹common

  当配置文件tsconfig.ts如下时，通过tsc进行编译后，会在目录下生成一个dist目录，dist目录下有两个文件夹src和test：

  ```JSON
  {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "strict": true,
      "outDir": "./dist"
    	}
    }
  ```

  如果要在dist目录下，直接生成src目录下的client和server文件：我们只需在配置文件中添加”include“属性:

  ```JSON
  {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "strict": true,
      "outDir": "./dist"
    },
    "include": ["src"]
  }
  ```

  再次编译后，src目录下的文件会直接生成在dist目录下，但在上述配置文件中，忽略了test文件夹，导致test文件夹不会被编译生成在dist目录下。还有不方便的地方就是无法单独构建client或者server。以上问题都是通过单个配置文件不能解决的

  + 工程引用：工程引用就是用来解决上述问题的，它可以灵活的配置输出目录，使工程之间产生依赖关系，有利于将一个大的项目拆分成一个小的项目。
  + 项目修改：修改原先的项目，为每个小工程提供一个tsconfig.ts配置

  主目录下的tsconfig.ts

  ```JSON
  {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "strict": true,
      "composite": true,//使工程可以被引用，并且可以进行增量编译
      "declaration": true//生成一个声明文件
    }
  }
  
  ```

  client目录下的tsconfig.ts

  ```JSON
  {
      "extends": "../../tsconfig.json",//继承了主目录下的基础配置
      "compilerOptions": {
          "outDir": "../../dist/client",//指定输出目录
      },
      "references": [
          { "path": "../common" }//配置它所依赖的工程
      ]
  }
  ```

  server目录下的tsconfig.ts

  ```json
  {
      "extends": "../../tsconfig.json",
      "compilerOptions": {
          "outDir": "../../dist/server",
      },
      "references": [
          { "path": "../common" }
      ]
  }
  ```

  common目录下的tsconfig.ts

  ```JSON
  {
      "extends": "../../tsconfig.json",
      "compilerOptions": {
          "outDir": "../../dist/common",
      }
  }
  ```

  test目录下的tsconfig.ts

  ```JSON
  {
      "extends": "../tsconfig.json",
      "references": [
          { "path": "../src/client" },
          { "path": "../src/server" }
      ]
  }
  ```

  + ts为了支持工程引用，提供了一种新的构建模式"build"简写“-b”,使用build可以单独的构建一个工程，相关依赖也会被自动构建

  >$ tsc  -b  src/server --verbose 

  使用上述命令构建后，会在dist目录下生成一个server文件夹以及它所依赖的文件夹common。--verbose为打印构建信息，--为清除原先的构建。

  + 工程引用的优点：
    + 解决了输出目录的结构问题
    + 解决了单个工程构建的问题
    + 通过增量编译提升了构建速度

### 编译工具：从ts-loader到Babel

+ ts-loader

  在之前，为了将ts编译成js，使用了webpack中的loader——ts-loader：

  webpack.base.config.js

  ```JS
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  
  module.exports = {
      entry: './src/index.ts',
      output: {
          filename: 'app.js'
      },
      resolve: {
          extensions: ['.js', '.ts', '.tsx']
      },
      module: {
          rules: [
              {
                  test: /\.tsx?$/i,
                  use: [{
                      //ts-loader在内部调用ts官方的编译器tsc,所以ts-loader可以和tsc共享tsconfig.ts文件
                      loader: 'ts-loader'
                      //ts-loader有自己的配置，通过options属性传入,具体配置项可参考ts-loader官方文档
                      options:{
                      //当这个配置项开启，编译时只做语言转换，而不做类型检查。开启后构建速度会有所提升
                      transpileOnly:false
                  }
                      
                  }],
                  exclude: /node_modules/
              }
          ]
      },
      plugins: [
          new HtmlWebpackPlugin({
              template: './src/tpl/index.html'
          })
      ]
  }
  
  ```

  + 在transpileOnly开启的情况下做类型检查

    + 安装插件——fork-ts-checker-webpack-plugin——将类型检查放在独立的进程中进行

    >$  npm  i  fork-ts-checker-webpack-plugin -D

    在webpack.base.config.js中引入

    ```js
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    //引入
    const ForkTsCheckerWebpackPulgin = require('fork-ts-checker-webpack-plugin')
    module.exports = {
        entry: './src/index.ts',
        output: {
            filename: 'app.js'
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/i,
                    use: [{
                        loader: 'ts-loader'
                        options:{
                        transpileOnly:false
                    }
                        
                    }],
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/tpl/index.html'
            }),
            //使用
            new ForkTsCheckerWebpackPulgin()
        ]
    }
    
    ```

+ awesome-typescript-loader

  + 与ts-loader的主要区别

    + 更适合与Babel集成，使用Babel的转义和缓存
    + 不需要安装额外的插件，就可以把类型检查放在独立进程中进行

  + 编译时间对比

    | loader                    | 默认设置 | transpileOnly | tanspileOnly+类型检查进程 |
    | ------------------------- | -------- | ------------- | ------------------------- |
    | ts-loader                 | 1600+    | 500+          | 3000+(时间较长)           |
    | awesome-typescript-loader | 2200+    | 1600+         | 1600+(类型检查有遗漏)     |

  + 安装

  >$ npm i awesome-typescript-loader -D

  + 自带类型检查插件CheckerPlugin

  ```JS
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  //引入
  const {CheckerPlugin} = require('awesome-typescript-loader')
  module.exports = {
      entry: './src/index.ts',
      output: {
          filename: 'app.js'
      },
      resolve: {
          extensions: ['.js', '.ts', '.tsx']
      },
      module: {
          rules: [
              {
                  test: /\.tsx?$/i,
                  use: [{
                  //使用awesome-typescript-loader
                      loader: 'awesome-typescript-loader'
                      options:{
                      transpileOnly:false
                  }
                      
                  }],
                  exclude: /node_modules/
              }
          ]
      },
      plugins: [JS
          new HtmlWebpackPlugin({
              template: './src/tpl/index.html'
          }),
          //使用插件
          new CheckerPlugin()
      ]
  }
  ```

+ TypeScript与Babel

  + 使用了TypeScript，为什么还需要Babel?

    | 工具  | 编译能力                    | 类型检查 | 插件     |
    | ----- | --------------------------- | -------- | -------- |
    | TSC   | ts(x)、js(x) ➡es3/5/6/..... | 有       | 无       |
    | Babel | ts(x)、js(x) ➡es3/5/6/..... | 无       | 非常丰富 |

  + 在Babel7之前并不支持TS，要想使用必须结果复杂的转义

  TS➡ tsc(ts-loader/awesome-typescript-loader)➡JS ➡Babel ➡JS

  + Babel7之后：TS ➡Babel ➡JS  而tsc则去做了Babel不能做的事情——类型检查

  + 使用Babel构建项目

    + 创建一个文件夹，初始化项目：

    > $ npm i init -y

    + 安装依赖：

    > $ npm i @babel/cli -D //babel自带的命令行集成工具
    >
    > $ npm i @babel/core -D  //使用@babel/core模块可以调用 Babel 的 API 进行转码
    >
    > $ npm i @babel/plugin-proposal-class-properties -D //用来编译类(class)
    >
    > $ npm i @babel/plugin-proposal-object-rest-spread -D //支持剩余和扩展符
    >
    > $ npm i @babel/preset-env -D //一个插件预设
    >
    > $ npm i @babel/preset-typescript -D  //用来编译ts文件
    
    + 创建Babel配置文件".babelrc"
    
    ```JSON
    {
        //预设
        "presets": [
            "@babel/preset-env",
            "@babel/preset-typescript"
        ],
        //插件
        "plugins": [
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread"
        ]
    }
    ```
    
    + 创建src目录新建index.ts文件，在文件中编写配置文件中设置的插件需要用到的语法
    
    ```
    
    class A {
        a: number = 1
    }
    
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
    let n = { x, y, ...z }
    ```
    
    + 在package.json中的"scripts"下配置启动命令
    
    ```JSOn
        "scripts": {
            "build": "babel src --out-dir dist --extensions \".ts,.tsx\""
        },
    ```
    
    + 编译——使用babel将ts编译成js，而未使用tsc
    
    >$ npm run build
    
    + 使用babel进行编译不会进行类型检查，要想进行类型检查，需要安装typescript
    
    > $ npm i typescript -D
    >
    > $ tsc -init  //生成配置文件tsconfig.ts
    >
    > 在配置文件中开启配置：“noEmit”:true  //只做类型检查，不输出任何文件
    
    + 在package.json中配置类型检查脚本，并开启监控模式
    
    ```JSON
        "scripts": {
            "build": "babel src --out-dir dist --extensions \".ts,.tsx\""
            "type-check":"tsc --watch"
        },
    ```
    
    + 开启类型监控——开启类型监控终端：
    
    > $ npm run type-check
    
    这样就将babel和ts结合在一起了。
    
  + 在Babel中使用TS需要注意的事项
  
    + 有四种语法在babel中是无法编译的
  
      + 命名空间
  
      ```TS
      namespace N{
      export const n =1
      }
      ```
  
      + 类型断言
  
      ```TS
      class A{
      	a:number = 1
      }
      let s = {} as A
      s.a = 1
      ```
  
      + 常量枚举
  
      ```TS
      const enum E {A}
      ```
  
      + 默认导出
  
      ```TS
      export = s
      ```
  
  + 如何选择TypeScript编译工具
  
    + 如果没有使用过Babel，首选TypeScript自身的编译器（可配合ts-loader使用）
    + 如果项目中使用了Babel，安装@babel/preset-typescript（可配合tsc做类型检查）
    + 两种编译工具不要混用

### 代码检查工具：从TSLint到ESLint

+ TSLint与ESLint——TypeScript官方转向ESLint的原因

  + TSLint执行规则的方式存在一些架构问题，从而影响了性能，而修复这些问题会破坏现有的规则
  + ESLint的性能更好，并且社区用户通常拥有ESLint的规则配置（比如针对React和Vue的规则），而不会拥有TSLint的规则配置

+ 使用TypeScript，为什么还需要ESLint?

  + TypeScript可以实现类型检查和语言转换，并对语法错误进行检查。ESLint除了可以检查语法错误，还能保证代码的风格统一（语句后面是否加分号）
  + 如果要用ESLint去检查TS的语法，就会发生一些问题。TypeScript和ESLint在进行各自的工作之前，都需要把代码转换成抽象语法树（AST）。但TypeScript的语法树和ESLint的语法树是不兼容的。虽然TSLint是完全基于TS抽象语法树工作的，但是不能重用社区围绕ESLint所做的工作。
  + 使用“typescript-eslint”可以解决这种兼容性的问题，它为ESLint提供了专门解析TS代码的编译器。可以将TS语法树转换成ESLint所希望的语法树（ESTree）。

+ ESLint在TS中的应用

  + 安装所需包

  >$ npm i eslint  -D
  >
  >$ npm i @typescript-eslint/eslint-plugin -D //使ESLint识别TS的一些特殊语法
  >
  >$ npm i @typescript-eslint/parser -D //为ESLint提供解析器

  + ESLint配置——“.eslintrc.json”

  ```JSON
  {
      "parser": "@typescript-eslint/parser",
      "plugins": ["@typescript-eslint"],
      "parserOptions": {
          "project":"./tsconfig.json" //使用tsconfig.json中的类型信息
      },
      "extends": [
          "plugin:typescript-eslint/recommended"
      ],
      "rules": {
          
      }
  }
  ```

  + 添加“lint”脚本

  ```JSON
      "scripts": {
      //由于 `eslint` 默认不会检查 `.ts` 后缀的文件，所以需要加上参数 `--ext `
          "lint": "eslint src --ext .js,.ts"
      }
  ```

  + ESLint插件

    除了使用脚本，还可以使用插件——vscode中安装ESLint插件

+ babel-eslint 与 typescript-eslint
  + babel-eslit：支持TypeScript没有的额外的语法检查，抛弃TypeScript，不支持类型检查
  +  typescript-eslint：基于TypeScript的AST，支持创建基于类型信息的规则（tsconfig.ts）
  + j建议：
    + 两者底层机制不一样，不要一起使用
    + Babel体系建议使用babel-eslint,否则可以使用 typescript-eslint。

### 使用jest进行单元测试

+ TypeScript工具体系
  + 编译工具
    + ts-loader
    + @babel/preset-typescipt
  + 代码检查工具
    + eslint+typescript-eslint
    + babel-eslint
  + 单元测试工具
    + ts-jest
    + babel-jest

+ jest：Facebook推出的一款测试工具

+ ts-jest——可以进行类型检查

  + 安装包

  >$ npm i jest -D
  >
  >$ npm i ts-jest -D
  >
  >$ npm i @types/jest -D

  + 配置测试脚本

  ```JSON
      "scripts": {
          "test": "jest"
      },
  ```

  + 生成ts-jest配置文件

  >$ npx ts-jest config:init

  + 编写测试用例

    + 在src下新建math.ts文件

    ```TS
    function add(a: number, b: number) {
        return a + b;
    }
    
    function sub(a: number, b: number) {
        return a - b;
    }
    
    module.exports = {
        add,
        sub
    }
    
    ```

    + 在根目录新建test文件夹，在里面新建math.test.ts:

    ```TS
    const math = require('../src/math');
    
    test('add: 1 + 2 = 3', () => {
        expect(math.add(1, 2)).toBe(3);
    });
    
    test('sub: 1 - 2 = -1', () => {
        expect(math.sub(1, 2)).toBe(-1);
    });
    
    // let x: number = '1' //测试时类型检查会报错
    
    ```

    + 运行测试

    >$ npm run test

    + 输出结果

    ```
     PASS  test/math.test.ts
      √ add: 1 + 2 = 3 (2 ms)
      √ sub: 1 - 2 = -1
    
    Test Suites: 1 passed, 1 total
    Tests:       2 passed, 2 total
    Snapshots:   0 total
    Time:        2.394 s
    Ran all test suites.
    ```

    

+ babel-jest——不可以进行类型检查

  + 在babel工程下安装包：

  > $ npm i jest -D
  >
  > $ npm i babel-jest -D
  >
  > $ npm i @types/jest -D

  + 配置测试脚本

  ```JSON
      "scripts": {
          "test": "jest"
      },
  ```

  + 将ts-jest中使用的代码复制过去
  + 运行测试

  > npm run test
  
  + 类型验证——开启之前babel工程中配置的类型检查脚本"type-check"
  
  >npm run type-check