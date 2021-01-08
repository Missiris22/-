# 4. 渲染函数

## Render Function
> A function that returns Virtual DOM

```js
// HTML
<script type="text/x-template" id="anchored-heading-template">
    <h1 v-if="level === 1">
        <slot></slot>
    </h1>
    <h2 v-else-if="level === 2">
        <slot></slot>
    </h2>
    <h3 v-else-if="level === 3">
        <slot></slot>
    </h3>
    <h4 v-else-if="level === 4">
        <slot></slot>
    </h4>
</script>

// Javascript
Vue.component('anchored-heading', {
    template: '#anchored-heading-template',
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})
```

```js
// 使用render函数
// HTML
Vue.component('anchored-heading', {
    render: function (createElement) {
        return createElement(
            'h' + this.level,   // tag name 标签名称
            this.$slots.default // 子组件中的阵列
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})
```
```js
// HTML
<script type="text/x-template" id="anchored-heading-template">
    <h1 v-if="level === 1">
        <slot></slot>
    </h1>
    <h2 v-else-if="level === 2">
        <slot></slot>
    </h2>
    <h3 v-else-if="level === 3">
        <slot></slot>
    </h3>
    <h4 v-else-if="level === 4">
        <slot></slot>
    </h4>
</script>

// Javascript
Vue.component('anchored-heading', {
    template: '#anchored-heading-template',
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})
```

```js
// 使用render函数
// HTML
Vue.component('anchored-heading', {
    render: function (createElement) {
        return createElement(
            'h' + this.level,   // tag name 标签名称
            this.$slots.default // 子组件中的阵列
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})
```

**Initial Render**

Template

- (compiled into) Render Function

- (returns) Virtual DOM

- (generates) Actual DOM

Template -> [ Compiler ] -> Render Function

**Subsequent Updates**

Render Function

- (returns) new Virtual DOM

- (diffed against Old Virtual DOM) DOM Updates

- (applied to) Actual DOM


## Actual DOM & Virtual DOM

|     |Actual DOM|Virtual DOM
|:---:|:---|:---:|
|创建DOM|`document.createElement('div')`|`vm.$createElement('div')`
|控制台打印|"[object HTMLDivElement]"|{ tag: 'div', data: { attrs: {}, ... }, children: [] }
|性能能耗|Browser Native Object (expensive)|Plain JavaScript Object (cheap)
|实质|通过浏览器引擎创建真实DOM。浏览器打印包含很多节点|虚拟DOM是轻量的js数据，用来表示真实DOM在特定时间的外观，返回一个虚拟节点
|差异|
|资源消耗问题|非常消耗资源|纯js对象
|执行效率|修改时一般调用`innerHTML`方法，浏览器会把旧的节点移除再创建新节点|修改一个对象属性再把虚拟dom渲染到真实dom上|

> 很多人误解虚拟DOM比真实DOM速度快，其实虚拟DOM只是把DOM变更的逻辑提取出来，使用js计算差异，减少了实际操作DOM的次数，只在最后一次操作真实DOM，所以如果有复杂的DOM变更操作，虚拟DOM会更快一些。


**Advantage of using Virtual DOM**

> (Essentially) A lightweight JavaScript data format to represent what the actual DOM should look like at a given point in time 虚拟DOM是轻量的js数据，用来表示真实DOM在特定时间的外观

> Decouples rendering logic from the actual DOM - enables rendering capabilities in non-browser environments, e.g. server-side and native mobile rendering. 把渲染逻辑从真实DOM中分离 - 渲染不再需要触碰真实dom，无浏览器环境的渲染得以实现


[Vue原理之虚拟DOM和render函数]https://juejin.cn/post/6844903843206004743

## 前情提要

### DOM节点树

每一个元素就是一个节点。在vue中，可以通过修改模版或者渲染函数自动更新节点。

```html
<h1>{{blogTitle}}</h1>

<script type="javascript">
render: function (createElement) {
    return createElement('h1', this.blogTitle)
}
</script>
```

## 虚拟DOM

Vue编译器在编译模版之后，会把模版编译成一个渲染函数。调用函数时渲染并返回一个虚拟DOM树。


![](https://raw.githubusercontent.com/Missiris22/PictureHouse/master/%E8%99%9A%E6%8B%9Fdom%E6%B8%B2%E6%9F%93%E5%8E%9F%E7%90%86.png)


### <font color="F56C6C">Vue的响应式</font>

Vue支持我们通过data参数传递一个js对象作为组件数据，然后Vue将遍历此对象属性，使用 `Object.defineProperty` 设置对象，通过存取器函数（getter & setter）追踪属性变更。创建 `watcher` 层，在组件渲染的过程中，把属性记录为依赖，之后当依赖项的 `setter` 被调用时，会通知 `watcher` 重新计算，从而更新关联组件。


### <font color="F56C6C">虚拟DOM如何转成真实DOM？</font>

[Vue原理解析之Virtual DOM](https://segmentfault.com/a/1190000008291645)
![](https://raw.githubusercontent.com/Missiris22/PictureHouse/master/%E6%A8%A1%E7%89%88%E6%B8%B2%E6%9F%93%E7%9C%9F%E5%AE%9EDOM.png)


### <font color="F56C6C">数据发生变化时，虚拟DOM（VDOM）发生什么变化？</font>

我们有了VDOM之后，会交给一个Patch函数，负责把VDOM施加到真实DOM上。在VDOM第一次渲染成功DOM树之后，数据发生变化，Vue的响应式系统侦测到依赖的数据来源有变动，这时需要根据数据重新渲染VDOM。当重新进行渲染之后，会生成一个新的树，将新的树与旧的树进行对比，就可以最终得出应施加到真实DOM上的改动。最后通过Patch函数施加改动。

**简单来说，在Vue的底层实现上，Vue将模版编译成DOM渲染函数，结合Vue自带的响应系统，在应该改变的时候，Vue能够只能的计算出需要重新渲染的组件，以最小代价实现到真实DOM上。**

