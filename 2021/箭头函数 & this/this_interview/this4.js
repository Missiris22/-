// function foo() {
//     getName = function () { console.log (1); };
//     return this;
// }
// foo.getName = function () { console.log(2);};
// foo.prototype.getName = function () { console.log(3);};
// var getName = function () { console.log(4);};
// function getName () { console.log(5);}
 
// foo.getName ();                // ?
// getName ();                    // ?
// foo().getName ();              // ?
// getName ();                    // ?
// new foo.getName ();            // ?
// new foo().getName ();          // ?
// new new foo().getName ();      // ?

function foo() {
    getName = function () { console.log (1); }; // getName：全局window上
    return this;
}
foo.getName = function () { console.log(2);}; // getName：foo上
foo.prototype.getName = function () { console.log(3);}; // foo的原型上，会通过new挂载到新对象上
var getName = function () { console.log(4);}; // getName：全局window上
function getName () { console.log(5);} // 由于函数声明提升最高，故被下面的覆盖

foo.getName ();                // 2
getName ();                    // 4 => 函数提升 5 会被 4 覆盖
foo().getName ();              // 1 => foo函数 完成两件事：1. 将window.getName设置为 1；2. 返回 window => 函数等价于 window.getName()
getName ();                    // 1 
new foo.getName ();            // 2 => new 对一个函数进行构造调用，即 foo.getName
new foo().getName ();          // 3 => new出来的 getName 是 挂载 foo原型上的 3
new new foo().getName ();      // 3 => 

// const obj = new foo(); // obj是一个函数名为foo的对象
// const obj1 = new obj.getName(); // obj1是一个函数名为obj.getName的对象