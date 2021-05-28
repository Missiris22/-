//  --- 常规函数 ---- 
// var people = {
//     Name: "海洋饼干",
//     getName : function(){
//         console.log(this.Name); // this: window
//     }
// };
// var bar = people.getName;

// bar();    // undefined 调用环境 window

// people.getName(); // "海洋饼干" 调用环境 people


// ---- 箭头函数：不用函数包裹 ----
// var people = {
//     Name: "海洋饼干",
//     getName : () => {
//         console.log(this, this.Name); // this: window
//     }
// };
// var bar = people.getName;

// bar();    // undefined



// ---- 箭头函数：函数包裹形成函数作用域 -----
// var people = {
//     Name: "海洋饼干",
//     getName : function() {
//         return () => {
//             console.log(this, this.Name); // this: people
//         }
//     }
// };
// var bar = people.getName();

// bar();    // "海洋饼干"