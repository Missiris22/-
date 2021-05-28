function foo(){
    return ()=>{
        console.log(this, this.a);
    }
}
foo.a = 10;

console.log(foo());
foo()(); // this 指向 window

// 1. 箭头函数关联父级作用域this

// var bar = foo();            // foo默认绑定
// bar();                      // undefined 哈哈，是不是有小伙伴想当然了

// var baz = foo.call(foo);    // foo 显性绑定
// baz();                      // 10 

// // 2. 箭头函数this不可修改
// // 这里我们使用上面的已经绑定了foo 的 baz
// var obj = {
//     a : 999
// }
// baz.call(obj);              // 10