---
layout: doc
---

# js


## 1. == 和 === 的区别是什么

  - ==(普通相等) 
  
    - 在类型不相同的情况下,会将运算元先转换成 Number 的值,再进行比较(隐式转换)
    
    ```js
    var num1 = 0
    var num2 = false
    var num3 = ""
    console.log(Number(num1), Number(num2), Number(num3)) // 0 0 0
    console.log(num1 == num2) // true
    console.log(num1 == num3) // true
    console.log(num2 == num3) // true
    ```
    - null ⽐较特殊: null 在进⾏⽐较的时候, 应该是会被当成⼀个对象和原⽣类型进⾏⽐较的

    ```js
    var num4 = null

    console.log(Number(num4)) // 0

    console.log(num1 == num4) // false
    console.log(num2 == num4) // false
    console.log(num3 == num4) // false
    ```

  - === (严格不等)
  
    - 在类型不同的情况下,直接返回false

    ```js
    var num1 = 0
    var num2 = false
    var num3 = ""

    console.log(num1 === num2) // false
    console.log(num1 === num3) // false
    console.log(num2 === num3) // false
    ```
  
  > **练习**

  ```js
  // a == 1 && a == 2 && a == 3 什么时候成立

  var a = {
    value: 1,
    valueOf: function() {
      return this.value++
    }
  }

  console.log(a == 1 && a == 2 && a == 3) // true

  // b == "1" && b == "2" && b == "3" 什么时候成立

  var b = {
    value: 1,
    toString: function () {
      return this.value++
    }
  }

  console.log(b == "1" && b == "2" && b == "3") // true
  ```
## 2. 实现倒计时功能

  ![interview](/interview_js_01.png)

  ```html
  <div class="countdown">
    <span class="time hour">00</span>
    <span class="split">:</span>
    <span class="time minute">00</span>
    <span class="split">:</span>
    <span class="time second">00</span>
  </div>
  ```

  ::: details Click me to view the code css
  ```css
  .countdown {
    display: flex;
    /* 垂直居中 */
    align-items: center;
    font-size: 22px;
    font-weight: 700;
  }

  .countdown .time {
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    background-color: #f00;
    border-radius: 11px;
  }

  .countdown .split {
    padding: 0 6px;
    color: #f00;
  }
  ```
  :::

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var hourEl = document.querySelector(".hour")
  var minuteEl = document.querySelector(".minute")
  var secondEl = document.querySelector(".second")

  // 2.获取24:00:00的时间戳
  // 🚚 直接设置 不推荐 ❌
  // var endDate = new Date("2023-06-07T00:00:00").valueOf()

  // ✈️ 先获取当前时间戳,再设置24:00:00
  var endDate = new Date()
  endDate.setHours(24, 0, 0, 0)
  endDate = endDate.getTime()

  // 3.封装工具类函数 ---- 解决长度不足的情况
  function padLeft(content, count, padStr) {
    // 3.1 如果没有传入参数,默认使用当前值
    count = count || 2
    padStr = padStr || "0"

    // 3.2 保证传入的类型是String,可以使用 xx.toString() / String(xx)
    content = content.toString()

    // 3.3 调用函数 padStart 方法实现填充操作，并返回结果
    return content.padStart(count, padStr)
  }

  // 4.定义函数 ---- 设置倒计时
  function setCountdown() {
    // 4.1 获取当前时间戳
    var nowDate = Date.now()

    // 4.2 获取剩下的时间戳 1s = 1000ns
    var time = Math.floor((endDate - nowDate) / 1000)

    // 4.3 获取具体的 时 / 分 / 秒
    var hour = Math.floor(time / 3600)
    var minute = Math.floor(time / 60) % 60
    var second = time % 60

    // 4.4 设置内容
    hourEl.textContent = padLeft(hour)
    minuteEl.textContent = padLeft(minute)
    secondEl.textContent = padLeft(second)
  }

  // 5.保证第一次进来就调用
  setCountdown()

  // 6.设置定时器,每隔1s刷新一次
  setInterval(setCountdown, 1000)
  ```
  :::

## 3. 实现返回顶部功能

  ![interview](/interview_js_02.png)

  ```html
  <button class="backTop" title="返回顶部">返回顶部</button>
  ```

  ::: details Click me to view the code css
  ```css
  body {
    height: 1500px;
  }

  .backTop {
    position: fixed;
    right: 10px;
    bottom: 40px;
    width: 50px;
    height: 50px;
    text-align: center;
    color: #fff;
    background-color: #f00;
  }
  ```
  :::

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var btnEl = document.querySelector(".backTop")

  // 2.默认返回顶部按钮隐藏
  btnEl.hidden = true

  // 3.监听window的滚动事件
  window.onscroll = function () {
    // 如果出现拉动滚动条,显示返回顶部按钮,否则隐藏返回顶部按钮
    if (this.scrollY > 0) {
      btnEl.hidden = false

      // 监听返回按钮的点击事件
      btnEl.onclick = function () {
        // scrollTo(pageX,pageY) 将页面滚动至 绝对坐标
        window.scrollTo(0, 0)
        // 隐藏返回顶部按钮
        this.hidden = true
      }
    } else {
      // 在拉动滚动条位置为0时,保证隐藏返回顶部按钮
      btnEl.hidden = true
    }
  }
  ```
  :::

## 4. 说说事件冒泡和事件捕获的理解?

  - 事件冒泡: 从最内层的元素向外依次传递的顺序, 默认是事件冒泡

  - 事件捕获: 从外层到内层依次传递的顺序 ,可以通过addEventListener("click",fn,true) 监听事件捕获

## 5. 说说你对事件委托的理解?

  - 当子元素被点击时，父元素可以通过冒泡可以监听到子元素的点击
  
  - 并且可以通过event.target获取到当前监听的元素

  > 一个ul中存放多个li，点击某一个li会变成红色 ✅

  ::: code-group
  ```js
  // 🚚 每一个li都监听自己的点击,并且有自己的处理函数(自己的函数)
  // 1.获取元素
  var liEls = document.querySelectorAll("li")
  // 2.循环遍历元素
  for (var liEl of liEls) {
    // 给liEl绑定点击事件
    liEl.onclick = function (event) {
      // event.target 事件发生对象 <-> 点击那个元素
      // event.currentTarget 当前处理的对象 <-> 绑定的点击事件
      event.target.style.color = "#f00"
      console.log(event.target) // li
    }
  }
  ```

  ```js
  // 🔥 事件委托: 它也是一种设计模式,子类发生的事情,我委托给父类,让父类给它做处理,这个叫做事件委托(事件代理)

  // 🚚 统一在ul中监听(推荐使用) ✅
  // 获取元素
  var ulEl = document.querySelector("ul")

  // 监听元素的点击
  ulEl.onclick = function (event) {
    // event.target 事件发生对象 <-> 点击哪个元素
    // event.currentTarget 当前处理的对象 <-> 绑定的点击事件

    // 如果是 li,变色
    if (event.target !== ulEl) {
      event.target.style.backgroundColor = "red"
    }
  }
  ```
  :::

  > **一个ul中存放多个li，点击某一个li会变成红色,其余不变色** ✅

  - 思路分析: 通过监听ul元素的点击事件，然后根据点击的元素来添加或移除active类名

  ::: code-group
  ```js
  🚚 方案一：通过循环遍历ul元素的子元素，判断当前点击的元素是否是ul元素本身，
  以及子元素是否有active类名，然后根据判断结果来添加或移除active类名。

  // 1.获取ul元素
  var ulEl = document.querySelector("ul")

  // 2.给ul元素绑定点击事件
  ulEl.onclick = function (event) {
    // 循环遍历ul元素的子元素
    for (var liEl of ulEl.children) {
      // 如果当前点击的元素不是ul元素本身，并且子元素有active类名，则移除active类名
      // event.target !== ulEl && liEl.classList.contains("active") && liEl.classList.remove("active")

      // 等价于👆🏻代码
      if (event.target !== ulEl && liEl.classList.contains("active")) {
        liEl.classList.add("active")
      }
    }

    // 如果当前点击的元素不是ul元素本身，则给当前点击的元素添加active类名
    if (event.target !== ulEl) {
      // event.target 事件发生对象 <-> 点击那个元素
      // event.currentTarget 当前处理的对象 <-> 绑定的点击事件
      event.target.classList.add("active")
    }
  }
  ```

  ```js
  // 1.获取元素
  var ulEl = document.querySelector("ul")

  // 2.给 ulEls 绑定点击事件
  ulEl.onclick = function (event) {
    // 🚚 方法二: 直接找到active的li,移除掉active
    var activeEl = ulEl.querySelector(".active")
    // 如果有这个active类,再移除active
    activeEl && event.target !== ulEl && activeEl.classList.remove("active")
    // 等价于 👆🏻代码
    // if (activeEl && event.target !== ulEl) {
    //   activeEl.classList.remove("active")
    // }

    // 2.2 给点击元素添加active
    // event.target 事件发生对象 <-> 点击那个元素
    // event.currentTarget 当前处理的对象 <-> 绑定的点击事件
    if (event.target !== ulEl) {
      event.target.classList.add("active") 
    }
  }
  ```

  ```js
  // 1.获取元素
  var ulEl = document.querySelector("ul")
  var activeEl = null

  // 2.给 ulEls 绑定点击事件
  ulEl.onclick = function (event) {
    // 🚚 方法三: 通过变量记录最新的active元素 ✅
    // 2.1 如果有active这个li，就移除他
    activeEl && event.target !== ulEl && activeEl.classList.remove("active")
    // if (activeEl && event.target !== ulEl) {
    //   activeEl.classList.remove("active")
    // }

    // 2.2 给点击元素添加active
    // event.target 事件发生对象 <-> 点击那个元素
    // event.currentTarget 当前处理的对象 <-> 绑定的点击事件
    if (event.target !== ulEl) { // 判断当前处理的对象是不是ulEl
      event.target.classList.add("active") 
    }

    // 2.3 记录最新的active对应的li
    activeEl = event.target
  }
  ```
  :::

## 6. 鼠标按下去再移动,鼠标抬起来停止移动

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var boxEl = document.querySelector(".box")

  // 2.记录鼠标是否点击下去
  var isDown = false

  // 3.监听boxEl元素的鼠标按下事件
  boxEl.onmousedown = function() {
    console.log("鼠标按下去")
    isDown = true
  }

  // 4.监听boxEl元素的鼠标弹起事件
  boxEl.onmouseup =  function() {
    console.log("鼠标弹起")
    isDown = false
  }

  // 5.监听boxEl元素的鼠标被移动事件
  boxEl.onmousemove = function() {
    if (isDown) {
      console.log("鼠标在box上移动")
    }
  }
  ```
  :::

## 7. 鼠标经过元素,显示该元素的内容

  ![interview](/interview_js_03.png)

  ```css
  .container {
    display: flex;
    width: 400px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
  }

  .container .item {
    flex: 1;
  }
  ```

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var body = document.body

  // 2.创建元素
  var boxEl = document.createElement("div")

  // 3.设置类
  boxEl.className = "container"

  // 4.插入到body中
  body.append(boxEl)

  // 5.封装工具类函数 --- 实现随机颜色
  function randomColor() {
    return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
  }

  // 6.循环遍历元素
  for (var i = 0; i < 4; i++) {
    // 6.1 创建元素
    var divEl = document.createElement("div")
    // 6.2 设置类
    divEl.className = "item"
    // 6.3 设置内容
    divEl.textContent = i + 1
    // 6.4设置随机颜色
    divEl.style.backgroundColor = randomColor()
    // 6.5 插入到boxEl中
    boxEl.append(divEl)

    // 🚚 监听的对象是divEl元素本身
    // 6.6 监听divEl元素的鼠标移动事件
    divEl.onmouseenter = function (event) {
      // console.log(this) // divEl
      // event.target 事件发生的对象 <-> 鼠标移动哪个元素上
      // event.currentTarget 当前处理的对象 <-> 绑定的点击事件
      // console.log(event.target === event.currentTarget) // true
      console.log(event.target.textContent)
    }
  }

  // ✈️ 事件委托 推荐使用 ✅
  // 7.监听鼠标移动到divEl元素上显示该元素的内容
  boxEl.onmouseover = function (event) {
    // console.log(this) // boxEl
    // event.target 事件发生的对象 <-> 鼠标移动哪个元素上
    // event.currentTarget 当前处理的对象 <-> 绑定的点击事件
    // console.log(event.target === event.currentTarget) // false
    console.log(event.target.textContent)
  }
  ```
  :::

  > **如果你在html已经创建好了👇🏻内容**

  ![interview](/interview_js_04.png)

  > **使用👇🏻**

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var boxEl = document.querySelector("div")

  // 2.封装工具类函数 --- 实现随机颜色
  function randomColor() {
    return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
  }

  // 3.循环遍历元素
  for (var divEl of boxEl) {
    // 3.1 创建元素
    divEl.textContent = i + 1

    // 3.2 设置随机颜色
    divEl.style.backgroundColor = randomColor()

    // 🚚 监听的对象是divEl元素本身 onmouseenter 不支持冒泡(不能使用事件委托)
    // 3.3 监听divEl元素的鼠标移动事件
    divEl.onmouseenter = function (event) {
      // console.log(this) // divEl
      // event.target 事件发生的对象 <-> 鼠标移动哪个元素上
      // event.currentTarget 当前处理的对象 <-> 绑定的点击事件
      // console.log(event.target === event.currentTarget) // true
      console.log(event.target.textContent)
    }
  }

  // ✈️ 事件委托 推荐使用 ✅  onmouseover 支持冒泡(不能使用事件委托)
  // 4.监听鼠标移动到divEl元素上显示该元素的内容
  boxEl.onmouseover = function (event) {
    // console.log(this) // boxEl
    // event.target 事件发生的对象 <-> 鼠标移动哪个元素上
    // event.currentTarget 当前处理的对象 <-> 绑定的点击事件
    // console.log(event.target === event.currentTarget) // false
    console.log(event.target.textContent)
  }
  ```
  :::



## 8. 实现搜索功能, 点击搜索按钮 / 按回车键 直接搜索

  ```html
  <input type="text">
  <button>搜索</button>
  ```

  ```js
  // 1.获取元素
  var inputEl = document.querySelector("input")
  var btnEl = document.querySelector("button")

  // 2.监听btnEl元素的点击事件
  btnEl.onclick = function () {
    console.log(`搜索${inputEl.value}`)
  }

  // 3.监听inputEl元素的键盘按下的回车事件
  inputEl.onkeydown = function (event) {
    // console.log(event.key) // "Enter"
    // console.log(event.code) //  "Enter"
    
    // 如果在inputEl元素中按下回车键,直接搜索
    if (event.code === "Enter") {
      console.log(`搜索${inputEl.value}`)
    }
  }
  ```

## 9. 按下 s 的时候，搜索自动获取焦点

  ```js
  // 1.获取元素
  var inputEl = document.querySelector("input")

  // 2.监听document的键盘按下事件
  document.onkeydown = function (event) {
    // console.log(event.code) // "KeyS" 推荐使用 ✅
    // console.log(event.key) // "s" || "S" 区分大小写

    if (event.code === "KeyS") {
      // 按下s(S)键,input表单自动聚焦
      inputEl.focus()
    }
  }
  ```

## 10. 轮播消息提示
  
  ![interview](/interview_js_05.png)

  ```html
  <div class="tip-bar">
    <img src="./images/avatar.png" alt="">
    <span>coderccb对这件商品感兴趣</span>
  </div>
  ```
  ![interview](/interview_js_06.png)

  ```css
  .tip-bar {
    display: inline-flex;
    align-items: center;
    height: 30px;
    background-color: rgba(0, 0, 0, .4);
    border-radius: 16px;
    box-sizing: border-box;
  }

  .tip-bar img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .tip-bar span {
    margin: 0 8px;
    font-size: 14px;
    color: #333;
  }
  ```

  > **按顺序每隔3s刷新一次数据**

  ::: details Click me to view the code js
  ```js
  // 1.从服务器拿到数据 ajax/fetch请求
  var tipList = [
    {
      icon: "https://tse4-mm.cn.bing.net/th/id/OIP-C.0KvO81VQ-QeWbGVRhT8E8wHaHa?w=209&h=209&c=7&r=0&o=5&dpr=2&pid=1.7",
      title: "167***348对这件商品感兴趣"
    },
    {
      icon: "https://p.qqan.com/up/2021-2/16123225767181974.jpg",
      title: "183***138对这件商品感兴趣"
    },
    {
      icon: "https://tse3-mm.cn.bing.net/th/id/OIP-C.aQRoVI_BQCO4ua8drGqu-gHaFj?w=257&h=193&c=7&r=0&o=5&dpr=2&pid=1.7",
      title: "193***788对这件商品感兴趣"
    }
  ]

  // 2.动态切换数据
  
  // 2.1 获取元素
  var tipbarEl = document.querySelector(".tip-bar")
  var imgEl = tipbarEl.querySelector("img")
  var spanEl = tipbarEl.querySelector("span")

  // 2.2 记住当前索引变量
  var currentIndex = Math.floor(Math.random() * tipList.length)

  // 2.2 每隔3s刷新一次数据
  setInterval(function () {

    // 2.2.1 如果当前索引 等于 数组长度,默认当前索引为0
    if (currentIndex === tipList.length) {
      currentIndex = 0
    }

    // 2.2.2 更新数据
    imgEl.src = tipList[currentIndex].icon
    spanEl.textContent = tipList[currentIndex].title

    // 2.2.3 当前索引自增
    currentIndex++
  }, 3000)
  ```
  :::

  > **随机每隔3s刷新一次数据**

  ::: details Click me to view the code js
  ```js
  // 1.从服务器拿到数据 ajax/fetch请求
  var tipList = [
    {
      icon: "https://tse4-mm.cn.bing.net/th/id/OIP-C.0KvO81VQ-QeWbGVRhT8E8wHaHa?w=209&h=209&c=7&r=0&o=5&dpr=2&pid=1.7",
      title: "167***348对这件商品感兴趣"
    },
    {
      icon: "https://p.qqan.com/up/2021-2/16123225767181974.jpg",
      title: "183***138对这件商品感兴趣"
    },
    {
      icon: "https://tse3-mm.cn.bing.net/th/id/OIP-C.aQRoVI_BQCO4ua8drGqu-gHaFj?w=257&h=193&c=7&r=0&o=5&dpr=2&pid=1.7",
      title: "193***788对这件商品感兴趣"
    }
  ]

  // 2.动态切换数据
  
  // 2.1 获取元素
  var tipbarEl = document.querySelector(".tip-bar")
  var imgEl = tipbarEl.querySelector("img")
  var spanEl = tipbarEl.querySelector("span")

  // 2.2 每隔3s刷新一次数据
  setInterval(function () {
    // 2.2.1 记住当前随机生成的索引
    var currentIndex = Math.floor(Math.random() * tipList.length)

    // 2.2.2 如果当前索引 等于 数组长度,默认当前索引为0
    if (currentIndex === tipList.length) {
      currentIndex = 0
    }

    // 2.2.3 更新数据
    imgEl.src = tipList[currentIndex].icon
    spanEl.textContent = tipList[currentIndex].title

    // 2.2.4 当前索引自增
    currentIndex++
  }, 3000)
  ```
  :::


## 11. 关闭隐藏消息

  ![interview](/interview_js_07.png)

  ::: details Click me to view the code css
  ```css
  /* 样式重置 */
  html,
  body,
  div,
  img,
  span {
    /* 去除默认样式 */
    margin: 0;
    padding: 0;
  }

  /* 布局样式 */
  .top-bar {
    display: flex;
    align-items: center;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    background-color: #333;
    /* 防止高度为0,其他内容没有隐藏 */
    overflow: hidden;
    /* 添加过渡动画 */
    transition: height .3s ease-out;
  }

  .top-bar .close {
    width: 8%;
  }

  .top-bar .close img {
    width: 10px;
    height: 10px;
    transition: prop time;
  }

  .top-bar .logo {
    width: 30px;
    height: 30px;
    margin: 0 4px;
  }

  .top-bar span {
    flex: 1;
    height: 45px;
    padding-top: 2px;
    box-sizing: border-box;
  }

  .top-bar .btn {
    width: 25%;
    height: 45px;
    padding-top: 2px;
    box-sizing: border-box;
    background-color: #F63515;
  }
  ```
  :::

  ```html
  <div class="top-bar">
    <div class="close">
      <img src="https://m.360buyimg.com/mobilecms/jfs/t19480/10/1439571805/820/787bec2c/5ac9d730N04e6d766.png" alt="">
    </div>
    <img src="https://img13.360buyimg.com/img/jfs/t1/185008/26/33606/2587/641973cbFd5acd3e9/ad0294917f47e6b8.png"
      alt="京东" class="logo">
    <span>打开京东APP，实惠又轻松</span>
    <div class="btn">立即打开</div>
  </div>
  ```

  > **🚚: 直接删除,没有动画效果**

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var topbarEl = document.querySelector(".top-bar")
  var closeEl = topbarEl.querySelector(".close")

  // 2.监听closeEl元素的点击事件
  closeEl.onclick = function () {
    // 删除元素
    topbarEl.remove() 
  }
  ```
  :::

  > **🚚: 有动画效果,需要设置高度为0,定时器移除,但是定时器的时间必须跟动画保持一致**

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var topbarEl = document.querySelector(".top-bar")
  var closeEl = topbarEl.querySelector(".close")

  // 2.监听closeEl元素的点击事件
  closeEl.onclick = function () {

    // 2.1 有动画效果,需要设置高度为0
    topbarEl.style.height = 0

    // 2.2 定时器移除,但是定时器的时间必须跟动画保持一致
    setTimeout(function () {
      topbarEl.remove()
    }, 300)      
  }

  ```
  :::

  > **🚚: 有动画效果,需要设置高度为0,利用动画结束事件 transitionend 清除元素**

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var topbarEl = document.querySelector(".top-bar")
  var closeEl = topbarEl.querySelector(".close")

  // 2.监听closeEl元素的点击事件
  closeEl.onclick = function () {

    // 1.有动画效果,需要设置高度为0
    topbarEl.style.height = 0
  }

  // ✈️: 2.利用动画结束事件 transitionend事件的事件处理函数，在某个CSS过渡完成时触发。
  topbarEl.ontransitionend = function() {
    // 删除元素
    this.remove()
  }
  ```
  :::

## 12. 侧边栏展示

  ![interview](/interview_js_08.png)

  ```html
  <div class="tool-bar">
    <div class="item">
      <i class="icon"></i>
      <div class="name">购物车</div>
    </div>
    <div class="item">
      <i class="icon"></i>
      <div class="name">收藏</div>
    </div>
    <div class="item">
      <i class="icon"></i>
      <div class="name">限时活动</div>
    </div>
    <div class="item">
      <i class="icon"></i>
      <div class="name">大礼包</div>
    </div>
  </div>
  ```

  > **通过css实现效果**

  ::: details Click me to view the code css
  ```css
  /* 样式重置 */
  /* 样式重置 */
  html,
  body,
  div,
  i {
    /* 去除默认样式 */
    margin: 0;
    padding: 0;
  }

  .tool-bar {
    position: fixed;
    top: 30%;
    right: 0;
    width: 35px;
    display: flex;
    /* 改变主轴的方向 y */
    flex-direction: column;
  }

  .tool-bar .item {
    position: relative;
    height: 35px;
    margin-bottom: 1px;
    background-color: #7a6e6e;
    border-radius: 3px 0 0 3px;
    /* 鼠标小手 */
    cursor: pointer;
  }

  /* ✈️ 通过js实现鼠标经过元素，减少csS代码！！！ */
  .tool-bar .item:hover .name,
  .tool-bar .item:hover .icon {
    background-color: #cd1926;
  }

  .tool-bar .item:hover .name {
    width: 62px;
  }

  .tool-bar .item .icon {
    display: inline-block;
    width: 100%;
    height: 100%;
    background-image: url(./images/toolbars.png);
    /* 🔥 由于精灵图排放位置，所以x轴为(-48px）不变，y轴(0) *50 */
    background-position: -48px 0;
  }

  /* ✈️ 通过js实现精灵图的排放位置，减少csS代码！！！ */
  .tool-bar .item:nth-child(2) .icon {
    background-position: -48px -50px;
  }

  .tool-bar .item:nth-child(3) .icon {
    background-position: -48px -100px;
  }

  .tool-bar .item:nth-child(4) .icon {
    background-position: -48px -150px;
  }

  .tool-bar .item .name {
    position: absolute;
    top: 0;
    right: 35px;
    width: 0;
    /* width: 62px; */
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    background-color: #7a6e6e;
    border-radius: 3px 0 0 3px;
    /* 在默认收缩 width为0 的情况下,隐藏文字 */
    /* 🚚 隐藏文字 */
    /* overflow: hidden; */
    /* 🚚 定位层叠 */
    z-index: -1;
    /* 添加动画 */
    transition: width .2s ease;
  }
  ```
  :::
  
  > **动态给 icon 设置backgroundPosition**
    
  ![interview](/interview_js_09.png)
  
  ![interview](/interview_js_10.png)

  ::: details Click me to view the code css
  ```js
  // 1.获取元素
  var toolbarEl = document.querySelector(".tool-bar")
  var iconEls = document.querySelectorAll(".icon")

  // 2.循环遍历元素,给每个 icon 设置 background-position
  for (var i = 0; i < iconEls.length; i++) {
    iconEls[i].style.backgroundPosition = `-48px ${-50 * i}px`
  }
  ```
  :::

  > **实现鼠标进入动画**

  1. 事件委托 onmouseover / onmouseout 鼠标经过/离开事件

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var toolbarEl = document.querySelector(".tool-bar")

  // 2.监听toolbarEl的鼠标经过事件
  toolbarEl.onmouseover = function (event) {
    handleMouseEvent(event, "#cd1926", "62px")
  }

  // 3.监听toolbarEl的鼠标离开事件
  toolbarEl.onmouseout = function (event) {
    handleMouseEvent(event, "#7a6e6e")
  }

  // 4.封装工具类函数 ---- 实现鼠标在元素上经过和离开
  function handleMouseEvent(event, backgroundColor, width) {
    // event.target 事件发生的对象 <-> 鼠标移动哪个元素上
    // event.currentTarget 当前处理的对象 <-> 绑定的点击事件

    if (event.target !== this) {
      /* // 获取唯一的item
      var itemEl = null
      if (event.target.classList.contains("item")) {
        itemEl = event.target
      } else {
        itemEl = event.target.parentElement
      } */

      // 获取itemEl元素(// 等价于👆🏻 如果当前元素有item这个类,就直接返回当前元素,如果没有,就返回当前元素的父元素)
      var itemEl = event.target.classList.contains("item") ? event.target : event.target.parentElement

      // 获取iconEl元素
      var iconEl = itemEl.children[0]

      // 获取nameEl元素
      var nameEl = itemEl.children[1]

      // 设置iconEl的背景颜色
      iconEl.style.backgroundColor = backgroundColor

      // 设置nameEl的背景颜色
      nameEl.style.backgroundColor = backgroundColor

      // 设置nameEl的宽度(将值设置为空字符串,那么会使用CSS的默认样式),如果不传入参数,使用默认值 输入
      nameEl.style.width = width || ""
    }
  }
  ```
  :::

  2. mouseenter(不能使用事件委托)

  ::: details Click me to view the code css 
  ```js
  // 1.获取元素
  var itemEls = document.querySelectorAll(".item")


  // 2.循环遍历元素
  for (var itemEl of itemEls) {
    // 2.1 监听itemEl元素的鼠标经过事件
    itemEl.onmouseenter = function (event) {
      handleMouseEvent(event, "#cd1926", "62px")
    }

    // 2.2 监听itemEl元素的鼠标离开事件
    itemEl.onmouseleave = function (event) {
      handleMouseEvent(event, "#7a6e6e")
    }

    // 2.3 封装工具类函数 --- 实现在元素的鼠标经过/离开
    function handleMouseEvent(event, backgroundColor, width) {
      // 获取iconEl,nameEl元素
      var iconEl = this.children[0]
      var nameEl = this.children[1]

      // 设置iconEl,nameEl的背景颜色
      iconEl.style.backgroundColor = backgroundColor
      nameEl.style.backgroundColor = backgroundColor

      // 设置nameEl的宽度(将值设置为空字符串,那么会使用CSS的默认样式)
      nameEl.style.width = width || ""
    }
  }
  ```
  :::

## 13. 说出mouseenter和mouseover的区别

  - mouseenter

    - 不会冒泡 
  
    - 进入子元素的时候不会有任何行为

  - mouseover

    - 会进行冒泡行为

    - 进入子元素 会先out父元素 在over子元素 在over父元素

## 14. 说说load和DOMContentLoaded的区别

  - load: 浏览器加载完所有的HTML 还加载完所有的外部资源 样式 图⽚等

  - DOMContentLoaded: HTML⽂档所有资源都加载完成 并构建了DOM树 但是⼀些外部资源还没有加载完成 如图⽚的src

## 15. 王者荣耀tabControl切换

  ![interview](/interview_js_12.png)

  ::: details Click me to view the code html 
  ```html
  <div class="tab_control">
    <div class="item active">精品栏目</div>
    <div class="line"></div>
    <div class="item">赛事精品</div>
    <div class="line"></div>
    <div class="item">英雄攻略</div>
  </div>
  ```
  :::

  ::: details Click me to view the code css
  ```css
  /* 样式重置 */
  html,
  body,
  div {
    /* 去除默认样式 */
    margin: 0;
    padding: 0;
  }

  /* 布局样式 */
  .tab_control {
    display: flex;
    width: 872px;
    /* margin: 0 auto; */
    /* margin-bottom: 13px; */
    margin: 100px auto 13px;
    background-color: #f5f5f5;
  }

  .tab_control .item {
    flex: 1;
    height: 32px;
    box-sizing: border-box;
    text-align: center;
    line-height: 29px;
    font-size: 14px;
    color: #999;
    border-bottom: 3px solid transparent;
    /* 鼠标小手 */
    cursor: pointer;
    /* 添加动画 */
    transition: all .3s ease-in;
  }

  .tab_control .item.active {
    color: #333;
    border-color: #f3c258;
  }

  .tab_control .line {
    width: 1px;
    height: 20px;
    margin: 5px 0;
    background-color: #e1e1e1;
  }
  ```
  :::

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var tabControlEl = document.querySelector(".tab_control")
  var activeEl = tabControlEl.querySelector(".active")

  // 2.监听tabControlEl元素在鼠标上经过的事件(事件委托)
  tabControlEl.onmouseover = function (event) {
    // 2.1 确定发生鼠标经过的元素
    var itemEl = event.target
    if (!itemEl.classList.contains("item")) return

    // 2.2 移除之前的active
    activeEl.classList.remove("active")

    // 2.3 将active添加到鼠标经过的元素
  itemEl.classList.add("active")

    // 2.4 让activeEl指向最新的元素
    activeEl = itemEl
  }
  ```
  :::

## 16. 登录框

  ![interview](/interview_js_13.png)

  ::: details Click me to view the code html 
  ```html
  <div class="box">
    <h1 class="title">登录页面</h1>
    <!-- 提示文本 -->
    <div class="error hidden">
      <i class="err-icon"></i>
      <span class="err-msg">用户名或密码不能为空</span>
    </div>
    <!-- 用户名 -->
    <div class="user-item">
      <label for="username" class="user-icon"></label>
      <input id="username" type="username" placeholder="邮箱/用户名/登录手机">
      <span class="u-clear"></span>
    </div>
    <!-- 密码 -->
    <div class="password-item">
      <label for="password" class="pwd-icon"></label>
      <input id="password" type="password" placeholder="密码">
      <span class="eye-icon"></span>
      <span class="p-clear"></span>
    </div>
    <!-- 登录 -->
    <div class="login">登录</div>
  </div>
  ```
  :::

  ::: details Click me to view the code css
  ```css
  html,
  body,
  div,
  h1,
  i,
  span,
  input {
    /* 去除默认样式 */
    margin: 0;
    padding: 0;
  }

  input {
    /* 去除边框 */
    border: none;
    /* 不要外轮廓 */
    outline: none;
  }

  /* 布局代码 */
  .box {
    width: 304px;
    margin: 100px auto;
    text-align: center;
  }

  /* 1.标题 */
  .box .title {
    margin-bottom: 8px;
  }

  /* 2.提示文本 */
  .box .error {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    background-color: #ffebeb;
    padding: 5px 0;
    color: #e4393c;
    border: 1px solid #faccc6;
  }

  .box .error.hidden {
    visibility: hidden;
  }

  .box .error .err-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: 10px;
    background: url(./images/css_sprites.png) no-repeat -114px -59px;
  }

  .box .error .err-msg {
    margin-left: 10px;
    font-size: 12px;
  }

  /* 3.用户名/密码 */
  .box .user-item,
  .box .password-item {
    position: relative;
    display: flex;
    height: 38px;
    margin-bottom: 8px;
    border: 1px solid #bdbdbd;
  }

  .box .user-item .user-icon,
  .box .password-item .pwd-icon {
    width: 38px;
    height: 38px;
    background: url(./images/css_sprites.png) no-repeat -10px -10px;
    border-right: 1px solid #bdbdbd;
  }

  .box .user-item input,
  .box .password-item input {
    flex: 1;
    padding: 10px 0 10px 12px;
    font-size: 14px;
  }

  .box .user-item .u-clear,
  .box .password-item .p-clear {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translate(0, -50%);
    width: 14px;
    height: 14px;
    background: url(./images/css_sprites.png) -36px -154px;
  }

  .box .password-item .eye-icon {
    position: absolute;
    right: 27px;
    top: 15px;
    width: 25px;
    height: 15px;
    background: url(./images/css_sprites.png) no-repeat -152px -18px;
  }

  /* 4.登录 */
  .box .login {
    height: 32px;
    line-height: 32px;
    font-size: 20px;
    color: #fff;
    background-color: #e4393c;
    border: 1px solid #cb2a2d;
  }
  ```
  :::

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var boxEl = document.querySelector(".box")
  var errorEl = boxEl.querySelector(".error")
  var uClearEl = boxEl.querySelector(".u-clear")
  var pClearEl = boxEl.querySelector(".p-clear")
  var usernameInputEl = boxEl.querySelector("#username")
  var passwordInputEl = boxEl.querySelector("#password")
  var eyeIconEl = boxEl.querySelector(".eye-icon")
  var loginEl = boxEl.querySelector(".login")


  // 2.监听loginEl元素的点击
  loginEl.onclick = function (event) {
    // 如果表单没有输入直接提示并直接返回
    if (!usernameInputEl.value || !passwordInputEl.value) {
      errorEl.classList.remove("hidden")
      return
    }
  }

  // 3.监听uClearEl元素的点击
  uClearEl.onclick = function () {
    // 清除表单内容
    usernameInputEl.value = ""
  }

  // 4.监听pClearEl元素的点击
  pClearEl.onclick = function () {
    // 清除表单内容
    passwordInputEl.value = ""
  }

  // 5.记住当前开眼/闭眼状态
  var isFlag = false
  // 6.监听eyeIconEl元素的点击
  eyeIconEl.onclick = function () {
    isFlag = !isFlag
    // if (isFlag) {
    //   passwordInputEl.type = "text"
    //   this.style.backgroundPosition = "-150px -60px"
    //   this.style.top = "13px"
    // } else {
    //   passwordInputEl.type = "password"
    // 将值设置为空字符串,那么会使用CSS的默认样式
    //   this.style.backgroundPosition = ""
    // }

    // 等价于👆🏻注释代码
    passwordInputEl.type = isFlag ? "text" : "password"
    // 将值设置为空字符串,那么会使用CSS的默认样式
    this.style.backgroundPosition = isFlag ? "-150px -60px" : ""
    // 将值设置为空字符串,那么会使用CSS的默认样式
    this.style.top = isFlag ? "13px" : ""
  }
  ```
  :::

## 17. 普通轮播图

  ![interview](/interview_js_14.png)

  ::: details Click me to view the code html 
  ```html
  <div class="banner">
    <!-- 图片数据 -->
    <ul class="image-list">
      <li class="item">
        <a href="#">
          <img src="./images/banner_01.jpeg" alt="星梦皮肤大赛">
        </a>
      </li>
      <li class="item">
        <a href="#">
          <img src="./images/banner_02.jpeg" alt="全国大赛赛程">
        </a>
      </li>
      <li class="item">
        <a href="#">
          <img src="./images/banner_03.jpeg" alt="K甲夏季赛赛程">
        </a>
      </li>
      <li class="item">
        <a href="#">
          <img src="./images/banner_04.jpeg" alt="全民单挑赛招募">
        </a>
      </li>
      <li class="item">
        <a href="#">
          <img src="./images/banner_05.jpeg" alt="王者萌萌假日">
        </a>
      </li>
    </ul>
    <!-- 列表数据 -->
    <ul class="title-list">
      <li class="item active">
        <a href="#">星梦皮肤大赛</a>
      </li>
      <li class="item">
        <a href="#">全国大赛赛程</a>
      </li>
      <li class="item">
        <a href="#">K甲夏季赛赛程</a>
      </li>
      <li class="item">
        <a href="#">全民单挑赛招募</a>
      </li>
      <li class="item">
        <a href="#">王者萌萌假日</a>
      </li>
    </ul>
  </div>
  ```
  :::

  ::: details Click me to view the code css 
  ```css
  /* 样式重置 */
  html,
  body,
  div,
  ul,
  li,
  a,
  img {
    /* 去除默认样式 */
    margin: 0;
    padding: 0;
  }

  ul,
  li {
    /* 去除小圆点 */
    list-style: none;
  }

  a {
    /* 不要下划线 */
    text-decoration: none;
    /* 不要外轮廓 */
    outline: none;
  }

  img {
    vertical-align: top;
  }

  /* 布局代码 */
  .banner {
    width: 604px;
    margin: 100px auto;
    /* 超出隐藏 */
    overflow: hidden;
  }

  /* 1.图片数据 */
  .banner .image-list {
    display: flex;
  }

  .banner .image-list .item {
    flex-shrink: 0;
  }

  .banner .image-list .item a {
    display: inline-block;
  }

  .banner .image-list .item a img {
    width: 100%;
    height: 100%;
  }

  /* 2.标题数据 */
  .banner .title-list {
    display: flex;
  }

  .banner .title-list .item {
    flex: 1;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #000;
  }

  .banner .title-list .item a {
    display: block;
    font-size: 14px;
    color: #b1b2be;
  }

  .banner .title-list .item.active a {
    color: #f3c258;
  }
  ```
  :::

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var bannerEl = document.querySelector(".banner")
  var imageListEl = bannerEl.querySelector(".image-list")
  var titleListEl = bannerEl.querySelector(".title-list")

  // 2.记录一些常见的变量
  var currentIndex = 0 // 当前索引
  var activeEl = titleListEl.querySelector(".active") // 选中的标题
  var timeID = null // 定时器

  // 3.自动轮播
  startTime()

  // 4.鼠标经过titleEl元素
  titleListEl.onmouseover = function (event) {
    // 4.1 获取itemEl元素
    var itemEl = event.target.parentElement
    if (!itemEl.classList.contains("item")) return

    // 4.2 鼠标经过itemEl元素显示对应索引的图片
    // 获取索引
    
    var index = Array.from(this.children).findIndex(function (item) {
      return item === itemEl
    })

    // 记录最新的索引
    currentIndex = index

    // 切换轮播图
    switchBanner()
  }

  // 5.鼠标经过banner元素,停止定时器
  bannerEl.onmouseenter = function () {
    clearInterval(timeID)
  }

  // 6.鼠标离开bannerEl元素时,开启定时器
  bannerEl.onmouseleave = function() {
    startTime()
  }

  // 5.切换轮播图
  function switchBanner() {
    // 自动轮播图片
    imageListEl.style.transform = `translate(${-currentIndex * 604}px, 0)`;
    imageListEl.style.transition = `all .3s ease`

    // 4.3 鼠标经过itemEl元素显示对应索引的标题
    // 移除之前的active
    activeEl.classList.remove("active")

    // 添加active
    var itemEl = titleListEl.children[currentIndex]
    itemEl.classList.add("active")

    // 记住最新的active
    activeEl = itemEl
  }

  // 6.定时器
  function startTime() {
    timeID = setInterval(function () {
      currentIndex++
      if (currentIndex === imageListEl.children.length) currentIndex = 0

      // 切换轮播图
      switchBanner()
    }, 3000)
  }
  ```
  :::

  ## 18. 定位轮播图
  
  ![interview](/interview_js_14.png)

  ::: details Click me to view the code css
  ```css
  /* 图片数据 */
  .banner .image-list {
    position: relative;
    height: 298px;
    overflow: hidden;
  }

  .banner .image-list .item {
    position: absolute;
    left: 100%;
    width: 100%;
  }

  .banner .image-list .item:first-child {
    left: 0;
  }
  ```
  :::

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  var bannerEl = document.querySelector(".banner")
  var imageListEl = bannerEl.querySelector(".image-list")
  var titleListEl = bannerEl.querySelector(".title-list")

  // 2.定义一些常见的变量
  var activeEl = titleListEl.querySelector(".active") // 选中标题
  var currentIndex = 0 // 当前索引
  var previousIndex = 0 // 上一个索引
  var timeID = null // 定时器

  // 3.自动轮播
  startTimer()

  // 4.鼠标经过titleListEl元素
  titleListEl.onmouseover = function (event) {
    var itemEl = event.target.parentElement
    if (!itemEl.classList.contains("item")) return
    // 获取索引
    var index = Array.from(this.children).findIndex(function (item) {
      return itemEl === item
    })

    currentIndex = index

    // 切换轮播图
    switchBanner()
  }

  // 5.鼠标经过banner元素,停止定时器
  bannerEl.onmouseenter = function () {
    clearInterval(timeID)
  }

  bannerEl.onmouseleave = function() {
    startTimer()
  }

  // 切换轮播图
  function switchBanner() {
    // 3.2 图片自动轮播
    for (var i = 0; i < imageListEl.children.length; i++) {
      var itemEl = imageListEl.children[i]
      // currentIndex 和 previousIndex 有动画
      if (i === currentIndex) {
        itemEl.style.left = "0"
        itemEl.style.transition = "left 300ms ease"
      } else if (i > currentIndex) {
        if (i !== previousIndex) {
          itemEl.style.transition = "none"
        }
        itemEl.style.left = "100%"
      } else {
        if (i !== previousIndex) {
          itemEl.style.transition = "none"
        }
        itemEl.style.left = "-100%"
      }
    }

    // 3.3 标题自动轮播
    // 移除之前的active
    activeEl.classList.remove("active")

    // 添加active
    var currentItemEl = titleListEl.children[currentIndex]
    currentItemEl.classList.add("active")

    // 记录最新的activeEl
    activeEl = currentItemEl
  }

  // 定时器
  function startTimer() {
    timeID = setInterval(function () {
      // 3.1 记住最新的上一个索引
      previousIndex = currentIndex
      currentIndex++
      if (currentIndex === imageListEl.children.length) currentIndex = 0

      // 切换轮播图
      switchBanner()
    }, 3000)
  }
  ```
  :::