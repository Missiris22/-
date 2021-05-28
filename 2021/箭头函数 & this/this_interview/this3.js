var x = 10;
var obj = {
    x: 20,
    f: function(){ console.log(this.x); }
};
var bar = obj.f;
var obj2 = {
    x: 30,
    f: obj.f
}
obj.f(); // obj 环境下 this =》20
bar(); // 全局环境下bar => 10
obj2.f(); // obj2 环境下 this =》 30