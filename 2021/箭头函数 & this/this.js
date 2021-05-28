// 默认绑定
// 严格模式 false :: a() === undefined
// 非严格模式 true :: 浏览器 a() === window；node环境 a() === globalThis
function a() {
    "use strict"; // 这里是严格模式
    return this
}

// console.log(a() === globalThis);


// 隐式绑定
// function foo(){
//     console.log(this.a);
// }
// var obj = {
//     a : 10,
//     foo : foo
// }
// foo();                // undefined

// obj.foo();            // 10


// 显式绑定

// --- apply call -----
// function foo(a,b){
//     console.log(a+b);
// }
// foo.call(null,'海洋','饼干');        // 海洋饼干  这里this指向不重要就写null了
// foo.apply(null, ['海洋','饼干'] );     // 海洋饼干

// // ---- bind ----
// function fo(){
//     console.log(this.a);
// }
// var obj = { a : 10 };

// fo = fo.bind(obj);
// fo();    // 10


// ---- 处理隐式绑定 -----
// function foo(){
//     console.log(this.a);
// }
// var obj = {
//     a : 10,
//     foo : foo
// }
// foo.call(obj); // 10 call =》 绑定this，并执行foo函数


// new 绑定 =》 没有返回值，返回新对象
// function foo(){
//     this.a = 10;
// }
// foo();                    // window对象
// console.log(window.a);    // 10   默认绑定

// var obj = new foo();      // foo{ a : 10 }  创建的新对象的默认名为函数名
//                           // 然后等价于 foo { a : 10 };  var obj = foo;
// console.log(obj.a);       // 10    new绑定

// // new 绑定 =》 函数有返回值，则不返回新对象
// function foo(){
//     this.a = 10;
//     return new String("捣蛋鬼");
// }
// var obj = new foo();
// console.log(obj.a);       // undefined
// console.log(obj);         // "捣蛋鬼"


/**
 * this
 * https://segmentfault.com/a/1190000011194676
 * 
 * 1. js关键字之一，是对象自动生成的内部对象，只能在对象内部使用。随着函数的调用，值会有所不同
 * 
 * 2. this指向什么取决于他在哪里调用，而不是在哪里声明
 * 
 * 3. 绑定规则：
 *  
 *   - 默认绑定：
 *      严格模式 =》 this可以是任意值 =》 默认绑定undefined
 *      非严格模式 =》 this一定指向一个对象 =》默认绑定window / globalThis
 * 
 *   - 隐式绑定：
 *      取决于函数被调用的方式，取直接上下级
 * 
 *   - 显式绑定：
 *      call apply bind
 *      - call从第二个参数开始所有的参数都是 原函数的参数 `foo.call(obj); // 10 call =》 绑定this，并执行foo函数`
 *      - apply只接受两个参数，且第二个参数必须是数组，这个数组代表原函数的参数列表
 *      - bind只有一个函数，且不会立刻执行，只是将一个值绑定到函数的this上,并将绑定好的函数返回
 *      
 *   - new 绑定：
 *      
 *  
 *  ```
 *      new
 *          1. 创建一个新对象
 *          2. 把这个新对象的__proto__属性指向 原函数的prototype属性（继承原函数的原型）
 *          3. 把新对象绑定到这个函数的this上
 *          4. 如果这个函数没有返回其他对象，则返回新对象
 *  ```
 * 
 *  ** this 绑定 优先级 **
 *  
 *  ** new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定 **
 * 
 * 
 * 
 * 
 */