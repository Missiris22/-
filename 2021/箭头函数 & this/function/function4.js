foo();
function foo() {
  console.log(1);
}
var foo = function() {
  console.log(666);
};
function foo() {
  console.log(3);
}


foo()



// 引擎解析
// var foo;

// function foo() {
//     console.log(1);
// }

// function foo() {
//     console.log(3);
// }

// foo(); // 3

// foo = function() {
//     console.log(2);
// };

// foo(); // 2
