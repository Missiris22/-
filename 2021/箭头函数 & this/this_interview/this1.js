var x = 10;
var obj = {
    x: 20,
    f: function(){
        console.log(this.x);        // ?
        var foo = function(){ 
            console.log(1212, this.x);    
        }
        foo();                      // ?
    }
};
obj.f();


/**

var x = 10;
var obj = {
    x: 20,
    f: function(){
        console.log(this.x);        // 隐式绑定 =》f 的调用环境：obj =》 obj.x => 20
        var foo = function(){ 
            console.log(this.x);    
            }
        foo();                      // 默认绑定 =》 this：window =》 10
    }
};
obj.f();

*/