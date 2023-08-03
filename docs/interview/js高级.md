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

  - 区别：
    - call、apply和bind都可以改变函数的this指向
    - call、apply和bind第⼀个参数的是this要指向的对象
    - call、apply和bind都可以后续为函数传参，apply是将参数并成⼀个数组，call和bind是将参数依次列出
    - call、apply都是直接调⽤，bind⽣成的this指向改变函数需要⼿动调⽤。

## 3. 说说你对作⽤域和作⽤域链的理解？

  - 作⽤域
    - 在ES5中，全局是⼀个作⽤域，函数也会产⽣作⽤域。
    - 在ES6中，代码块、let、const等都会有属于⾃⼰的作⽤域。
  - 作⽤域链
    - 当进⼊到⼀个执⾏上下⽂时，执⾏上下⽂会关联⼀个作⽤域链。
    - 通常作用域链在解析时就被确定， 因此作用域链与函数的定义位置有关，而与它的调用位置无关


## 4. 浏览器输入一个URL到页面显示的过程

  - 首先在浏览器中输入域名，通过DNS服务器进行域名解析
  - 解析出对应的IP地址 然后从ip地址对应的主机发送http请求 获取对应的静态资源
  - 默认情况服务器会返回index.html文件
  - 然后浏览器内核开始解析HTML
  - 首先 会解析对应的html 生成 <font color="red">DOM Tree</font>
  - 解析过程中 如果遇到css的link标签 则会下载对应的css文件
    - 下载css文件和生成DOM树是同时进行
  - 下载完对应的css文件后会进行css解析 生成 <font color="red">CSSOM</font> ( CSS object model)
  - 当DOM Tree和CSSTree都解析完成之后 会进行合并用来生成 <font color="red">Render Tree</font> (渲染树)
  - 初步生成的渲染树会显示节点以及部分样式 但是并不表示每个节点的尺寸、位置信息，于是进行 <font color="red">Layout(布局)</font> 来生成渲染树中节点的宽度、高度位置信息
  - 经过Layout之后，浏览器内核将布局时的每个 <font color="red">frame</font> 转为屏幕上的每个像素点，将每个节点绘制到屏幕上

## 5. 网页的渲染过程 / 浏览器是如何渲染UI的？

 - 首先 会解析对应的html 生成 <font color="red">DOM Tree</font>
  - 解析过程中 如果遇到css的link标签 则会下载对应的css文件
    - 下载css文件和生成DOM树是同时进行
  - 下载完对应的css文件后会进行css解析 生成 <font color="red">CSSOM</font> ( CSS object model)
  - 当DOM Tree和CSSTree都解析完成之后 会进行合并用来生成 <font color="red">Render Tree</font> (渲染树)
  - 初步生成的渲染树会显示节点以及部分样式 但是并不表示每个节点的尺寸、位置信息，于是进行 <font color="red">Layout(布局)</font> 来生成渲染树中节点的宽度、高度位置信息
  - 经过Layout之后，浏览器内核将布局时的每个 <font color="red">frame</font> 转为屏幕上的每个像素点，将每个节点绘制到屏幕上

## 6. 回流(重排)/重绘?

### 6.1 什么是回流（重排）

  当页面布局发生改变，需要重新计算元素的位置和尺寸

### 6.2 什么是重绘

  当元素的样式发生改变，但不影响其布局时

### 6.3 什么情况下引起回流（重排）

  - DOM结构发生改变(节点的增删)
  - 修改了节点的布局(宽度 高度 字体大小等)
  - 修改窗口的尺寸
  - 调用getComputedStyle获取尺寸、位置信息

### 6.4 引起重绘情况:

  - 修改背景色、文字颜色、边框颜色、样式等

  `回流一定会引起重绘 所以回流非常消耗性能`

### 6.5 如何避免回流

  - 尽量一次性的修改样式
    - 通过添加classList
  - 避免频繁的操作DOM
  - 避免通过getComputedStyle获取尺寸、位置信息等
  - 对于某些元素使用position:absolute/fixed
    - 开销较小 不会对其他元素造成影响

## 7. 说说async和defer的使⽤以及区别？

- script 会阻塞DOM Tree构建，需要优先下载和执行JavaScript代码，再继续构建DOM Tree
- 为了解决这个问题，script元素给我们提供了两个属性（attribute）：`defer` 和 ` async`

- defer
  - 脚本<font color="red">会由浏览器来进行下载，但是不会阻塞DOM Tree</font>的构建过程；
  - 如果脚本提前下载好了，它会<font color="red">等待DOM Tree构建完成，在DOMContentLoaded事件之前先执行defer中的代码</font>；
  - 同时多个defer属性的script标签会按照顺序执⾏
  - 从性能的角度最好放到head中
  - defer对于script元素没有外部引用是无效的

- async
  - 浏览器<font color="red">不会因 async 脚本而阻塞</font>（与 defer 类似）；
  - <font color="red">async脚本不能保证顺序，它是独立下载、独立运行，不会等待其他脚本</font>；
  - <font color="red">async不能保证在DOMContentLoaded之前或者之后执行</font>；
  - 通常用于独立的脚本，对其他脚本，DOM没有依赖
