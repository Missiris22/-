# 项目中出现的问题

## vue路由不可以传递对象

1. 效果

- 数字类型将变成string类型
- 数组类型传递出错（数组中存picList，upload组件报错，认为传递过来的为string）
=》 路由传递对象收到的是string类型
[] 9
2. 处理方案

1） 使用 `JSON.stringify` 处理传递的数据
2） 使用 `JSON.parse` 处理收到的数据

```js
this.$router.push({
    path: '/source/path',
    query: {
        row: JSON.stringify(row) // row [Object]
    }
})

// ------
const row = JSON.parse(this.$router.query.row)
```

## 前端存储大量数据

1. 项目要求：
批量实现图片转视频，后端不需要存储确认生成视频之前的中间态（即图片转视频和编辑视频的中间过程），所以需要前端暂存视频。而且由于需要批量转视频，最多50ge，故需要找一个前端数据库

2. 实现
使用indexDb数据库。`Application` 里 `sessionstorage` 同级数据库下增加 `indexDb`
![浏览器indexDb截图](https://raw.githubusercontent.com/Missiris22/PictureHouse/master/indexDb.png)

```js
// indexDb.js
const DB_VERSION = 1;
const DB_NAME = 'Pic';
const storeName = 'noPicTable';

// 打开数据库 / 新建数据库、创建对象仓库
function openDb() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onsuccess = function (event) {
            console.log('数据库打开成功');
            resolve(event);
        };

        request.onerror = function (event) {
            alert(`数据库打开报错：${event.target.errorCode}`);
            reject(event);
        };

        request.onupgradeneeded = function (event) {
            const store = event.target.result;
            const objectStore = store.createObjectStore(storeName, { keyPath: 'itemsId' });
            objectStore.createIndex('itemsId', 'itemsId', { unique: true });
            objectStore.createIndex('itemsName', 'itemsName', { unique: false });
            objectStore.createIndex('parentIpName', 'parentIpName', { unique: false });
            objectStore.createIndex('cateName', 'cateName', { unique: false });
            objectStore.createIndex('imgs', 'imgs', { unique: false });
            objectStore.createIndex('onSaleTime', 'onSaleTime', { unique: false });
            objectStore.createIndex('videoUrl', 'videoUrl', { unique: false });
            objectStore.createIndex('isChecked', 'isChecked', { unique: false });
        };
    });
}

// 写入数据
function addData(data) {
    // 打开数据库
    return openDb().then(event => {
        const db = event.target.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const VideoObjectStore = transaction.objectStore(storeName);
        if (Array.isArray(data)) {
            data.forEach(item => {
                VideoObjectStore.add(item);
            });
        }
        else {
            VideoObjectStore.add(data);
        }
        return Promise.resolve();
    }).catch(() => {
        alert('数据写入失败，请重新点击“批量生成视频”按钮！');
        return Promise.reject();
    });
}

// 修改数据
function editData(arr) {
    // 打开数据库
    return openDb().then(event => {
        const db = event.target.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const VideoObjectStore = transaction.objectStore(storeName);
        arr.forEach(item => {
            VideoObjectStore.put(item);
        });
        return Promise.resolve();
    }).catch(() => {
        alert('数据写入失败，请重新点击“批量生成视频”按钮！');
        return Promise.reject();
    });
}

// 读取数据（查询单个数据）
function readData(id) {
    // 打开数据库
    return openDb().then(event => {
        const db = event.target.result;
        const rs = db.transaction([storeName], 'readwrite').objectStore(storeName).get(id);
        return Promise.resolve(rs);
    }).catch(() => {
        alert('获取数据失败，请重试！');
        return Promise.reject();
    });
}

// 游标读取所有数据
function getData() {
    // 打开数据库
    return new Promise((resolve, reject) => {
        openDb().then(event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                reject('err');
                return;
            }
            const transaction = db.transaction([storeName], 'readwrite');
            const VideoObjectStore = transaction.objectStore(storeName);
            const rs = VideoObjectStore.openCursor();
            const table = [];
            rs.onsuccess = function (e) {
                const cursor = e.target.result;
                if (cursor) {
                    table.push(Object.assign(cursor.value));
                    cursor.continue();
                }
                if (!cursor) {
                    resolve(table);
                }
            };
            rs.onerror = function (e) {
                reject(e);
            };
        });
    });
}

// 删除数据
function deleteData(id) {
    // 打开数据库
    return openDb().then(event => {
        const db = event.target.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const VideoObjectStore = transaction.objectStore(storeName);
        VideoObjectStore.delete(id);
        return Promise.resolve();
    }).catch(() => {
        alert('删除数据失败，请重试！');
        return Promise.reject();
    });
}

// 清空对象仓库
function clearStore() {
    // 打开数据库
    return openDb().then(event => {
        const db = event.target.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const VideoObjectStore = transaction.objectStore(storeName);
        VideoObjectStore.clear();
        return Promise.resolve();
    }).catch(() => {
        alert('清空数据失败，请返回审核！');
        return Promise.reject();
    });
}

// 判断store是否存在
function ifDbExist() {
    return openDb().then(event => {
        const store = event.target.result;
        if (!store.objectStoreNames.contains(storeName)) {
            return Promise.reject();
        }
        return Promise.resolve();
    });
}

export default {
    openDb,
    addData,
    readData,
    editData,
    getData,
    deleteData,
    clearStore,
    ifDbExist
};

```

## 浮点数引起的问题
[JS中浮点数精度问题](https://juejin.cn/post/6844903572979597319)

```
0.1 + 0.2 = 0.30000000000000004
0.3 - 0.2 = 0.09999999999999998
19.9 * 100 = 1989.9999999999998
0.3 / 0.1 = 2.9999999999999996
```

原因：
十进制的数字会被转换为二进制进行计算。由于浮点数用二进制表示是无穷的，因浮点数小数位限制【64 位双精度浮点数的小数部分最多支持53位二进制位】而截断的二进制数字转换为十进制之后，就会出现误差。


解决方案：
将需要计算的数字升级，计算之后，再降级

```js
export default (number1, number2, operator) => {
    let sum = 0;
    let multiple = 0;
    number1 *= 10000;// 10000
    number2 *= 10000;// 20000
    switch (operator) {
        case '*':
            sum = number1 * number2;
            multiple = 100000000;
            break;
        case '/':
            if (number1 === 0 || number2 === 0) {
                sum = 0;
            }
            else {
                sum = number1 / number2;
            }
            break;
        case '+':
            sum = number1 + number2;
            multiple = 10000;
            break;
        case '-':
            sum = number1 - number2;
            multiple = 10000;
            break;
        default:
            break;
    }
    return operator === '/' ? sum : Math.round(sum.toFixed(4)) / multiple;
};
```

## 由于key引发的血案

出现情况：

1. 根据不同的业务方，下拉多选内容查询显示不同。实际情况，list变化，但组件展示内容不更新。
2. 根据【el-table】列信息判断显示某元素（通过计算属性`isShow`控制）。实际情况，变量变化，但组件元素不展示 / 隐藏。

解决方案：

1. 给下拉框组件添加key属性，每次渲染的key不同，触发组件重新刷新
2. 给该【el-table-column】添加key属性，关联变量监听每次`isShow`变化，自增。由于key不同，触发列的重新渲染