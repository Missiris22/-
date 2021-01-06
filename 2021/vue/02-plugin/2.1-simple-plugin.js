import Vue from 'vue'

const RulesPlugin = {
    install (Vue) {
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

const vm = new Vue({
    data: {
        foo: 10
    },
    rulus: {
        foo: {
            validate: value => value > 1,
            message: 'foo should be greater than one!'
        }
    }
})

vm.foo = 0
RulesPlugin.install()