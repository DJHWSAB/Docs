---
layout: doc
---

# js高级

# 1. 说出apply、call、bind函数的⽤法和区别？

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

## 2. 浏览器输入一个URL到页面显示的过程

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

## 3. 回流(重排)/重绘?

### 3.1 什么是回流（重排）

  - 第一次确定节点的大小和位置，称之为布局（layout）。
  - 之后对节点的大小、位置修改重新计算称之为回流。

### 3.2 什么是重绘

  - 第一次渲染内容称之为绘制（paint）。
  - 之后重新渲染称之为重绘、

### 3.3 什么情况下引起回流（重排）

  - DOM结构发生改变(节点的增删)
  - 修改了节点的布局(宽度 高度 字体大小等)
  - 修改窗口的尺寸
  - 调用getComputedStyle获取尺寸、位置信息

### 3.4 引起重绘情况:

  - 修改修改背景色、文字颜色、边框颜色、样式等

  `回流一定会引起重绘 所以回流非常消耗性能`

### 3.5 如何避免回流

  - 尽量一次性的修改样式
    - 通过添加classList
  - 避免频繁的操作DOM
  - 避免通过getComputedStyle获取尺寸、位置信息等
  - 对于某些元素使用position:absolute/fixed
    - 开销较小 不会对其他元素造成影响

