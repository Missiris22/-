# node

## 参考网页

【廖雪峰】https://www.liaoxuefeng.com/wiki/1022910821149312/1023025235359040

【官方文档】http://nodejs.cn/learn



## NodeJS是什么

Node.js is a JavaScript runtime （js运行时）built on Chrome's V8

Node.js uses an event-driven, non-blocking I/O model

npm 包管理器

> **运行时（runtime）**
>
> 一个程序要在一个硬件或着平台上跑	就必须需要一个中间层（runtime）把程序语言转换为机器能听懂的机器语言

> **非阻塞I/O：** I（input）/ O（output）
>
> 阻塞： I/O 时进程休眠等待 I/O 完成后进行下一步
>
> 非阻塞：I/O 时函数立即返回，进程不等待 I/O 完成

> **事件驱动**
>
> - I/O 等异步操作结束后的通知（结束之后触发某个事件）
> - 观察者模式



### 为什么前端偏爱NodeJS

1. 使用 js 可以进行开发
2. 在处理**高并发、I/O 密集场景**性能优势明显

> **I/O 密集 & cpu 密集**
>
> cpu 密集：压缩、解压、加密、解密
>
> I/O 密集：文件操作、网络操作、数据库

> **高并发应对之道**
>
> 1. 增加机器数
> 2. 增加机器的cpu数 —— 多核

> **进程**
>
> 是计算机中的程序关于某数据集合上的一次运行活动，是系统进行系统分配和调度的基本单位（一个运行程序）
>
> **多进程**
>
> 启动多个进程，多个进程可以一块执行多个任务（并不是同时进行，而是迅速的在多个进程之间进行切换）
>
> **线程**
>
> 进程内一个相对独立的、可调度的执行单元，与同属的一个进程的线程共享进程的资源
>
> **多线程**
>
> 启动一个进程，在一个进程内启动多个线程，这样多个线程也可以一块执行多个任务

![Snipaste_2020-09-25_16-14-09](/Users/bilibili/Desktop/Snipaste_2020-09-25_16-14-09.png)



### NodeJS的单线程

- 单线程只针对主进程，I/O 操作系统底层多线程调度

- 单线程并不是单进程



### 使用场景

- Web server
- 本地代码构建
- 实用工具开发：爬虫....





## 对比 AMD CMD CommonJS ES6

因为JavaScript是单线程执行，根本不能进行同步IO操作，所以，JavaScript的这一“缺陷”导致了它只能使用异步IO。

在2009年，Ryan正式推出了基于JavaScript语言和V8引擎的开源Web服务器项目，命名为Node.js。Nodejs可以编写高性能Web服务。

在 NodeJS 之前，由于没有前端没有复杂的开发场景，所以不存在模块化。NodeJS 诞生之后，使用CommonJS的模块化规范。



目前流行的JS模块化规范有CommonJS、AMD、CMD以及ES6的模块系统。

【梳理AMD、CMD、CommonJS、ES6 Module的区别】https://juejin.im/post/6844903983987834888

【AMD-CMD-CommonJS三者间的异同】https://segmentfault.com/a/1190000021715242

![image-20200924150343561](/Users/bilibili/Library/Application Support/typora-user-images/image-20200924150343561.png)



#### AMD 和 RequireJS

采用异步模块加载机制加载模块，由于以 RequireJS 实现 AMD规范，故也叫 **RequireJS**

**基本用法：**

用 `require.config()` 指定引用路径，通过`define()`来定义一个模块，使用`require()`可以导入定义的模块。

**特点：**

对于依赖的模块，AMD推崇**依赖前置，提前执行**。也就是说，在`define`方法里传入的依赖模块(数组)，会在一开始就下载并执行。

但并行下载，异步处理，导致加载顺序的不确定



#### CMD 和 SeaJS

**特点**
对于依赖的模块，CMD推崇**依赖就近，延迟执行**。也就是说，只有到`require`时依赖模块才执行。因此每个js文件的执行顺序在代码中是有体现的，可控的



#### CommonJS

- 每个文件是一个模块，有自己的作用域
- 在模块内部，module 变量代表模块本身
- module.exports 属性代表模块对外接口

弥补JavaScript在服务器端缺少模块化机制，NodeJS、webpack都是基于该规范来实现的。

2013年5月，node.js包管理器npm的作者宣布node.js已经废弃CommonJS。

**CommonJS 规范是为了解决 JavaScript 的作用域问题而定义的模块形式，可以使每个模块它自身的命名空间中执行。该规范的主要内容是，模块必须通过 `module.exports` 导出对外的变量或接口，通过 `require()` 来导入其他模块的输出到当前模块作用域中。**

1. 每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

2. **【module】**
   - `module`变量代表当前模块。这个变量是一个对象
   - `module.exports`是对外的接口。加载某个模块，其实是加载该模块的`module.exports`属性
   - module对象必须有一个id属性，它是这个模块的顶层id

> CommonJS 是同步加载模块，但其实也有浏览器端的实现，其原理是现将所有模块都定义好并通过 `id` 索引，这样就可以方便的在浏览器环境中解析了

**基本用法：**

有四个重要的环境变量为模块化的实现提供支持：`module` `exports` `require` `global`

通过`module.exports`来导出模块，使用`require`导入定义的模块

**特点：**

- 所有代码都运行在模块作用域，不会污染全局作用域；
- 模块是同步加载的，即只有加载完成，才能执行后面的操作；
- 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存；
- CommonJS输出是值的拷贝(即，require返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值)
- 在服务端，模块文件存放在本地文件，读取非常快，所以可以使用CommonJS规同步加载模块。但是在浏览器端，限于网络原因，更合理的方案是是用异步加载

**`exports`和`module.export`区别：**

`exports`：对于本身来讲是一个变量（对象），它不是module的引用，它是`{}`的引用，它指向`module.exports`的{}模块。只能使用`.`语法 向外暴露变量。

`module.exports`：`module`是一个变量，指向一块内存，`exports`是`module`中的一个属性，存储在内存中，然后`exports`属性指向`{}`模块。既可以使用`.`语法，也可以使用`=`直接赋值。




#### ES6 Module

ES6 Module是ES6中规定的模块体系，旨在成为浏览器和服务器通用的模块解决方案。

**基本用法：**

模块功能主要由两个命令构成：`export`（用于规定模块的对外接口） 和`import`（用于输入其他模块提供的功能）。

export default 模块指定默认输出，对应的import 语句不需要使用大括号

```js
export default { add, emit }

import math from './math'
console.log(math.add());
```

**特点：**

1. 自动采用严格模式
2. `import` read-only特性：import 的属性是只读的，不能赋值，类似 `const` 的特性
3. `export/import` 提升：`import/export`必须位于模块顶级，不能位于作用域内；其次对于模块内的`import/export`会提升到模块顶部，这是在编译阶段完成的

**ES6 Module的特点(对比CommonJS)：**

- CommonJS模块是运行时加载，ES6 Module是编译时输出接口；

> - 运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
> - 编译时加载: ES6 模块不是对象，而是通过 `export` 命令显式指定输出的代码，`import`时采用静态命令的形式。即在`import`时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。模块内部引用的变化，会反应在外部。

```js
// a.js
let a = 1;
let b = { num: 1 }
setTimeout(() => {
    a = 2;
    b = { num: 2 };
}, 200);
module.exports = {
    a,
    b,
};

// node_common.js
// exports对象是模块内外的唯一关联， CommonJS 输出的内容，就是exports对象的属性，模块运行结束，属性就确定了。
let {a, b} = require('./a');
console.log(a);  // 1
console.log(b);  // { num: 1 }
setTimeout(() => {
    console.log(a);  // 1
    console.log(b);  // { num: 1 }
}, 500);

// es.js
import {a, b} from './a';
console.log(a);  // 1
console.log(b);  // { num: 1 }
setTimeout(() => {
    console.log(a);  // 2
    console.log(b);  // { num: 2 }
}, 500);
```



- CommonJS加载的是整个模块，将所有的接口全部加载进来，ES6 Module可以单独加载其中的某个接口；
- **CommonJS输出是值的拷贝，ES6 Module输出的是值的引用**，被输出模块的内部的改变会影响引用的改变；

> - ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的`import`有点像 Unix 系统的“符号连接”，原始值变了，`import`加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

- CommonJS this指向当前模块，ES6 Module this指向undefined;

目前浏览器对ES6 Module兼容还不太好，我们平时在webpack中使用的export/import，会被打包为exports/require。




#### 总结

CommonJS同步加载模块，现加载现用（缺点：加载速度慢、还会导致性能、可用性、调试和跨域访问等问题）。主要用于服务端（加载的模块文件一半存在本地硬盘，加载较快、不用考虑异步加载的方式），不适合在浏览器环境（因此有了AMD、CMD解决方案）

> 针对服务器端和针对浏览器端有什么本质区别呢？
>
> CommonJS主要针对服务器端，AMD、CMD、ES Module 主要针对浏览器端。服务器端一般采用同步加载文件，也就是如果需要某个模块，服务器会停下来等待它加载完成之后继续执行。而浏览器要保证效率，需要采用异步加载，这就需要预处理提前将需要的模块文件并行加载。

AMD是预加载，在并行加载js文件同时，还会解析执行该模块（因为需要执行，所以这个模块的依赖模块需要提前加载完成）。**依赖前置，提前执行**

CMD可以实现异步加载依赖模块，懒加载，虽然并行加载js文件，但是不会执行，而是需要的时候再执行（再下载依赖模块）。**依赖就近，延迟执行**

CommonJS 和 ES Module 区别：CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用

如何使用？CommonJs 的话，因为 NodeJS 就是它的实现，所以使用 node 就行，也不用引入其他包。AMD则是通过`<script>`标签引入require.js，CMD则是引入sea.js



## 安装 Node.js 和 npm

### Node.js

1. 安装node

2. node版本

> node -v

2. 进入 node 环境

> 命令行输入 `node` 进入 node.js 交互环境。可以输入任意 js语句。

4. 退出 node 环境

> 连按两次 c r t l + c

![image-20200923190108577](/Users/bilibili/Library/Application Support/typora-user-images/image-20200923190108577.png)



### npm

> Node.js的包管理工具（package manager）
>
> 在安装 nodejs 时自动安装完成
>
> 在nodejs开发时，会用到很多别人写的 js代码（模块/包）。使用 npm 可以直接下载使用模块，并且自动下载关联模块

![image-20200923190446075](/Users/bilibili/Library/Application Support/typora-user-images/image-20200923190446075.png)



### node 交互模式 & 运行 js 文件

1. **直接输入 node，进入交互模式**

>  相当于启动 node 解释器，等待输入源代码，输入一行执行一行

2. **直接运行 node hello.js 文件**

> 相当于启动 node 解释器，然后一次性执行 hello.js，没有交互机会输入源代码

在编写 js代码时，可以一边在文本编辑器里写代码，一边开 node交互式命令窗口，在写代码的过程中，将部分代码粘到命令行进行验证。



## 模块

在node环境中，一个.js文件就称为一个模块（module）

> 使用模块的好处：
>
> 1. 提高代码可维护性
>
> 2. 便于重复引用
>
> 3. 避免函数&变量名冲突

```js
// hello.js文件
'use strict';

var s = 'Hello';

function greet(name) {
    console.log(s + ', ' + name + '!');
}

module.exports = greet; // 导出greet函数
```

```js
'use strict';

// 引入hello模块:
var greet = require('./hello');

var s = 'Michael';

greet(s); // Hello, Michael!
```



### 总结

**引入模块：**

```js
var foo = require('module');
```

1. require函数：引入模块作为变量保存在 greet变量 中。
2. 使用 require() 引入模块时，注意模块的引用路径。

> 在没有具体路径时，node 会依次在内置模块、全局模块、当前模块下查找引入的模块



导出变量：

```js
module.export = variable; // 任意对象、函数、数组...
```



如果只写模块名：`var greet = require('hello')` ，node 会依次在内置模块、全局模块、当前模块下查找 `hello.js` ，你可能会得到一个错误

```js
module.js
    throw err;
          ^
Error: Cannot find module 'hello'
    at Function.Module._resolveFilename
    at Function.Module._load
    ...
    at Function.Module._load
    at Function.Module.runMa
```

遇到这个错误，你要检查：

- 模块名是否写对了；
- 模块文件是否存在；
- 相对路径是否写对了。



## 环境&调试

### require

 **规则**

- `/` 表示绝对路径，` ./` 表示相对于当前文件
- 支持 `js`、 `json`、 ` node` 扩展名，不写依次尝试
- 不写路径则认为是 `build-in` 模块或者各级 `mode_modules` 内的第三方模块（从内向外）

**特性**

- Module 被加载的时候执行，加载之后缓存

- 一旦出现某个模块被循环加载，就只输出已经执行的部分，还未执行的部分不会输出（避免循环加载模块，容易造成变量值的不定）



### exports

```js
const exports = module.exports; 
// exports 实际上时 module.exports 的简写形式，对其赋值时注意不要改变指向

// js文件实际内部处理（沙箱模式保证变量在自己的作用域生效）
(
    function(exports, require, module, __filename, __dirname)
        // code
    }
)
```

```js
exports = {
  a: 1,
  b: 2,
  test: 100
}

const mod = require('./exports');
console.log(mod.test); // undefined

// **********

module.exports = {
  a: 1,
  b: 2,
  test: 100
}
const mod = require('./module_exports');
console.log(mod.test)l // 100
```



### global

- CommonJS

- Buffer process console

- timer

**模块中书写的是局部变量，加在global上的将成为全局变量**



```js
const testVar = 1000;
global.testVar2 = 200;
module.exports.testVar = testVar;

import mod from './global.js';
console.log(mod.testVar); // 1000
console.log(testVar2); // 200
```



### process

> 进程

#### argv

```js
const { argv, argv0, execArgv, execPath } = process;

// argv 数组
// 第0项：node存储地址
// 第1项：当前文件地址
// 之后：node 命令之后传递的参数
argv.forEach(item => {
    console.log(item);
})

// argv0 和 argv 的第一项类似
console.log(argv0);

// node命令之前传递参数的数组
console.log(execArgv);

// node存储地址：argv第一个参数
console.log(execPath);
```

#### env

> 不写路径的指令集

```js
const { env } = process;
console.log(env);
```

![image-20200930180622309](/Users/bilibili/Library/Application Support/typora-user-images/image-20200930180622309.png

![image-20200930180701164](/Users/bilibili/Library/Application Support/typora-user-images/image-20200930180701164.png)

![image-20200930180713022](/Users/bilibili/Library/Application Support/typora-user-images/image-20200930180713022.png)



#### cwd

>  process的执行路径 

```js
process.cwd();
```

![image-20200930181243095](/Users/bilibili/Library/Application Support/typora-user-images/image-20200930181243095.png)



#### process.nextTick & setTimeout & setImmediate

> 【eventLoop】
>
> process.nextTick 放在当前队列的最后一个
>
> setImmediate 放在下个队列的第一个
>
> setTimeout 放在前两者中间

大部分使用 `setImmediate`！！！

如果使用 `process.nextTick`，且其中进行长时间或者循环调用，将导致其他异步代码无法执行

![image-20201009143950895](/Users/bilibili/Library/Application Support/typora-user-images/image-20201009143950895.png)



### 调试

#### Inspector

https://nodejs.org/en/docs/guides/debugging-getting-started/

![image-20201009144405759](/Users/bilibili/Library/Application Support/typora-user-images/image-20201009144405759.png)

![image-20201009150910683](/Users/bilibili/Library/Application Support/typora-user-images/image-20201009150910683.png)



![image-20201009151453966](/Users/bilibili/Library/Application Support/typora-user-images/image-20201009151453966.png)



#### VS Code

条件断点



## 基础API

### path 路径

> 和路径有关的一切
>
> `const path = require('path');`

http://nodejs.cn/api/path.html

#### path.normalize(string: path)

> 规范化给定的 `path`，解析 `'..'` 和 `'.'` 片段

![image-20201010154128400](/Users/bilibili/Library/Application Support/typora-user-images/image-20201010154128400.png)



#### path.join([...paths])

> 将所有给定的 `path` 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径。

![image-20201010154049385](/Users/bilibili/Library/Application Support/typora-user-images/image-20201010154049385.png)



#### path.resolve([...paths])

> 将路径或路径片段的序列解析为绝对路径

![image-20201010155042990](/Users/bilibili/Library/Application Support/typora-user-images/image-20201010155042990.png)



#### basename dirname extname

> basename 文件名
>
> dirname 所在文件夹名
>
> extname 扩展文件名

![image-20201010161737696](/Users/bilibili/Library/Application Support/typora-user-images/image-20201010161737696.png)



#### path.parse(path) & path.format(pathObject)

> path.parse 返回一个包含path信息的对象，包括 `dir, root, base, name, ext`
>
> path.format 将路径或者路径片段的序列解析为绝对路径。【format需要注意优先级 http://nodejs.cn/api/path.html#path_path_resolve_paths】



#### 操作系统相关属性

![image-20201010170743172](/Users/bilibili/Library/Application Support/typora-user-images/image-20201010170743172.png)



#### path们的区别

**path**

`dirname \ filename` 总是返回文件的绝对路径

`process.cwd()` 总是返回node命令所在文件夹

**./**

在`require`方法中总是相对当前文件所在文件夹

在其他地方和`process.cwd()` 一样，相对node启动文件夹

![image-20201010180501627](/Users/bilibili/Library/Application Support/typora-user-images/image-20201010180501627.png)

![image-20201010180529608](/Users/bilibili/Library/Application Support/typora-user-images/image-20201010180529608.png)



### Buffer 缓冲器

1. Buffer 用于处理二进制数据流
2. 实例类似 `整数数组`，大小固定
3. 全局变量不需要`require`引用
4. C++代码在V8堆外分配物理内存



#### 属性

```js
// 创建一个长度为 10，且用 0 填充的 Buffer
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10，且用 0x1 填充的 Buffer
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10，且未初始化的 Buffer
// 这个方法比调用 Buffer.alloc() 更快，但返回实例可能包含旧数据
// 因此需要使用 fill() 或 write() 重写
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer
const buf4 = Buffer.from([1,2,3]);

// 创建一个包含 utf8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer
const buf5 = Buffer.from('test');
```



**实例化Buffer：Buffer.from() & Buffer.alloc() & Buffer.allocUnsafe()**

![image-20201012113442113](/Users/bilibili/Library/Application Support/typora-user-images/image-20201012113442113.png)



**常用静态属性 & 方法：**

- Buffer.byteLength()
- Buffer.isBuffer()
- Buffer.concat(arrayBuffer[, totalLength])

![image-20201012114209705](/Users/bilibili/Library/Application Support/typora-user-images/image-20201012114209705.png)



**实例属性 & 方法：**

- buf.length
- buf.toString()
- buf.fill()
- buf.equals()
- buf.indexOf()
- buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

```js
/* buf.length() */
const buf1 = Buffer.from('This is a test!')
const buf2 = Buffer.from('这是个测试！')

console.log(buf1.length); // 打印字节数 ： 15
console.log(buf2.length); // 打印字节数 ： 18

const buf3 = Buffer.alloc(10)
buf3[0] = 2;
console.log(buf3.length); // 10

/* buf.toString() */
console.log(buf1.toString('base64')); // VGhpcyBpcyBhIHRlc3Qh

/* buf.fill(填什么, 从哪开始, 从哪结束) 填充*/
const buf4 = Buffer.allocUnsafe(10)
console.log(buf4);
console.log(buf4.fill(10, 2, 6)); // <Buffer 20 e0 0a 0a 0a 0a 00 00 78 e1>

/* buf.equals() 比较内容*/
const buf5 = Buffer.from('test');
const buf6 = Buffer.from('test');
const buf7 = Buffer.from('test!');
console.log(buf5.equals(buf6)); // true
console.log(buf5.equals(buf7)); // false
```



#### StringDecoder

解决乱码问题

```js
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

const buf = Buffer.from('中文字符串！');

for (let i = 0; i < buf.length; i += 5) {
    const b = Buffer.allocUnsafe(5);
    buf.copy(b, 0, i)
    console.log(b.toString());
    /*
        中�
        �字�
        ��串
        ！
    */
}

for (let i = 0; i < buf.length; i += 5) {
    const b = Buffer.allocUnsafe(5);
    buf.copy(b, 0, i)
    console.log(decoder.write(b));
    /*
        中
        文字
        符串
        ！
    */
}
```



### Events 事件触发器

http://nodejs.cn/api/events.html

`eventEmitter.on()` 用于注册监听器

`eventEmitter.once()` 用于注册最多可调用一次的监听器。 当事件被触发时，监听器会被注销，然后再调用。

`eventEmitter.emit()` 用于触发事件

`event.removeListener('事件', '函数')` 用于移除事件触发函数

`event.removeAllListener('事件')` 用于移除事件的所有函数（直接移除事件）

```js
const EventEmitter = require('events')
class CustomEvent extends EventEmitter {}

const ce = new CustomEvent();

ce.on('test', () => {
    console.log('this is a test!');
})

setInterval(() => {
    ce.emit('test')
}, 500)

// ********** 传参 ***********
ce.on('error', (err, time) => {
    console.log(`${time}::::: ${err}`); 
  	// 1603191111734::::: Error: oops!
})

ce.emit('error', new Error('oops!'), Date.now())

// *********** event.once ***********
ce.once('test', () => {
		console.log('event once!') // 只打印出来一次event once!
})

setInterval(() => {
    ce.emit('test')
}, 500)
```

```js
const EventEmitter = require('events')

class CustomEvent extends EventEmitter {}

function fn1() {
    console.log('fn1');
}

function fn2() {
    console.log('fn2');
}

const ce = new CustomEvent();

ce.on('test', fn1)
ce.on('test', fn2)

setInterval(() => {
    ce.emit('test')
}, 500)

setTimeout(() => {
    // ce.removeListener('test', fn2)
    ce.removeAllListeners('test')
}, 3000)
```



### fs 文件系统

> 用于与文件系统进行交互
>
> 使用：`const fs = require('fs')`
>
> 所有操作都有同步、回调 和 基于 promise 的形式（最好使用异步，在多线程并行的情况，不用排队等候返回结果）

```js
fs.readFile(path[, options], callback) 异步读取文件（存到内存）
fs.writeFile(file, data[, options], callback) 异步写入文件/覆盖文件
fs.stat(file, callback)  提供文件信息
fs.rename(oldPath, newPath, callback) 重命名文件名
fs.unlink(path, callback) 删除文件
fs.readdir(path[, options], callback) 读取文件目录
fs.rmdir(path[, potions], callback) 删除文件夹
fs.watch(filename[, options][, listener]) 监视文件变化
fs.createReadStream(path[, options]) 读取文件（边读边给）
fs.createWriteStream(path[, options]) 写入文件（边读边写）
配合 util.promisify 解决异步导致的回调地狱问题 【http://nodejs.cn/api/util.html#util_util_promisify_original】
```

```js
const fs = require('fs')

// ******************* fs.readFile() ********************
// 异步
fs.readFile('./31-readFiles.js', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
})

// 同步
const data = fs.readFileSync('./01-run.js', 'utf8')
console.log(data);

// ******************* fs.writeFile() ******************
fs.writeFile('./text', 'this is a test!', 'utf8', err => {
    if (err) throw err;
    console.log('success');
})

// ******************* fs.stat() ***********************
fs.stat('./33-stats.js', (err, stats) => {
    if (err) {
        console.log(err);
        return;
    }
  
  	console.log(stats.isFile()); // true
    console.log(stats.isDirectory()); // false

    console.log(stats);
    /*
        Stats {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4096,
            ino: 15249600,
            size: 248,
            blocks: 8,
            atimeMs: 1604288403482.8613,
            mtimeMs: 1604288400916.4797,
            ctimeMs: 1604288400916.4797,
            birthtimeMs: 1603263032643.657,
            atime: 2020-11-02T03:40:03.483Z,
            mtime: 2020-11-02T03:40:00.916Z,
            ctime: 2020-11-02T03:40:00.916Z,
            birthtime: 2020-10-21T06:50:32.644Z }
    */
})

// ***************** fs.unlink() ***************************
fs.unlink('./test.txt', err => {
    if (err) throw err;
    
    console.log('success');
})

// **************** fs.readdir() ***************************
const { dirname, basename, extname } = require('path')

fs.readdir('./', (err, files) => {
    if (err) throw err;

    console.log(files); 
  	/* ['01-run.js',
        '02-cusmod.js',
        '03-require.js',
        '04-cache.js',
        '05-main.js']*/
    console.log(dirname(files[0])); // 返回 path 的目录名
    console.log(basename(files[0])); // 返回path的最后一部分
    console.log(extname(files[0])); // 返回文件扩展名
})

// ************ fs.rmdir() ********************************
fs.rmdir('test', err => {})

// ************ fs.watch() *********************************
// 监视文件变化，做本地文件构建
fs.watch('./', {
  	persistent: true, // 如果文件已正被监视，进程是否继续运行
  	encoding: 'utf8', // 指定用于传给监视器的文件名的字符编码
    recursive: true // 是否递归监控子文件夹
}, (eventType, filename) => {
    console.log(eventType, filename);
})

// ************* fs.readStream() *************************
const rs = fs.createReadStream('./40-readStream.js')
rs.pipe(process.stdout)

// ************** fs.writeStream() ***********************
const fs = require('fs')
const ws = fs.createWriteStream('./text.txt')

const tid = setInterval(() => {
    const num = parseInt(Math.random() * 10)
    if (num < 9) {
        ws.write(num + '')
    } else {
        clearInterval(tid); // 清除延时器
        ws.end();
    }
}, 200)

ws.on('finish', () => {
    console.log('done!');
})

// **************** promisify() *************************
const promisify = require('util').promisify
const read = promisify(fs.readFile)

// read('./42-promisify.js').then(data => {
//     console.log('data:::', data.toString());
// }).catch(err => {
//     console.log('err:::::', err);
// })

async function test() {
    try{
        const content = await read('./42-promisify.js');
        console.log(content.toString());
    }
    catch(err) {
        console.log(err);
    }
}
test();
```



## 建立项目

### 初始化项目

**1. `.gitignore`**

**上传代码时忽略文件**

- 匹配模式前 `/` 代表项目根目录
- 匹配模式最后 `/` 代表目录
- 匹配模式前 `!` 代表取反
- `*` 代表任意字符
- `?` 匹配一个字符
- `**` 匹配多级目录



**2. `.editorconfig`**

https://editorconfig.org/

![image-20201102174943281](/Users/bilibili/Library/Application Support/typora-user-images/image-20201102174943281.png)



**3. ` eslintrc.js`**



4.**`npm init` 生成 `package.json` 文件**

`npm i chalk` 美化





## 搭建http服务器

http://nodejs.cn/learn/build-an-http-server

```js
const http = require('http')
const chalk = require('chalk')
const config = require('./config/defaultConfig')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain') // 文本
  res.write('http~')
  res.end('HELLO WORLD!\n')
})

server.listen(port, () => {
  const addr = `http://${config.hostname}:${config.port}`
  console.info(`Server started at ${chalk.green(addr)}`)
})
```

```js
// defaultConfig.js
module.exports = {
    hostname: '127.0.0.1',
    port: 9527,
    root: process.cwd()
}
```

https://handlebarsjs.com/



### compress

> 性能优化，减少静态资源的传输内容

- 配置需要压缩的文件类型

- `Accept-Encoding: gzip, deflate, ...`
- `Content-Encoding:gzip, deflate`



### range 范围请求

> 表示客户端向服务器请求时声明限制请求的字节范围
>
> 如果提供的请求范围不正确，可以有两种处理方式：1）返回416（错误编码）；2）返回200，返回所有内容给服务端

- `range: bytes=[start]-[end]`
- `Accept-Raneges: bytes`
- `Content-Range: bytes start-end/total`



### 缓存header

![image-20201106175708413](/Users/bilibili/Library/Application Support/typora-user-images/image-20201106175708413.png)

- 判断本地是否失效
  - Expires（返回绝对时间，现在几乎不用）
  - Cache-Control（返回相对上次请求的时间）
- 服务器校验结果
  - if-Modified-Since / Last-Modified
  - if-None-Match / ETag



### cli

commander

yargs https://www.npmjs.com/package/yargs



### 版本号

- `x.y.z` 只安装当前版本
- `1.2.*` & `~1.2.0` 自动完成bug修复升级
- `2.x` & `^2.0.0` 自动完成 `y` 位 `feature` 升级
- `*` 大版本自动升级（可能出现兼容问题）



## 本地构建

### gulp

 https://www.gulpjs.com.cn/docs/api/concepts/

#### globs

```
- * 匹配任意个字符
- ? 匹配一个字符
- [...] 匹配范围内字符
- !(pattern1|pattern2) 匹配取反
- ?(pattern1|pattern2) 匹配 0 或 1 个
- +(pattern1|pattern2) 匹配 1 或 多个
- *(a|b|c) 匹配任意个
- @(pattern|pat*\pat?erN) 匹配特定的一个
- ** 任意层级匹配
```









## koa

https://koa.bootcss.com/#application【官网】

https://jspang.com/detailed?id=34【jspang】

https://chenshenhai.github.io/koa2-note/【blog】

### 环境搭建

1. 安装nodejs（版本高于 v7.6）

```
【关于升级node版本】
1. 下载新的安装包重新安装，覆盖原来的安装位置
查找安装位置： where node
2. mac更新方法
sudo npm install -g n
sudo n stable
```

2. 建立文件夹

```
cd code
ls // 当前文件夹目录
mkdir koa2 // 创建koa2文件夹
cd koa2

npm init -y // 初始化package.json文件
npm install --save koa
```

### async & await

> es6 语法，解决 es5 产生的回调地狱的问题
>
> async 声明一个方法是异步的，返回一个 Promise
>
> await 等待异步方法执行完成，等待一个表达式（可以是 Promise 也可以是普通方法

```
通俗示例
洗菜做饭 =》 坐下吃饭 =》 收拾桌子
// es5
function() {
	// 洗菜做饭
	function() {
		// 坐下吃饭
		function() {
			// 收拾桌子
		}
	}
}
```

```js
// es6
let status = 1;

function step1(resolve, reject) {
    console.log('1-洗菜做饭');
    if(status===1) {
        resolve('1-洗菜做饭完成')
    } else {
        reject('1-洗菜做饭失败')
    }
}

function step2(resolve, reject) {
    console.log('2-坐下吃饭');
    if(status===1) {
        resolve('2-坐下吃饭完成')
    } else {
        reject('2-坐下吃饭失败')
    }
}

function step3(resolve, reject) {
    console.log('3-滚去洗碗');
    if(status===1) {
        resolve('3-滚去洗碗完成')
    } else {
        reject('3-滚去洗碗失败')
    }
}


// promise 解决回调地狱
new Promise(step1)
    .then(function(val) {
        console.log(val);
        return new Promise(step2)
    })
    .then(function(val) {
        console.log(val);
        return new Promise(step3)
    })
    .then(function(val) {
        console.log(val);
    })
```

```js
// async & await
function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

async function test() {
    const v = await takeLongTime();
    console.log(v);
}

test();
```



> init

```js
const Koa = require('koa')
const app = new Koa()

// ctx koa对象
app.use(async(ctx) => {
    ctx.body = 'Hello World';
})

app.listen(3000)
console.log('app is starting at 3000!');
```

### application 应用

#### app.listen()

> 语法糖

```js
const Koa = require('koa');
const app = new Koa();

app.listen(3000);
// ----> 语法糖
const http = require('http');
http.createServer(app.callback()).listen(3000);
```



### content 上下文

> 具体方法和访问器
> https://koa.bootcss.com/#context

```js
ctx
ctx.req // node 的 request 对象
ctx.res // node 的 response 对象，不可改
ctx.request // koa 的 request 对象
ctx.response // koa 的 response 对象
ctx.cookies.get(name, [options])
ctx.method // 获得请求类型
```



**ctx.request和ctx.req的区别**

- ctx.request:是Koa2中context经过封装的请求对象，它用起来更直观和简单。
- ctx.req:是context提供的node.js原生HTTP请求对象。这个虽然不那么直观，但是可以得到更多的内容，适合我们深度编程。



#### get 请求

> 获得get请求的方式
>
> 1. 从 request 中获得
> 2. 从上下文中获得
>
> 获得的格式： query（对象）和 querystring（字符串）

```js
const Koa = require('koa')
const app = new Koa();

app.use(async ctx => {
    let url = ctx.url;

    // 从request中获取get请求
    let request = ctx.request;
    let req_query = request.query;
    let req_queryString = request.querystring;

    // 从上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_queryString = ctx.querystring;

    ctx.body = {
        ctx,
        url,
        req_query,
        req_queryString,
        ctx_query,
        ctx_queryString
    }
})

app.listen(3000, () => {
    console.log('[demo] server is starting at port 3000');
})

// http://127.0.0.1:3000/?user=jspang&age=18
```

![image-20201110160008050](/Users/bilibili/Library/Application Support/typora-user-images/image-20201110160008050.png)



#### post 请求

> 获取 post 请求的步骤：
>
> 1. 解析上下文ctx中的原生nodex.js对象req。
> 2. 将POST表单数据解析成querystring字符串
> 3. 将字符串转换成JSON格式

```js
const Koa = require('koa')
const app = new Koa();

// 监听请求返回的data，页面显示返回值
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postData = '';
            ctx.req.on('data', data => {
                postData += data
            })

            ctx.req.addListener('end', () => {
              	// parseQueryStr
                let parseData = parseQueryStr(postData)
                resolve(parseData)
                // resolve(postData)
            })
        }
        catch(err) {
            reject(err)
        }
    })
}

// 将字符串处理成对象的格式
function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData;
}

app.use(async ctx => {
    // 当请求get请求时，显示表单
    if (ctx.url === '/' && ctx.method === 'GET') {
        console.log('get~~~~~~~~~~~~');
        let html = `
            <h1>Koa2 request post demo</h1>
            <form method="POST"  action="/">
                <p>userName</p>
                <input name="userName" /> <br/>
                <p>age</p>
                <input name="age" /> <br/>
                <p>webSite</p>
                <input name='webSite' /><br/>
                <button type="submit">submit</button>
            </form>
        `
        ctx.body = html;
    }
  	// 当post请求时，显示传参
    else if (ctx.url === '/' && ctx.method === 'POST') {
      	// parsePostData函数处理传参
        let postData = await parsePostData(ctx);
        ctx.body = postData;
    }
    else {
        ctx.body = `<h1>404!</h1>`
    }
})

app.listen(3000, () => {
    console.log('demo run at port 3000');
})
```



### koa-bodyparser 中间件

https://github.com/koajs/bodyparser

> 作用：把koa2上下文的formData数据解析到ctx.request.body中
>
> 安装：`npm i --save Koa-bodyparser@3`
>
> 引入：`const bodyParser = require('koa-bodyparser')`
>
> 使用：`app.use(bodyParser())`
>
> **直接可以用 ctx.request.body 获取post请求参数，中间件自动解析**

```js
if (ctx.url === '/' && ctx.method === 'POST') {
  	ctx.body = ctx.request.body;
}
```



### 路由

**原生路由**

用 `ctx.request.url` 获取地址栏路径





### ejs

【官方文档】https://github.com/mde/ejs

【在线模版构建】https://ionicabizau.github.io/ejs-playground/ 

**安装**

```js
npm install --save ejs
```

**功能**

- 声明（包裹js语句） `<% %>`

- 转译（包裹页面需要显示的内容） `<%= %>





### 静态资源中间件 koa-static

