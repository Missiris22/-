# 重学 vue

***
## 尤大演讲


`
相关源码文件（结合视频参考用）
视频笔记https://vue-course-doc.vercel.app/#_2-%E5%93%8D%E5%BA%94%E6%80%A7

订阅者模式 src/core/observer/index.js


### dependency tracking 依赖跟踪

- `Dep` class with two methods:  `depend` and `notify`
    - `depend`: the current code that is executing depends on this dependency.
    - `notify`: means this dependency has changed. So any previous expressions, computations, functions that have previously depended on this step should be re-executed, they should be notified.

    - We need to find a way to associate a pieces of a funcition or a piece of expression or computation, I would call this associated computation to dependency(这种计算关系叫做依赖). And this computation should probably be considered something like a subscriber(订阅者模式) of this dependency. That is how the dependency class words.

- `autorun` function that takes an **updater function**. Inside the updater function, you can depend on an instance of `Dep` by calling `dep.depend()`. Later, you can trigger the updater funciton to run again by calling `dep.notify()`

```js
// 2020/vue/dependency-tracking.html

const dep = new Dep()

autorun(() => {
    dep.depend() // 将这个函数和依赖（Dep）绑定在一起，只要调用 dep.notify()，dep.depend() 也会相应被调用
    console.log('update');
})

dep.notify();

```

### plugins 插件

> 编写插件

```js
function (Vue, options) {
    // ... plugin code
}

Vue.mixin(options) // 本质上是可以复用的代码片段

$options
```

***


## 过滤器
https://cn.vuejs.org/v2/guide/filters.html
【saber】/Users/bilibili/Desktop/bilibili/saber/src/page/comments/pgc/manage.vue

## 插槽
将 slot 作为承载分发内容的出口


## 插件
> 通常用来为 Vue 添加全局功能

> 在 `new Vue()` 启动之前，通过全局方法 `Vue.use()` 使用插件

> 可以传入一个可选的选项对象

### Vue.use做了什么
https://segmentfault.com/a/1190000016256277
注入 Vue.js 插件

如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，会被作为 `install` 方法。`install` 方法调用时，会将 `Vue` 作为参数传入

使用 `vue.use()` 注册插件之后可以全局使用


```js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router); // 可以在所有的vue文件中使用路由
```

**源码**

```js
/* @flow 

flow（js代码的静态类型检查工具）在编译期对js代码做类型检查，缩短调试时间，减少因类型错误引起的bug

js是解释执行语言，运行时才检查变量的类型，flow可以提前类型检查的时间

*/ 


import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {

    // 判断插件是否为 函数 或者 对象
    Vue.use = function (plugin: Function | Object) {
        const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
        // 判断 Vue 是否已经注册过这个插件，已经注册则 跳出方法
        if (installedPlugins.indexOf(plugin) > -1) {
            return this
        }

        // 获取 其他 参数 additional parameters
        const args = toArray(arguments, 1)
        args.unshift(this)
        // 判断插件是否有install方法，如果有就执行install方法，没有就把plugin当作install执行
        if (typeof plugin.install === 'function') {
            plugin.install.apply(plugin, args) // install方法内的this指向plugin
        }
        else if (typeof plugin === 'function') {
            plugin.apply(null, args) // plugin内的this指向null
        }

        // 告知 vue 已经注册过 该插件，保证每个插件只注册一次
        installedPlugins.push(plugin)
        return this
    }
}
```

```js
// toArray
export function toArray (list: any, start?: number): Array<any> { // list.length: 3: [1,2,4]
    start = start || 0 // start 1
    let i = list.length - start // i: 2
    const ret: Array<any> = new Array(i) // ret: []
    while (i--) { // i: 2 // 1
        ret[i] = list[i + start] // ret[1] = list[2] = 4 // ret[0] = list[1] = 2
    }
    return ret // [2,4]
}
```
