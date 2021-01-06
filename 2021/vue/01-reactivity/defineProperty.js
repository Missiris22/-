// strict mode

const Object1 = {};

// Object.defineProperty(obj, prop, descriptor)
Object.defineProperty(Object1, 'a', {
    value: 32, // 与属性关联的js值（数字、对象、函数...）
    configurable: true, // 是否可删除
    writeable: true, // 是否可以用赋值运算符改变
    enumerable: true, // true:当且仅当在枚举响应对象的属性时显示此属性
    // get, // 用作属性的getter函数，或者 undefined 表示没有getter函数。
    // 当访问该属性时，并且将其this设置为访问该属性所通过的对系那个（由于继承，它可能不是在其上定义该属性的对象）。返回值将用作属性的值
    // set // 用作属性的setter函数，或者 undefined 表示没有setter函数
    // 分配属性后，将使用一个参数并this设置为通过其分配属性的对象来调用此函数
});


const bValue = 4343;
Object.defineProperty(Object1, 'b', {
    get() {
        return bValue;
    },
    set(newVal) {
        bValue = newVal;
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Object1, 'confict', {
    value: 121,
    get() {
        return bValue;
    },
    enumerable: true,
    configurable: true
});
// throws a TypeError: value appears
// TypeError: Invalid property descriptor.

Object1.a = 72;
// throws an error in strict mode

console.log(Object1);
// console.log(Object1.b);