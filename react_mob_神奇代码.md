# react
# js
## 对象解构
```js
const {
    basicStore: {
        currentUser: { loginType }
    }
} = props;
```
实际仅声明变量 loginType，取 `logicTyp=props.basicStore.currentUser.loginType`