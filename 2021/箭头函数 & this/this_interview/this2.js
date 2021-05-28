function foo(arg){
    this.a = arg;
    return this
};

var a = foo(1);
// var b = foo(10);

console.log(a);
console.log(a.a);    // ?
// console.log(b);
// console.log(b.a);    // ?


/**

function foo(arg){
    this.a = arg;
    return this
};

var a = foo(1);
var b = foo(10);

console.log(a.a);    // 1
console.log(b.a);    // 10


foo(1) => this.a = 1, return window => a = window 

foo(10) => 
 
*/