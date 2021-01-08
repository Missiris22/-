// import Vue from '../../../node_modules/vue/dist/vue.min.js'
const Vue = require('../../../node_modules/vue/dist/vue.min.js')

const RulesPlugin = {
    install () {
        Vue.mixin({
            created() {
                if (this.$options.rules) {
                    // we can do something
                    Object.keys(this.$options.rules).forEach(key => {
                        const rule = this.$options.rules[key]
                        this.$watch(key, val => {
                            const result = rule.validate(val)
                            if (!result) {
                                console.log(rule.message)
                            }
                        })
                    })
                }
            }
        })
    }
}
Vue.use(RulesPlugin);

const vm = new Vue({
    data: {
        foo: 1
    },
    rules: {
        foo: {
            validate: value => value > 1,
            message: 'foo should be greater than one!'
        }
    }
})

vm.foo = 0