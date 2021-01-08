# 2.1 Simple Plugin

**总结：**
1. 插件中封装的代码实际上是想将其作为 vue实例的一个属性的，但是由于非Vue提供的api，所以在获得的时候需要使用 `this.$option.xx` 比较麻烦。
2. 使用插件封装全局的mixin，将安装一个 `created` 的钩子到组件中，钩子中将做一系列操作（获得自定义属性）。所有的 Vue实例都可以获得这个自定义属性。
3. 该自定义属性封装在插件的install函数中，当我们调用 `Vue.use()` 时，install会被执行，实际上是调用了这个 `install` 函数


Expected usage:

> 1. how to apply global funcitonality via a plugin
> 2. Inside a plugin, you basically can do everything by APIs which to use to achieve the end result
> 3. how to design yourself plugin: start with this desired API, which means how to use it, thinking from what results you want to achieve and how to design that it would be a good experience if we want other use it.

```js
// methods2: put rules in myMixin, so it can be used globally, every Vue instance can get this custom rules option
// Vue.mixin = {
//     created() {
//         if (this.$options.rules) {
//             // we can do something
//         }
//     }
// }

// method3: put mixin inside a plugin
// this install funcition will be invoked when we use Vue.use(RulesPlugin)
const myPlugin = {
    install() {
        Vue.mixin = {
            created() {
                if (this.$options.rules) {
                    // we can do something
                    Object.keys(this.$options.rules).forEach(key => {
                        const rule = this.$options.rules[key]
                        this.$watch(key, newValue => {
                            const result = rule.validate(newValue)
                            if (!result) {
                                console.log(rule.message)
                            }
                        })
                    })
                }
            }
        }
    }
}

Vue.use(myPlugin)

const vm = new Vue({
    data: { foo: 10 },

    // methods1: get rules!
    // created() {
    //     this.$options.rules
    // },

    // is not vue's api, so will not compile
    rules: {
        foo: {
            // validator function will be run every time foo changes, and if this validor failed, we'll log this message to console
            validate: value => value > 1,
            messsage: 'foo must be greater than one'
        }
    },
});

vm.foo = 0; // should log: 'foo must be greater than one'
```
