---
layout: doc
---

# js高级

## 1. this的绑定规则有⼏种？

- 默认绑定：独⽴函数调⽤，函数没有被绑定到某个对象上进⾏调⽤

- 隐式绑定：通过某个对象发起的函数调⽤，在调⽤对象内部有⼀个对函数的引⽤。

- 显式绑定：明确this指向的对象，第⼀个参数相同并要求传⼊⼀个对象。

  - apply/call

  - bind

- new绑定：

  - 创建⼀个全新对象

  - 新对象被执⾏prototype链接

  - 新对象绑定到函数调⽤的this

  - 如果函数没有返回其他对象，表达式会返回这个对象

## 2. 说出apply、call、bind函数的⽤法和区别？

  - ⽤法：
  
    - apply
    
      - 第⼀个参数: 绑定this

      - 第⼆个参数: 传⼊额外的实参, 以数组的形式

    - call
    
      - 第⼀个参数: 绑定this

      - 参数列表: 后续的参数以多参数的形式传递, 会作为实参

    - bind(不希望obj对象身上有函数)

      ```js
      function foo() {
        console.log(this)
      }
  
      var obj = { name: "ccb" }
  
      var bar = foo.bind(obj)
      bar() // this -> obj
      ```

  - 区别：

    - call、apply和bind都可以改变函数的this指向

    - call、apply和bind第⼀个参数的是this要指向的对象

    - call、apply和bind都可以后续为函数传参，apply是将参数并成⼀个数组，call和bind是将参数依次列出

    - call、apply都是直接调⽤，bind⽣成的this指向改变函数需要⼿动调⽤。

## 3. 说说浏览器输入一个URL到页面显示的过程

  - URL 输⼊
    - 检查输⼊的内容是否是⼀个合法的 URL 链接
    - 判断输⼊的 URL 是否完整, 如果不完整，浏览器可能会对域进⾏猜测，补全前缀或者后缀
    - 使⽤⽤户设置的默认搜索引擎来进⾏搜索
  - DNS 解析
    - 浏览器不能直接通过域名找到对应的服务器 IP 地址
    - 所以需要进⾏ DNS 解析，查找到对应的 IP 地址进⾏访问。
  - 建⽴ TCP 连接
  - 发送 HTTP / HTTPS 请求（建⽴ TLS 连接）
    - 向服务器 发起 TCP 连接请求
    - 当这个请求到达服务端后，通过 TCP 三次握⼿，建⽴ TCP 的连接。
      - 客户端发送 SYN 包到服务器，并进⼊ SYN_SEND 状态，等待服务器确认
      - 服务器收到 SYN 包，必须确认客户的 SYN，同时⾃⼰也发送⼀个 SYN 包，此时服务器进⼊ SYN_RECV 状态。
      - 客户端收到服务器的 SYN包，向服务器发送确认包，此包发送完毕，客户端和服务器进⼊ ESTABLISHED 状态，完成三次握⼿。
  - 服务器响应请求
    - 当浏览器到 web 服务器的连接建⽴后，浏览器会发送⼀个初始的 HTTP GET 请求，请求⽬标通常是⼀个 HTML ⽂件。服务器收到请求后，将发回⼀个 HTTP 响应报⽂，内容包括相关响应头和 HTML 正⽂。
  - 浏览器解析渲染⻚⾯
    - 处理 HTML 标记并构建 DOM 树。
    - 处理 CSS 标记并构建 CSSOM 树。
    - 将 DOM 与 CSSOM 合并成⼀个渲染树
    - 根据渲染树来布局，以计算每个节点的⼏何信息。
    - 将各个节点绘制到屏幕上。
  - HTTP 请求结束，断开 TCP 连接.

## 4. 什么是回流(重排)和重绘，如何减少回流(重排)和重绘

  -  什么是 回流(重排) 和 重绘
   - 重绘：当元素的一部分属性发生改变，如外观、背景、颜色等不会引起布局变化，只需要浏览器根据元素的新属性重新绘制，使元素呈现新的外观叫做重绘。 
   - 回流(重排)：当 render 树中的一部分或者全部因为大小边距等问题发生改变而需要DOM树重新计算的过程
   - 重绘不一定需要 回流(重排) （比如颜色的改变）， 回流(重排) 必然导致重绘（比如改变网页位置）

  -  减少回流(重排)和重绘
   - 避免用 table 布局（table 元素一旦触发回流就会导致 table 里所有的其它元素回流）
   - 避免使用 css 表达式(expression)，因为每次调用都会重新计算值（包括加载页面）
   - 需要要对元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示
   - 需要创建多个 DOM 节点时，使用 DocumentFragment 创建完后一次性的加入document 缓存 Layout 属性值，如：`var left = elem.offsetLeft`; 这样，多次使用 left 只产生一次回流
   - 尽量使用 css 属性简写，如：用 border 代替 border-width, border-style, border-color
   - 批量修改元素样式：elem.className 和 elem.style.cssText 代替 elem.style.xxx

## 5. 说说你对作⽤域和作⽤域链的理解？ 

- 作⽤域
  - 在ES5中，全局是⼀个作⽤域，函数也会产⽣作⽤域。
  - 在ES6中，代码块、let、const等都会有属于⾃⼰的作⽤域。
- 作⽤域链
  - 当进⼊到⼀个执⾏上下⽂时，执⾏上下⽂会关联⼀个作⽤域链。
  - 通常作⽤域链在解析时就被确定，作⽤域链与函数的定义位置有关，与它的调⽤位置⽆关

## 6. 说说async和defer的使⽤以及区别？

- 浏览器在解析构建DOM树的过程中 如果遇到script元素会停止构建DOM树 先下载JavaScript代码 执行对应的脚本
- 但是某些JavaScript代码中可能存在对某个节点的操作 如果等待DOM树构建完成 之后在进行对应的操作 则会造成大量的回流和重绘
- 同时在如果JavaScript 代码过多 则浏览器处理的时间会过长 则会造成页面的阻塞
- 为了解决这个问题 出现了两个属性 async defer

- defer
  - 脚本的下载会与DOM树的构建同时进行
  - 如果脚本提前下载好了 则会等到DOM树构建完成之后 在DOMContentLoaded事件之前执行defer中的代码
  - 同时多个defer属性的script标签 则会按照顺序执行
  - 推荐放到head标签中 可以早解析
  - 对于script默认的内容 会忽略

- async
  - 脚本的下载会与DOM树的构建同时进行
  - 让一个脚本完全独立 脚本的解析 运行于DOM的构建无关
  - 多个async属性的脚本不保证运行顺序
  - 通常用于独立的脚本 对于其他脚本 DOM没有依赖
 
## 7. 说说V8引擎的内存管理

- JavaScript的内存管理是⾃动的
- 关于原始数据类型 直接在栈内存中分配
- 关于复杂数据类型 在堆内存中分配

## 8. 说说V8引擎的垃圾回收器

- 因为内存大小是有限的，所以在内存不需要的时候，需要进行释放，用于腾出空间
- GC对于内存管理有着对应的算法
- 常见的算法
  - 引用计数(Reference Count) 
    - 当一个对象有引用指向它时，对应的引用计数+1 
    - 当没有对象指向它时，则为0，此时进行回收
    - 但是有一个严重的问题 - 会产生循环引用
  - 标记清除(Mark-Sweep)
    - 核心思路: 可达性
    - 这个算法是设置一个根对象（root object），垃圾回收器会定期从这个根开始，找所有从根开始有引用到的对象，对于哪些没有引用到的对象，就认为是不可用的对象；对于不可用的对象 则进行回收
    - 该算法有效的解决了循环引用的问题
    - 目前V8引擎采用的就是该算法
- V8引擎为了优化 在采用标记清除的过程中也引用了其他的算法
  - 标记整理
    - 和标记清除相似 不同的是回收时 会将保留下来的存储对象整合到连续的内存空间 避免内存碎片化
  - 分代收集(Generational Collection)
    - 将内存中的对象分为两组 新的空间 旧的空间
    - 对于长期存活的对象 会将该对象从新空间移到旧空间中 同时GC检查次数减少
    - 将新空间分为from和to，对象的GC查找之后从from移动到to空间中，然后to变为from，from变为to，循环几次，对于依然存在的对象，移动到旧空间中
  - 增量收集(Increment Collection)
    - 如果存在许多对象 则GC试图一次性遍历所有的对象 可能会对性能造成一定的影响 
    - 所以引擎试图将垃圾收集工作分成几部分 然后这几部分逐一处理 这样会造成微小的延迟 而不是很大的延迟
  - 闲时收集(IdIe-time Collection)
    - GC只会在CPU空闲的时候运行 减少可能对代码执行造成的影响
   
## 9. 你是如何理解闭包的,闭包到底是什么?

- 什么是闭包？
  - 一个普通的函数function，如果它可以访问外层作用域的自由变量，那么这个函数和周围环境就是一个闭包；
  ```js
  function createAdder(x) {
    return function(y) {
      return x + y;
    }
  }
  const add5 = createAdder(5);
  console.log(add5(3)); // 输出 8
  ```
  - <font color="red">从狭义的角度来说：JavaScript中一个函数，如果访问了外层作用域的变量，那么它是一个闭包；</font>
  ```js
  var message = "Hello world"

  function foo() {
    console.log(message)
  }

  foo()
  ```
- 闭包的优点：可以避免全局变量的污染。
- 闭包的缺点：闭包会常驻内存，增加内存使用量，使用不当很容易造成内存泄漏。
- 使用场景：防抖 、节流 、⽴即执⾏函数 、组合函数等等

## 10. 什么是纯函数？如何编写纯函数？

- 纯函数⼀般具有以下的特点：
  - 确定的输⼊⼀定会有确定的输出（外部环境的任何变化不会影响函数内部的操作产⽣的结果）
  - 纯函数的执⾏不会产⽣副作⽤。（函数内部的操作也不会对函数外部产⽣任何影响）
- 纯函数在react和redux中应⽤⽐较多。
- 编写纯函数：
```js
  function sum(num1, num2){
    return num1 + num2
  }
```

```js
  //⼀般的数学⽅法可以写成纯函数,例如相加
  function sum(...args) {
    var result = args.reduce((perValue, item) => {
                   return preValue + item
                 }, 0)
    return result
  }
```

## 11. 什么是函数柯⾥化？柯⾥化有什么作⽤？

- 函数的柯⾥化：
  - 将传⼊多个参数的函数转变成传⼊单个参数并且返回⼀个函数⽤于接收剩余的参数的函数。
  - 每⼀层函数都接收⼀个参数并对参数进⾏处理。
```js
function foo1(x) {
  return function (y) {
    return function (z) {
			return x + y + z
    }
  }
}
console.log(foo1(10)(20)(30)) // 60
```
- 柯⾥化的作⽤：
  - 单⼀职责：每⼀个函数只⽤处理传⼊的单个参数，每个函数的职责单⼀⽽且确定
  - 参数复⽤：可以拿到每⼀层函数执⾏的返回值作为⼀个新的函数，复⽤已经传⼊过的参数。

## 14. 说说你对严格模式的理解？

- 严格模式是⼀种JavaScript的限制模式，因为种种历史原因，JavaScript语⾔在⾮严格模式下是⽐较松散
的。在JavaScript不断优化和加⼊新特性的过程中，为了兼容早期的JavaScript，⼀些错误和不规范的写
法也被保留了下来。这些错误也不会被抛出。在开启了严格模式后，js引擎会以⼀种更严格的规范执⾏
JavaScript代码，⼀些不规范的写法和错误也会直接抛出。

- 开启严格模式的⽅法：
  - 对⽂件开启：在⽂件的开头写上"use strict"
  - 对函数开启：在函数的开头写上"use strict"
    
- 严格模式下的语法限制：
  - 不允许意外创建全局变量（不写var、let、const这种声明变量的关键字）
  - 会对静默失败的赋值操作抛出异常
  - 试图删除不可删除的属性
  - 不允许函数参数有相同的名称
  - 不允许只有0开头的⼋进制语法
  - 不允许使⽤with
  - ⽆法获取eval中定义的变量
  - this绑定不会默认转成对象

📢：详细内容可以看笔记 ！！！

## 15. 理解组合函数以及组合函数的作⽤？

- 组合函数：
  - 组合函数是将多个函数组合到⼀起，进⾏依次调⽤的函数使⽤模式。

- 组合函数的作⽤：
  - 减少重复代码的编写，提⾼代码的复⽤性，便于开发。
  - 可以对任意个函数进⾏组合，返回新的具有多个被组合函数功能的新函数
 
## 16. 说说属性描述符以及应用？

- 属性描述符可以对对象进行精确定义或修改的机制，你可以使用 `Object.defineProperty()` 方法来对添加或者修改属性

- `Object.defineProperty()` 方法直接在一个对象上定义一个新属性，或者修改一个已属性，并返回此对象。
  - 有三个参数：
    - 定义属性的对象
    - 定义或修改属性的名称
    - 定义或修改属性描述符

  - 如果要同时定义多个属性: 你可以使用 `Object.defineProperties()`方法

  - 下面是一个示例代码，展示了如何使用属性描述符：
      
      ```js
        var obj = {
          name: "why",
          age: 18,
          height: 1.88
        }
        
        // Object.defineProperty(obj, "name", {})
        // Object.defineProperty(obj, "age", {})
        // Object.defineProperty(obj, "height", {})
        
        // 新增的方法
        Object.defineProperties(obj, {
          name: {
            configurable: true,
            enumerable: true,
            writable: false
          },
          age: {
          },
          height: {
          }
        })
      ``` 
   
- 属性描述符分为 `数据属性`描述符 和 `存取属性`描述符

  - `数据属性`描述符: 用于对对象的属性进行具体描述，具有四个特性：
    - configurable: 告诉js引擎, 对象的属性是否可以被删除
    - enumerable: 告诉js引擎, 对象的属性是否可以被枚举(for...in / Object.keys)
    - writable: 告诉js引擎，对象的属性是否可以被修改(只读属性 readonly)
    - value: 告诉js引擎, 返回该属性的值
    - 默认情况下，对现有对象的属性，前三个特性为true(可被删除、可被枚举、可被修改)，如果通过`Object.defineProperty()`定义新属性，则默认前三个特性为false，value默认为undefined

- `存取属性`描述符: 用于取出者设置属性时调用相应的函数,与vue2响应式原理中的get方法和set方法类似，具有四个特性：
   - configurable: 告诉js引擎, 对象的属性是否可以被删除
  - enumerable: 告诉js引擎, 对象的属性是否可以被枚举(for...in / Object.keys)
  - get: 获取属性时会执行的函数。默认为undefined
  - set: 设置属性时会执行的函数。默认为undefined
  - 默认情况下，跟`数据属性`描述符一样，对现有对象的属性，前2个特性为true(可被删除、可被枚举)
    
  - 下面是一个示例代码，展示了如何使用属性描述符：
      
      ```js
        var obj = {
          name: "ccb",
          height: 1.85,
          age: 18
        }
        
        var _name = ""
        Object.defineProperty(obj, "name", {
          set: function (value) {
            console.log("set方法被调用了~", value)
            _name = value
          },
          get: function () {
            console.log("get方法被调用了~")
            return _name
          }
        })
        
        obj.name = "kobe" // set方法被调用了~ kobe
        console.log(obj.name) // get方法被调用了~ kobe
      ```

    - 获取对象的属性描述符:
      - Object.getOwnPropertyDescriptor(obj, "name")
      - Object.getOwnPropertyDescriptors(obj)
    
    - 禁止对象扩展新属性(给一个对象添加新的属性会失败（在严格模式下会报错）): Object.preventExtensions(obj)
 
    - 密封对象，`不允许配置和删除属性`(不能删除对象的属性、不能添加新的属性)：Object.seal(obj)
 
    - 冻结对象，不允许修改现有属性(不能删除对象的属性、不能添加新的属性、不能修改对象的属性)： Object.freeze(obj)

📢：详细内容可以看笔记 ！！！
