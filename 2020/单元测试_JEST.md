# 单元测试 JEST

https://lmiller1990.github.io/vue-testing-handbook/zh-CN/jest-mocking-modules.html

https://www.jianshu.com/p/49efb8c97347

[http://laibh.top/2019-08-19-%E5%89%8D%E7%AB%AF%E5%BF%85%E5%A4%87%E7%9A%84%E6%B5%8B%E8%AF%95%E5%AD%A6%E4%B9%A0.html](http://laibh.top/2019-08-19-前端必备的测试学习.html)



思考

通过编写单元测试

1. 每个文件只针对当前测试文件中的代码进行测试
   - 交互具体到触发的方法或者改变的变量，通过赋值 - 触发 - 断言变化 来判断进行测试，而不进行交互的测试



## JEST搭建环境

1. 安装node

2. 生成package.json文件  
   `npm init -y`

3. 安装jest框架  
   `npm install jest@24.8.0 -D`

4. 兼容ES6语法（配置.babelrc）
   如果报错关于es6，首先筛查是不是没有配置babelrc的文件

1） `npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 -D`

> 其实在Jest里有一个babel-jest组件，我们在使用yarn test的时候，它先去检测开发环境中是否安装了babel，也就是查看有没有babel-core，如果有bable-core就会去查看.babelrc配置文件，根据配置文件进行转换，转换完成，再进行测试

2）配置babel（.babelrc）

```js
{
    "presets":[
        [
                "@babel/preset-env",{
                "targets":{
                    "node":"current"
                }
            }
        ]
    ]
}
```


5. 配置实时监听 - 测试文件变化将自动进行测试

```js
"scripts": {
    "test": "jest --watchAll"
},
```

6. 配置代码覆盖率测试报文
   **code coverage 代码测试覆盖率**

```js
"jest" : {
    "coverageDirectory" : "coverage",   //打开测试覆盖率选项
    "collectCoverageFrom": ["**/*.{js,vue}", "!**/node_modules/**"] // 需要收集测试覆盖率信息的文件
}
```

6. 配置运行的测试文件

```js
// jest.config.js
testMatch: ['**/test/**/*.spec.js']
```



## 编写测试文件

> 文件名称： `xx.test.js` 或者 `xx.spec.js`

**方法：test expect**

```js
    test('name', () => {
        // 测试内容
        expect(value.toBe()) // 匹配器
    }, timeout)
```



## jest初始化设置

![jest初始化设置](https://git.bilibili.co/v_shiaiyu/markdownpic/blob/master/lib/Snipaste_2020-05-27_20-31-35.png)

`npx jest --init`
初始化之后生成 `jest.config.js` 文件



## 匹配器matcher

https://jestjs.io/docs/en/expect

- toBe()  `严格相等===；对象由于引用地址不同，测试结果为fail`
- toEqual()  `内容相等==`
- toBeNull()  `只匹配null，不匹配undefined`
- toBeUndefined()   `匹配undefined`
- toBeDefined() `只要定义过都可以匹配成功`
- toBeTruthy()  `判断真假 0 null undefined`
- toBeFalsy()
- toBeGreaterThan() `数字比较`
- toBeLessThan()
- toBeGreaterThanOrEqual()
- toBeLessThanOrEqual()
- toBeCloseTo() `可以自动消除js浮点精度错误的匹配器 0.1+0.2`
- toMatch() `字符串包含/符合正则`
- toContain()   `数组匹配器(array/set)`
- toMatchObject({属性}) `匹配对象中的属性`
- toThrow() `对异常进行处理 1. 是否抛出异常 2. 异常是否和字符串对应`
- not  `取反`

```js
test('toThrow匹配器',()=>{
    expect(throwNewErrorFunc).toThrow()
})
test('toThrow匹配器:不要报错',()=>{
    expect(throwNewErrorFunc).not.toThrow()
})
test('toThrow匹配器',()=>{
    expect(throwNewErrorFunc).toThrow('this is a new error')
})
```

```js
// 判断某个dom存在
expect(table.html()).toContain('图片');
```



## 异步测试

安装 axios
`npm install axios@0.19.0 --save`
实际接口测试时，使用`jest.mock('axios')`



### 回调函数

**使用 done 方法，保证回调已经完成**

```js
// js
export const fetchData1 = (fn) => {
    axios.get('http://www.dell-lee.com/react/api/demo.json').then(res => {
        fn(res.data);
    })
}
// test.js
test('fetchData 测试',(done)=>{
   fetchData((data)=>{
       expect(data).toEqual({
           success: true
       })
       done() // done函数必须被调用
   })
})
```



### 直接返回 promise

**需要使用return才能测试成功**

```js
// js
export const fetchData3 = () => {
    return axios.get('http://www.dell-lee.com/react/api/demo.json');
}
// test.js
test('fetchTwoData 测试', () => {
    return fetchTwoData().then(res => {
        expect(res.data).toEqual({
            success: true
        })
    })
})
test('fetchData3: 返回结果为 { success: true }', () => {
    return expect(fetchData3()).resolves.toMatchObject({
        data: {
            success: true
        }
    })
})
```



#### 不存在接口：返回404

**如果单纯使用catch（只有在报错的时候才会执行），当代码正确的时候将绕过该测试，jest将默认通过该用例**

```js
test('FetchThreeData 测试', ()=>{
    expect.assertions(1)  // 断言，必须执行一次expect
    return fetchThreeData().catch((e)=>{
      expect(e.toString().indexOf('404')> -1).toBe(true)
    })
})
test('fetchData2: 测试接口404', () => {
   return expect(fetchData2()).rejects.toThrow();
})
test('fetchData2: 测试接口404', async () => {
    expect.assertions(1);
    try {
        await fetchData2();
    }
    catch(e) {
        expect(e.toString()).toEqual('Error: Request failed with status code 404');
    }
})
```

### async...await...

```js
test('FetchFourData 测试', async()=>{
    const response  = await fetchFourData()
    expect(response.data).toEqual({
        success : true
    })
})
test('fetchData3: 返回结果为 { success: true }', async () => {
    await expect(fetchData3()).resolves.toMatchObject({
        data: {
            success: true
        }
    })
})
```



#### example

```js
export default {
  get: () => Promise.resolve({ data: 'value' })
}
```

```js
<template>
  <button @click="fetchResults">{{ value }}</button>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        value: null
      }
    },

    methods: {
      async fetchResults() {
        const response = await axios.get('mock/service')
        this.value = response.data
      }
    }
  }
</script>
```

```js
// 1
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo'
jest.mock('axios', () => ({
  get: Promise.resolve('value')
}))

it('fetches async when a button is clicked', done => {
  const wrapper = shallowMount(Foo)
  wrapper.find('button').trigger('click')
  wrapper.vm.$nextTick(() => {
    expect(wrapper.text()).toBe('value')
    done()
  })
})

// 2. 依赖额外包 flush-promises
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Foo from './Foo'
jest.mock('axios')

it('fetches async when a button is clicked', async () => {
  const wrapper = shallowMount(Foo)
  wrapper.find('button').trigger('click')
  await flushPromises()
  expect(wrapper.text()).toBe('value')
})
```





### mockTime

https://jestjs.io/docs/en/timer-mocks

1. 使用假的计时器

   ```js
   // 为了不因为计时器的累加而对代码产生影响，将mock代码放到钩子函数中
   beforeEach(() => {
       jest.useFakeTimers(); // 1. 使用假的计时器
   })
   ```

2. 跳过等待时间

   ```js
   // 方法1. 跳过所有计时器的等待时间
   jest.runAllTimers();
   // 方法2. 只运行队列中的timer，而不运行还未被创建的timer
   jest.runOnlyPendingTimers(); 
   // ！！方法3. 推荐用法：快进
   jest.advanceTimersByTime(3000); // 快进3s
   ```

3. 断言

   ```js
   expect(fn).toHaveBeenCalledTimes(1)
   ```

注意：

- 延时不能超过5s（默认配置）

  ```js
  Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout
  ```



## 四个钩子

- beforeAll()
- afterAll()
- beforeEach()
- afterEach()
  `参考 newDabaojian.test.js`

+ 钩子函数在父级分组可作用于子集，类似继承
+ 钩子函数统计分组作用域互不干扰
+ 先执行外部的钩子函数，再执行内部的钩子函数

> 总结钩子函数的执行顺序：
> beforeAll(外) > beforeAll(内) > beforeEach(外) > beforeEach(内) > afterEach > afterAll
> 在describe中，未写进钩子函数中的代码，会优先被执行，在按顺序执行钩子函数
> ！！准备型的代码一定要放到钩子函数中



## mock函数 jest.fn()

### mock函数的作用

1. 捕获函数的调用和返回结果，以及this和调用顺序
2. 可以自由设置返回结果
3. 改变内部函数的实现



### mock函数的方法

0. mock

```js
const func = jest.mock();
const func = jest.mock(() => {
    return 'abc';
})

// 接口
import axios from 'axios';
jest.mock('axios');
```


1. 模拟返回值

```js
func.mockReturnValue() // 模拟返回值
func.mockReturnValueOnce() // 模拟一次返回值
func.mockReturnValueOnce('Dell').mockReturnValueOnce('Lily'); // ”链式写法“

// mockImplementation & mockImplementationOnce 可以写内部逻辑
func.mockImplementationOnce(() => {
    console.log('Dell');
    return 'Dell'
});

// 返回this
func.mockImplementationOnce(() => {
    return this;
});
func.mockReturnThis();
```

2. 模拟返回值
   ajax请求的时候，模拟接口可以节约消耗，也可以模拟接口返回值。不对接口的实际返回值进行测试

```js
axios.get.mockResolvedValueOnce({ data: 'hello' })
axios.get.mockResolvedValueOnce({ data: 'world' })
await getData().then(data => {
    expect(data).toBe('hello');
})
await getData().then(data => {
    expect(data).toBe('world');
})
```

3. 测试是否被调用

```js
// 测试是否被调用
expect(func).toHaveBeenCalled()
expect(func).toBeCalled()
```


4. 测试函数调用时的传参

```js
expect(func).toBeCalledWith('abc')
expect(func).toHaveBeenLastCalledWith(arg1, arg2) // 函数最后一次调用
expect(func.mock.calls[0]).toEqual(['abc'])
expect(func.mock.calls).toContainEqual([arg1, arg2]) // 函数至少被这个参数调用一次
```


5. 测试函数调用的次数

```js
expect(func.mock.calls.length).toBeGreaterThan(0)
expect(func.mock.calls.length).toBe(2)
expect(fn).toHaveBeenCalledTimes(1)
```


6. 测试函数的返回值

```js
expect(func.mock.results[0].value).toBe('Dell')
```



### mock属性

jest.fn() 模拟的函数，有个mock的属性

```js
const func = jest.fn();
func.mock // 
    { calls: [ [] ], // 调用的次数，以及调用时传递的参数
      instances: [ mockConstructor {} ], // 调用的次数，以及调用时this的指向；一个数组，包含实例化之后所有的对象实例
      invocationCallOrder: [ 1 ], // 函数的执行顺序
      results: [ { type: 'return', value: undefined } ] } // 调用的次数，以及调用返回的结果
```



### mock的高级用法

#### 1. `__mocks__`文件夹

jest.mock模拟的路径会自动到`__mocks__`文件夹下寻找目标文件

#### 2. jest.requireActual

可在配置jest.mock的同时，配置非异步函数从真正的文件中取用

```js
jest.mock('./mock');
// fetchData 从 __mock__ 文件夹下的 mock 文件中取用
import { fetchData } from './mock';
// getNumber 从当前文件夹下的 mock 文件中取用
const { getNumber } = jest.requireActual('./mock');

test('fetchData 测试', () => {
    return fetchData().then(data => {
      	// eval：执行一个字符串
        expect(eval(data)).toEqual('abc')
    })
})

test('getNumber 测试', () => {
    expect(getNumber()).toEqual(123);
})
```



### ES6 中 class 类的测试

> 对class中类的测试：实例化 =》执行实例方法
>
> jest.mock 发现 util 是一个类，会自动把类的构造函数和方法变成 jest.fn()

```js
// util1.js
class Util {
    a(a, b) {
        return `${a}${b}`;
        // 异常复杂...
    }
    b() {
        // 异常复杂...
    }
}

export default Util;
```

```js
// util1.test.js
// 对util1中方法内部的测试 —— 测试方法内部逻辑
import Util from './util';

let util = null;
beforeAll(() => {
    util = new Util();
})

test('测试方法 a', () => {
    expect(util.a(1, 2)).toBe('12')
})
```

```js
// util2.js
import Util from './util'

const demoFunction = (a, b) => {
    const util = new Util();
    util.a(a);
    util.b(b);
}

export default demoFunction;
```

```js
// util2.test.js
// 只需要测试方法已经被执行，而不需要管方法的内部逻辑。所以可以mock一个简单的虚拟函数，提升性能
// jest.mock 发现 util 是一个类，会自动把类的构造函数和方法变成 jest.fn()
/**
 * const Util = jest.fn();
 * Util.init = jest.fn();
 * Util.a = jest.fn();
 * Util.b = jest.fn();
 * 
 * 可追溯jest.fn()的执行情况
 */
jest.mock('./util');
import Util from './util';
import demoFunction from './util2'

test('测试 demoFunction', () => {
    demoFunction(); // 我们只需要知道这个类被执行，所以不需要执行复杂函数
    expect(Util).toHaveBeenCalled();
  	// instances: 一个数组，其中包含使用new从这个模拟函数实例化的所有对象实例。
    // instances: [ Util { init: [Function], a: [Function], b: [Function] } ]
    expect(Util.mock.instances[0].a).toHaveBeenCalled();
    expect(Util.mock.instances[0].b).toHaveBeenCalled();
})
```

**__mocks__/util.js 中自定义模拟函数**（推荐）

```js
// __mocks__/util.js
// 出现 jest.mock() 之后自动寻找__mocks__文件夹下的对应文件，可以在文件中自定义模拟函数
// 自定义封装
const Util = jest.fn(() => {
    console.log('constructor')
});
Util.prototype.a = jest.fn(() => {
    console.log('a')
});
Util.prototype.b = jest.fn(() => {
    console.log('b')
});

export default Util;
```

**jest.mock(addr, fn)自定义模拟函数 **

```js
jest.mock('./util', () => {
    const Util = jest.fn(() => {
        console.log('constructor//')
    });
    Util.prototype.a = jest.fn(() => {
        console.log('a//')
    });
    Util.prototype.b = jest.fn(() => {
        console.log('b//')
    });
    return Util;
});
import Util from './util';
import demoFunction from './util2'

test('测试 demoFunction', () => {
    demoFunction(); // 我们只需要知道这个类被执行，所以不需要执行复杂函数
    expect(Util).toHaveBeenCalled();
    // instances: [ Util { init: [Function], a: [Function], b: [Function] } ]
    expect(Util.mock.instances[0].a).toHaveBeenCalled();
    expect(Util.mock.instances[0].b).toHaveBeenCalled();
})
```

> **单元测试&集成测试**
>
> 单元测试：一个测试文件只测试一个文件，测试其功能或者函数内部逻辑
>
> 集成测试：一个测试文件测试这个文件涉及到的所有文件和模块





## 快照测试

原理：第一次运行代码，生成并保存一次快照（代码中生成__snapshots文件夹）；第二次运行代码，生成第二个快照，并和第一次的快照进行对比。如果有不同会报错

使用：在测试时，提示该文件进行编辑，确认是否是需要的编辑

- 快捷键更新快照

  - u(update) 更新全部快照
  - i 交互式更新单个快照

- 动态数据：`toMatchInlineSnapshot` 配置 `expect.any()`

- 行内snapShot：快照被放到测试用例中

  > 需要下载 prettier 模块  `npm install prettier@1.18.2 --save`

```js
test('测试 generateConfig 函数', () => {
    expect(generateConfig()).toMatchSnapshot();
})

test("测试 generateAnotherConfig 函数：行内", () => {
  expect(generateAnotherConfig()).toMatchInlineSnapshot(
    {
      time: expect.any(Date) // time可以是任意Date
    },
    // 行内快照
    `
    Object {
      "port": 8080,
      "server": "http://localhost",
      "time": Any<Date>,
    }
  `
  );
})
```



## Jest中对测试用例进行分组

`describe()` 接受两个参数：分组名称，回调函数




## vm.$nextTick()

依赖dom更新结果的断言需要写在`vm.$nextTick()`resolve之后进行



### 在组件中测试vuex

[https://vue-test-utils.vuejs.org/zh/guides/#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E6%B5%8B%E8%AF%95-vuex](https://vue-test-utils.vuejs.org/zh/guides/#在组件中测试-vuex)



# 测试覆盖率

[https://vue-test-utils.vuejs.org/zh/guides/#%E7%94%A8-jest-%E6%B5%8B%E8%AF%95%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6](https://vue-test-utils.vuejs.org/zh/guides/#用-jest-测试单文件组件)

配置项： https://jestjs.io/docs/zh-Hans/configuration#collectcoverage-boolean

```js
// collectCoverage: true,
// 定义需要收集测试覆盖率信息的文件
collectCoverageFrom: [
  // '**/TodoList.vue',
  // '**/components/Header.vue',
  // '**/components/UndoList.vue',
  '**/*.vue',
  '!**/App.vue',
  '!**/node_modules/**'
]
// 测试报告形式
// coverageReporters: ['html', 'text-summary']
```

【遇到的坑】

没有根据配置的文件输出覆盖率信息

【解决】

- 换行书写测试覆盖率信息的文件
- 配置package.json，单独配置输出覆盖率文件的命令

```js
"test:cov": "vue-cli-service test:unit --coverage"
```



# BDD & TDD

## TDD (Test Driven Development) 测试驱动开发

**TDD开发流程（Red-Green Development)**

1. 编写测试用例
2. 运行用例，测试用例无法通过测试
3. 编写代码，试测试用例通过测试
4. 优化代码，完成开发
5. 重复上述步骤

**优势**

1. 长期减少回归bug
2. 代码质量更好（组织，可维护）
3. 测试覆盖率高
4. 错误测试代码不容易出现

**特点**

1. 先写测试再写代码
2. 一般结合单元测试使用，是白盒测试
3. 测试重点在代码（不适用耦合度高的代码测试）
4. 安全感低（不考虑组件间的协调工作）
5. 速度快（浅层渲染组件  <u>shallowRender</u>）



## BDD (Behavior Driven Development) 行为驱动开发

1. 先写代码再写测试
2. 一般结合集成测试使用，是黑盒测试
3. 测试重点在UI（DOM）
4. 安全感高
5. 速度慢（挂载整个组件库 <u>mount</u>）



# [扩展]

##  vue实例挂载

```js
// 1
new Vue({
	el: '#app', // #app 元素的 outerHTML 是 Vue 模板，该模板可以被编译成 render function
  template: '<App/>',
  components: { App }
})

new Vue({
	render: h => h('#app', {fn})
})

// 2
new Vue({
  router,
  store,
}).$mount('#app')

// 3
new Vue({
  router,
  store,
  el: '#app',
  render h => h(App)
})

```



## 实操方法

### 快照测试

> 希望组件样式改变的时候作出提示

```js
it('Header 样式改变，做提示', () => {
    const wrapper = shallowMount(Header)
    expect(wrapper).toMatchSnapshot()
})
```



### 获取组件

```js
const input = wrapper.find('[data-test="input"]')
expect(input.exist()).toBe(true)
```

```js
// testUtils.js 封装获取组件的方法
expect const findTestWrapper = (wrapper, tag) => {
	return wrapper.find(`[data-test="${tag}"]`)
}
const input = findTestWrapper(wrapper, 'input')
expect(input.exists()).toBe(true)
```



### 获取data / methods

```js
const wrapper = shallowMount(TodoList)

// 使用 $data 会报错： 【解决： npm install core-js@3.6.4 --save-dev]
// const value = wrapper.vm.$data.value
const value = wrapper.vm.value // 获取data
wrapper.vm.addUndoItem(content) // 调用方法
```



### 获取组件props

https://vue-test-utils.vuejs.org/zh/api/wrapper/#props

```js
const undoList = wrapper.findComponent(UndoList)
// const list = undoList.props('list')
const list = undoList.props().list
expect(list).toBeTruthy() // 传参存在
```



### 获取组件内部文字

```js
expect(countElem.at(0).text()).toEqual('0')

expect(input.at(0).element.value).toBe('2')
```



### 触发方法 emit

> 从 `vue-test-utils` beta 28 起，你需要调用 `nextTick` 以确保 Vue 的反应式系统更新 DOM

https://vue-test-utils.vuejs.org/zh/api/wrapper/#emitted

[https://lmiller1990.github.io/vue-testing-handbook/zh-CN/simulating-user-input.html#%E8%A7%A6%E5%8F%91%E4%BA%8B%E4%BB%B6](https://lmiller1990.github.io/vue-testing-handbook/zh-CN/simulating-user-input.html#触发事件)

```js
// 1. 在父组件上触发子组件方法  获取子组件 =》 调用方法
const header = wrapper.findComponent(Header)
header.vm.$emit('add', 1)

// 2. 在子组件上触发方法
// 判断触发与否
expect(wrapper.emitted().add).toBeFalsy()
expect(wrapper.emitted().add).toBeTruthy()
 // 第一次触发的传参...
expect(wrapper.emitted().delete[0][0]).toBe(1)

// 触发自定义事件
numberInput.vm.$emit('change')
```



```js
import { shallowMount } from "@vue/test-utils"
import FormSubmitter from "@/components/FormSubmitter.vue"

describe("FormSubmitter", () => {
  it("reveals a notification when submitted", async () => {
    const wrapper = shallowMount(FormSubmitter)

    wrapper.find("[data-username]").setValue("alice")
    wrapper.find("form").trigger("submit.prevent")
    await wrapper.vm.$nextTick()

    expect(wrapper.find(".message").text())
      .toBe("Thank you for your submission, alice.")
  })
})
```



### 可以被await的方法

![image-20200817190651425](/Users/bilibili/Library/Application Support/typora-user-images/image-20200817190651425.png)

### wrapper

https://vue-test-utils.vuejs.org/zh/api/wrapper/

`const wrapper = shallowMount(TodoList)`



#### contains

> 一个wrapper中是否包括某个元素或者组件

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = mount(Foo)
expect(wrapper.contains('p')).toBe(true) // 元素
expect(wrapper.contains(Bar)).toBe(true) // 组件
```



#### find & findAll & findComponent

> find 获取组件
>
> findAll 获取所有组件，返回数组
>
> findComponent 获取子组件

```js
const header = wrapper.findComponent(Header)
```



#### setValue

> 设置input或者下拉框v-model绑定的值

https://vue-test-utils.vuejs.org/zh/api/wrapper/#setvalue

```js
const input = wrapper.find('[data-test="input"]')
input.setValue('')
```



#### setChecked

> 设置多选框/单选框check值

设置多选框或者单选框的checked值

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
const radioInput = wrapper.find('input[type="radio"]')
radioInput.setChecked()

// 通过v-model绑定的，不能通过input事件触发。radioInput.setChecked()相当于以下代码
checkboxInput.element.checked = checked
checkboxInput.trigger('click')
checkboxInput.trigger('change')
```



### setMethods

> `setMethods` updates the instance, which re render vnodes (and ultimately Elements) to use the new method in their on handlers.
>
> I'm going to close this issue, since we aren't able to change this behavior in Vue Test Utils.
>
> The recommended way to set a method is to use `setMethods`



## 测试一个函数内的函数调用

如果需要知道具体函数的调用情况，需要是 mock 或者 spyOn 的函数。对单个函数的 mock，使用 spyOn 会比较多。

> 如果没有进行 mock，会报错：Matcher error: received value must be a mock or spy function

### 函数调用

```js
// methods
getSkuDOTBySkuId(skuId = 0) {
  	const payload = this.skuSearchInput ? this.skuSearchInput : skuId;
  	this.getSkuDTOBySkuIdDao(payload);
}

// test.spec.js
jest.spyOn(wrapper.vm, 'getSkuDOTBySkuId')
expect(wrapper.vm.getSkuDOTBySkuId).toHaveBeenCalledWith(item.skuId);
```

### 事件触发

```js
it('测试事件', () => {
    const stub = jest.fn(); // 伪造一个jest的mock funciton
    wrapper.setMethods({ handleClick: stub }); // setMethods将handleClick这个方法覆写
    wrapper.find('li').trigger('click'); // 对li触发一个click事件
    expect(stub).toBeCalled(); // 查看handleClick是否被调用
    wrapper.destroy();
});

// or
const getSkuDOTBySkuId = jest.fn();
wrapper.setMethods({ getSkuDOTBySkuId })
button.vm.$emit('click');
await wrapper.vm.$nextTick();
expect(getSkuDOTBySkuId).toHaveBeenCalled();



// ！！！！sinon 库
const wrapper = mount(Foo)
const clickMethodStub = sinon.stub()

wrapper.setMethods({ clickMethod: clickMethodStub })
wrapper.find('button').trigger('click')

expect(clickMethodStub.called).toBe(true)
```

![image-20200728145003468](/Users/bilibili/Library/Application Support/typora-user-images/image-20200728145003468.png)



### 如何测试 computed & watch



https://alexjover.com/blog/test-computed-properties-and-watchers-in-vue-js-components-with-jest/

【解救万千美少女的watch+spyOn】https://stackoverflow.com/questions/60712610/vue-jest-spyon-not-working-when-calculating-watcher-method-calls

## 如何测试文件上传代码

> 涉及会出现 fileReader.onload  target  image.onload
>
> 
>
> 
>
> [jest 模拟更改 测试 FileReader onload] https://stackoverflow.com/questions/61572070/how-to-test-filereader-onload-using-simulate-change-in-jest
>
> 



### 模拟函数传递event





## 提高 branch 覆盖率





# 报错汇总

![image-20200817155140045](/Users/bilibili/Library/Application Support/typora-user-images/image-20200817155140045.png)









**el-cascader 组件的检测**

[http://www.zhufengpeixun.cn/train/vue-info/unit.html#_3-%E6%B5%8B%E8%AF%95handle%E6%96%B9%E6%B3%95%E6%98%AF%E5%90%A6%E7%AC%A6%E5%90%88%E8%A7%84%E8%8C%83](http://www.zhufengpeixun.cn/train/vue-info/unit.html#_3-测试handle方法是否符合规范)









2. 巨多类似报错，是因为在mount的时候还没有渲染内部组件，所以出现报错。

   出错源头：未定（有博客说是因为elementui中select组件的原因）

   解决方法：将mount 改为 shallowMount 不进行内部组件的渲染可以暂时解决这个问题

   ![image-20200910145009440](/Users/bilibili/Library/Application Support/typora-user-images/image-20200910145009440.png)