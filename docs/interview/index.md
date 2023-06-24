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

  ## 19. 书籍购物车

  ![interview](/interview_js_15.png)

  ::: details Click me to view the code html
  ```html
  <table>
    <thead>
      <th>编号</th>
      <th>书籍名词</th>
      <th>出版日期</th>
      <th>价格</th>
      <th>购买数量</th>
      <th>操作</th>
    </thead>
    <tbody></tbody>
  </table>

  <h2 class="price">总价格: ¥<span class="price-count">0</span></h2>
  ```
  :::
  ::: details Click me to view the code css
  ```css
  table {
    /* 合并边框 */
    border-collapse: collapse;
  }

  th,
  td {
    padding: 5px 20px;
    text-align: center;
    border: 1px solid #000;
  }
  ```
  :::
  ::: details Click me to view the code js
  ```js
  var books = [
    {
      id: 1,
      name: '《算法导论》',
      date: '2006-09',
      price: 85.00,
      count: 3
    },
    {
      id: 2,
      name: '《UNIX编程艺术》',
      date: '2006-02',
      price: 59.00,
      count: 2
    },
    {
      id: 3,
      name: '《编程珠玑》',
      date: '2008-10',
      price: 39.00,
      count: 5
    },
    {
      id: 4,
      name: '《代码大全》',
      date: '2006-03',
      price: 128.00,
      count: 8
    }
  ]
  // 1.获取元素
  var tbodyEl = document.querySelector("tbody")
  var priceEl = document.querySelector(".price-count")

  // 2.循环动态创建表格
  for (var i = 0; i < books.length; i++) {
    // 2.1 创建tr元素
    var rowEl = document.createElement("tr")

    var book = books[i] // {...}

    for (var j in book) {
      // 创建td元素
      var cellEl = document.createElement("td")

      var value = book[j]

      if (j === "price") {
        value = "¥" + value
      }

      // 设置td元素内容
      cellEl.textContent = value

      // 插入到tr中
      rowEl.append(cellEl)
    }

    // 创建删除按钮的td元素
    var deleteCell = document.createElement("td")
    // 创建删除按钮的button元素
    var deleteEl = document.createElement("button")

    // 设置删除按钮的内容
    deleteEl.textContent = "删除"

    // 删除按钮button插入删除按钮的td
    deleteCell.append(deleteEl)

    // 删除按钮的td插入到tr
    rowEl.append(deleteCell)

    // 监听删除按钮的点击
    deleteEl.onclick = function (event) {
      // 当前行
      var currentCell = event.target.parentElement.parentElement
      // 当前行的索引
      var currentIndex = currentCell.sectionRowIndex

      // 删除tr
      currentCell.remove()

      // 删除books中的数据
      books.splice(currentIndex, 1)

      // 重新计算总价格
      totalPrice()
    }

    // 计算总价格
    totalPrice()


    // 定义计算总价格函数
    function totalPrice() {
      var total = 0

      // 计算总和方法:
      // 🚚 for 循环
      // for (var i = 0; i < books.length; i++) {
      // total += books[i].price * books[i].count
      // }

      // ✈️  arr.reduce
      total = books.reduce(function(preValue, item) {
        return preValue + item.price * item.count
      }, 0)

      priceEl.textContent = total
    }

    // 2. 插入到tbodyEl中
    tbodyEl.append(rowEl)

  }
  ```
  :::

## 20. 商品过滤的算法
  
  ![interview](/interview_js_16.png)
  
  ::: details Click me to view the code js
  ```js
  var infos = [
    { name: "ccb", friends: ["abc", "cba"] },
    { name: "kobe", friends: ["nba", "cba"] },
    { name: "james", friends: ["nba", "cba", "abc"] }
  ]

  var filters = ["abc", "cba"]

  var filterInfos = infos.filter(function(item) {
    var isFlag = true
    var friends = item.friends

    for (var filterItemEl of filters) {
      if (!friends.includes(filterItemEl)) {
        isFlag = false
        break
      }
    }
    return isFlag
  })

  console.log(filterInfos)
  ```
  :::

## 21. 颜色过滤的算法

  ![interview](/interview_js_17.png)

  ::: details Click me to view the code html
  ```html
  <div class="box">
    <button>red</button>
    <button>yellow</button>
    <button>blue</button>
  </div>

  <ul></ul>
  ```
  :::

  ::: details Click me to view the code css
  ```css
  .box button {
    /* 鼠标小手 */
    cursor: pointer;
  }

  .box button.active {
    color: #f00;
  }
  ```
  :::

  ::: details Click me to view the code js
  ```js
  // 1.默认大量的数据
  var students = [
    { name: "小明", colors: ["red", "blue", "green"] },
    { name: "小王", colors: ["orange", "yellow", "red"] },
    { name: "小龙", colors: ["purple", "yellow", "black"] },
    { name: "小李", colors: ["red", "orange", "blue"] }
  ]

  // 2.点击按钮,按钮变成选中状态
  var boxEl = document.querySelector(".box")

  // 3.定义变量
  var filters = [] // 记录用户选中的颜色
  var filterStudents = students // 筛选后的数据

  // 4.点击按钮慢变成选中状态
  boxEl.onclick = function (event) {
    if (event.target === this) return

    // 切换active
    event.target.classList.toggle("active")

    // 修改filters
    if (event.target.classList.contains("active")) {
      filters.push(event.target.textContent.trim())
    } else {
      var filterItem = event.target.textContent.trim()
      var index = filters.findIndex(function (item) {
        return item === filterItem
      })
      filters.splice(index, 1)
    }

    // 过滤数据
    filterStudentsAction()
  }

  // 封装函数: 过滤数据
  function filterStudentsAction() {
    // ✈️ 方法一: filter
    // filterStudents = students.filter(function (item) {
    //   var isFlag = true
    //   var colors = item.colors
    //   for (var itemEl of filters) {
    //     if (!colors.includes(itemEl)) {
    //       isFlag = false
    //       break
    //     }
    //   }
    //   return isFlag
    // })

    // 🚚 方法二: for...of
    filterStudents = []
    for (var stu of students) {
      var colors = stu.colors
      var isFlag = true
      for (var itemEl of filters) {
        if (!colors.includes(itemEl)) {
          isFlag = false
          break
        }
      }
      if (isFlag === true) {
        filterStudents.push(stu)
      }
    }

    // 展示数据
    showStudentsAction()
  }

  // 封装函数: 展示数据
  var ulEl = document.querySelector("ul")
  showStudentsAction()
  function showStudentsAction() {
    ulEl.innerHTML = ""
    for (var i = 0; i < filterStudents.length; i++) {
      var liEl = document.createElement("li")
      liEl.textContent = filterStudents[i].name
      ulEl.append(liEl)
    }
  }
  ```
  :::

## 22. 华为商城的商品过滤

  ![interview](/interview_js_18.png)

  > **https://djhwsab.github.io/products_Filters/**

### 1. 界面搭建

  ::: details Click me to view the code html
  ```html
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 样式重置 -->
    <link rel="stylesheet" href="./css/rest.css">
    <!-- 公共样式 -->
    <link rel="stylesheet" href="./css/common.css">
    <!-- 商品列表 -->
    <link rel="stylesheet" href="./css/product.css">
  </head>

  <body>
    <!-- 版心 -->
    <div class="wrapper">
      <!-- crumbs 面包屑(导航) -->
      <div class="crumbs">
        <span class="item">首页</span>
        <span>&gt;</span>
        <span class="item">笔记本</span>
      </div>

      <!-- 对内容进行操作(operation) -->
      <div class="operation">
        <!-- 分类 -->
        <ul class="row category">
          <li class="item">分类 ：</li>
          <li class="item active">笔记本</li>
          <li class="item">MateBook E系列</li>
          <li class="item">MateBook D系列</li>
          <li class="item">MateBook X系列</li>
          <li class="item">华为显示器系列</li>
          <li class="item">MateBook B系列</li>
          <li class="item nowrap_ellipsis">MateBook数字系列</li>
        </ul>
        <!-- 优惠 -->
        <ul class="row discount">
          <li class="item">服务优惠 ：</li>
          <li class="item">仅看有货</li>
          <li class="item">分期免息</li>
          <li class="item">优惠商品</li>
        </ul>
        <!-- 排序 -->
        <ul class="row sort">
          <li class="item">排序 ：</li>
          <li class="item active">综合</li>
          <li class="item">最新</li>
          <li class="item">评论数</li>
          <li class="item">价格</li>
        </ul>
      </div>

      <!-- 商品列表部分 -->
      <ul class="products">
        <li class="item">
          <a href="#">
            <!-- 封面 -->
            <img class="album" src="./img/product_01.webp" alt="">
            <!-- 名字 -->
            <div class="name">
              <i class="new">新品</i>
              <span class="title nowrap_ellipsis">HUAWEI MateBook 16s 2023</span>
            </div>
            <!-- 描述 -->
            <div class="describe nowrap_ellipsis">2.5K高色准触控屏,13代酷睿处理器</div>
            <!-- 服务 -->
            <div class="service">
              <span class="tip">至高省200元 13代酷睿</span>
            </div>
            <!-- 价格 -->
            <div class="price">
              <span class="new-price">¥9999</span>
            </div>
            <!-- 评论 -->
            <div class="comment">
              <span>163人评价</span>
              <span>95%好评</span>
            </div>
          </a>
        </li>
        <li class="item">
          <a href="#">
            <!-- 封面 -->
            <img class="album" src="./img/product_02.webp" alt="">
            <!-- 名字 -->
            <div class="name">
              <i class="new">新品</i>
              <span class="title nowrap_ellipsis">HUAWEI MateBook 16s 2023</span>
            </div>
            <!-- 描述 -->
            <div class="describe nowrap_ellipsis">2K触控全面屏，13代酷睿处理器，超级终端</div>
            <!-- 服务 -->
            <div class="service">
              <span class="tip">新品至高省200元 13代酷睿</span>
            </div>
            <!-- 价格 -->
            <div class="price">
              <span class="new-price">¥5799</span>
              <span class="old-price">¥5999</span>
            </div>
            <!-- 评论 -->
            <div class="comment">
              <span>225人评价</span>
              <span>98%好评</span>
            </div>
          </a>
        </li>
        <li class="item">
          <a href="#">
            <!-- 封面 -->
            <img class="album" src="./img/product_03.webp" alt="">
            <!-- 名字 -->
            <div class="name">
              <i class="new">新品</i>
              <span class="title nowrap_ellipsis">HUAWEI MateBook X Pro 2023</span>
            </div>
            <!-- 描述 -->
            <div class="describe nowrap_ellipsis">微绒/金属机身，3.1K原色全面屏，至高32G+2TB</div>
            <!-- 服务 -->
            <div class="service">
              <span class="tip">至高立省1400元</span>
            </div>
            <!-- 价格 -->
            <div class="price">
              <span class="new-price">¥13999</span>
            </div>
            <!-- 评论 -->
            <div class="comment">
              <span>167人评价</span>
              <span>96%好评</span>
            </div>
          </a>
        </li>
        <li class="item">
          <a href="#">
            <!-- 封面 -->
            <img class="album" src="./img/product_04.webp" alt="">
            <!-- 名字 -->
            <div class="name">
              <i class="new">新品</i>
              <span class="title nowrap_ellipsis">HUAWEI MateBook E 2023款</span>
            </div>
            <!-- 描述 -->
            <div class="describe nowrap_ellipsis">二合一笔记本丨120Hz OLED原色屏</div>
            <!-- 服务 -->
            <div class="service">
              <span class="tip">限时降100 | 12期0分期利息</span>
            </div>
            <!-- 价格 -->
            <div class="price">
              <span class="new-price">¥7399</span>
              <span class="old-price">¥7499</span>
            </div>
            <!-- 评论 -->
            <div class="comment">
              <span>298人评价</span>
              <span>98%好评</span>
            </div>
          </a>
        </li>
        <li class="item">
          <a href="#">
            <!-- 封面 -->
            <img class="album" src="./img/product_05.webp" alt="">
            <!-- 名字 -->
            <div class="name">
              <span class="title nowrap_ellipsis">HUAWEI MateBook D 14 系列</span>
            </div>
            <!-- 服务 -->
            <div class="service">
              <span class="tip">限时直降100元</span>
              <span class="tip">增积分</span>
            </div>
            <!-- 价格 -->
            <div class="price">
              <span class="new-price">¥4599</span>
              <span class="old-price">¥4699</span>
            </div>
            <!-- 评论 -->
            <div class="comment">
              <span>7人评价</span>
              <span>86%好评</span>
            </div>
          </a>
        </li>
        <li class="item">
          <a href="#">
            <!-- 封面 -->
            <img class="album" src="./img/product_06.webp" alt="">
            <!-- 名字 -->
            <div class="name">
              <i class="new">价保618</i>
              <span class="title nowrap_ellipsis">HUAWEI MateBook D 16</span>
            </div>
            <!-- 描述 -->
            <div class="describe nowrap_ellipsis">16''护眼全面屏，13代酷睿标压处理器，超级终端</div>
            <!-- 服务 -->
            <div class="service">
              <span class="tip">限时直降600元</span>
              <span class="tip">3期0分期利息</span>
              <span class="tip">赠积分</span>
            </div>
            <!-- 价格 -->
            <div class="price">
              <span class="new-price">¥4999</span>
              <span class="old-price">¥5599</span>
            </div>
            <!-- 评论 -->
            <div class="comment">
              <span>4437人评价</span>
              <span>94%好评</span>
            </div>
          </a>
        </li>
        <li class="item">
          <a href="#">
            <!-- 封面 -->
            <img class="album" src="./img/product_07.webp" alt="">
            <!-- 名字 -->
            <div class="name">
              <i class="new">新品</i>
              <span class="title nowrap_ellipsis">HUAWEI MateBook 16s 2023</span>
            </div>
            <!-- 描述 -->
            <div class="describe nowrap_ellipsis">2.5K高色准触控屏,13代酷睿处理器</div>
            <!-- 服务 -->
            <div class="service">
              <span class="tip">至高省200元 13代酷睿</span>
            </div>
            <!-- 价格 -->
            <div class="price">
              <span class="new-price">¥9999</span>
            </div>
            <!-- 评论 -->
            <div class="comment">
              <span>163人评价</span>
              <span>95%好评</span>
            </div>
          </a>
        </li>
        <li class="item">
          <a href="#">
            <!-- 封面 -->
            <img class="album" src="./img/product_08.webp" alt="">
            <!-- 名字 -->
            <div class="name">
              <i class="new">新品</i>
              <span class="title nowrap_ellipsis">HUAWEI MateBook 16s 2023</span>
            </div>
            <!-- 描述 -->
            <div class="describe nowrap_ellipsis">2K触控全面屏，13代酷睿处理器，超级终端</div>
            <!-- 服务 -->
            <div class="service">
              <span class="tip">新品至高省200元 13代酷睿</span>
            </div>
            <!-- 价格 -->
            <div class="price">
              <span class="new-price">¥5799</span>
              <span class="old-price">¥5999</span>
            </div>
            <!-- 评论 -->
            <div class="comment">
              <span>225人评价</span>
              <span>98%好评</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </body>
  </html>
  ```
  :::

  ::: details Click me to view the code css
  ```css
  /* 这里存放的是样式重置 */

  body,div,ul,li,a,img,i {
    /* 去除默认样式 */
    padding: 0;
    margin: 0;
  }

  ul,li {
    /* 去除小圆点 */
    list-style: none;
  }

  a {
    /* 去除下划线 */
    text-decoration: none;
    color: #333;
  }

  img {
    vertical-align: top;
  }

  i {
    font-style: normal;
  }
  ```
  :::

  ::: details Click me to view the code css
  ```css
  /* 这里存放的是公共样式 */

  body {
    background-color: rgb(241, 243, 245);
  }

  /* 版心 */
  .wrapper {
    width: 1200px;
    margin: 0 auto;
  }

  .nowrap_ellipsis {
    /* 🚚 单行文本显示省略号 */
    /* 1.文本不换行显示 */
    white-space: nowrap;
    /* 2.文本超出隐藏 */
    overflow: hidden;
    /* 3.文本超出显示省略号 */
    text-overflow: ellipsis;
  }
  ```
  :::

  ::: details Click me to view the code css
  ```css
  /* 这里存放的是商品列表 */

  /* crumbs 面包屑(导航) */
  .crumbs {
    display: flex;
    height: 63px;
    margin-top: 100px;
    line-height: 63px;
    font-size: 12px;
    color: #000;
  }

  .crumbs .item {
    /* 鼠标小手 */
    cursor: pointer;
  }

  .crumbs .item:last-child {
    font-weight: 700;
  }

  /* > */
  .crumbs span:not(.item) {
    padding: 0 2px;
  }

  /* 操作 */
  .operation {
    padding: 0 24px;
    background-color: #fff;
  }

  .operation>.row {
    display: flex;
  }

  .operation>.row .item {
    width: 104px;
    height: 48px;
    box-sizing: border-box;
    margin: 0 8px;
    padding: 0 4px;
    line-height: 48px;
    font-size: 12px;
    color: #000;
    /* 鼠标小手 */
    cursor: pointer;
  }

  .operation>.row .item:first-child {
    color: #333;
    /* 透明度 */
    opacity: 0.6;
    /* 默认不要鼠标小手 */
    cursor: auto;
  }

  .operation>.row .item.active {
    color: #cf0a2c;
  }

  /* 商品列表 */
  .products {
    display: flex;
    /* 换行 */
    flex-wrap: wrap;
    /* 水平方向两端对齐 */
    justify-content: space-between;
    margin-top: 24px;
  }

  .products>.item {
    width: 291px;
    margin-bottom: 12px;
    background-color: #fff;
  }

  .products>.item:hover {
    box-shadow: rgba(0, 0, 0, .1) 0 0 36px;
  }

  .products>.item a {
    /* display: block; */

    /* 🔥 图片水平居中对齐 */
    /* 🚚 方法一 */
    /* text-align: center; */
    /* 🚚 方法二 */
    display: flex;
    /* 改变主轴方向 */
    flex-direction: column;
    /* 水平方向居中对齐 */
    align-items: center;
  }

  /* 封面 */
  .products>.item .album {
    width: 180px;
    height: 180px;
    margin: 30px 0;
  }

  /* 名字 */
  .products>.item .name {
    display: flex;
    align-items: center;
    height: 19px;
    color: #000;
  }

  .products>.item .name .new {
    height: 16px;
    margin-right: 4px;
    padding: 0 4px;
    line-height: 16px;
    font-size: 12px;
    color: #fff;
    background-color: #fa3040;
    border-radius: 4px;
  }

  .products>.item .name .title {
    width: 211px;
  }

  /* 描述 */
  .products>.item .describe {
    width: 243px;
    height: 18px;
    margin-top: 4px;
    text-align: center;
    line-height: 18px;
    font-size: 13px;
    color: #000;
    opacity: 0.5;
  }

  /* 价格 */
  .products>.item .price {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    font-weight: 700;
    color: #000;
  }

  .products>.item .price .old-price {
    margin-left: 4px;
    font-size: 12px;
    font-weight: 400;
    opacity: 0.4;
    /* 删除线 */
    text-decoration: line-through;
  }

  /* 服务 */
  .products>.item .service {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }

  .products>.item .service .tip {
    margin-right: 4px;
    padding: 0 4px;
    font-size: 12px;
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 4px;
  }

  .products>.item .service .tip:first-child {
    color: #cf0a2c;
    border-color: #e2002466;
  }

  /* 评论 */
  .products>.item .comment {
    display: flex;
    margin: 8px 0 19px;
    opacity: 0.5;
    font-size: 12px;
  }

  .products>.item .comment span:first-child {
    margin-right: 8px;
  }
  ```
  :::

### 2. 动态展示数据

  ::: details Click me to view the code html
  ```html
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 样式重置 -->
    <link rel="stylesheet" href="./css/rest.css">
    <!-- 公共样式 -->
    <link rel="stylesheet" href="./css/common.css">
    <!-- 商品列表 -->
    <link rel="stylesheet" href="./css/product.css">
  </head>

  <body>
    <!-- 版心 -->
    <div class="wrapper">
      <!-- crumbs 面包屑(导航) -->
      <div class="crumbs">
        <span class="item">首页</span>
        <span>&gt;</span>
        <span class="item">笔记本</span>
      </div>

      <!-- 对内容进行操作(operation) -->
      <div class="operation">
        <!-- 分类 -->
        <ul class="row category">
          <li class="item">分类 ：</li>
          <li class="item active">笔记本</li>
          <li class="item">MateBook E系列</li>
          <li class="item">MateBook D系列</li>
          <li class="item">MateBook X系列</li>
          <li class="item">华为显示器系列</li>
          <li class="item">MateBook B系列</li>
          <li class="item nowrap_ellipsis">MateBook数字系列</li>
        </ul>
        <!-- 优惠 -->
        <ul class="row discount">
          <li class="item">服务优惠 ：</li>
          <li class="item">仅看有货</li>
          <li class="item">分期免息</li>
          <li class="item">优惠商品</li>
        </ul>
        <!-- 排序 -->
        <ul class="row sort">
          <li class="item">排序 ：</li>
          <li class="item active">综合</li>
          <li class="item">最新</li>
          <li class="item">评论数</li>
          <li class="item">价格</li>
        </ul>
      </div>

      <!-- 商品列表部分 -->
      <ul class="products"></ul>
    </div>
  </body>
  </html>
  ```
  :::

  ::: details Click me to view the code js
  ```js
  // product_data.js
  var resultList = [
    {
      "briefName": "HUAWEI MateBook E 12.6英寸",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "96",
      "isInv": 1,
      "mobileVideoPath": "",
      "name": "HUAWEI MateBook E 12.6英寸",
      "tag": "价保618",
      "photoName": "3007F35C1B59029E58A4AE3098AC7E02mp.jpg",
      "photoPath": "/uomcdn/CN/pms/202112/displayProduct/10086765396129/",
      "picture3DPath": "",
      "price": {
        "newPrice": 6499,
        "oldPrice": 6599
      },
      "priceAccurate": 6499,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086765396129,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订立省300元|12期免息",
      "rateCount": 3190,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "2801010088403",
      "skuCount": 6,
      "skuName": "【磁吸键盘套装】HUAWEI MateBook E 2022款二合一笔记本 11代酷睿 i5 16G 512G Win11 12.6英寸 OLED原色全面屏 多设备互联 星际蓝",
      "webVideoPath": "",
      "services": [
        "仅看有货",
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateBook 14s",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayTags": "热销爆款",
      "displayToCustomer": "0",
      "goodRate": "95",
      "isInv": 1,
      "mobileVideoPath": "https://vod.vmall.com/asset/bbe93206e5d086880f87f994c57428b9/play_video/f7de0a3ad7021d22ad70161c8f3e1d11_2.mp4",
      "name": "HUAWEI MateBook 14s",
      "tag": "价保618",
      "photoName": "E57FFE1FF4B1FE19D48F93E3D98439BDmp.jpg",
      "photoPath": "/uomcdn/CN/pms/202112/displayProduct/10086088858159/",
      "picture3DPath": "",
      "price": {
        "newPrice": 6699,
        "oldPrice": 6999
      },
      "priceAccurate": 6699,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086088858159,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订立省400元",
      "rateCount": 3327,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "2801010080208",
      "skuCount": 6,
      "skuName": "HUAWEI MateBook 14s 14.2英寸 11代酷睿标压处理器 i5 16GB 512GB 2.5K触控全面屏 90Hz高刷 锐炬显卡 乐享App 多设备互联 轻薄笔记本 云杉绿",
      "tagBgColor": "FF6A6E",
      "webVideoPath": "https://vod.vmall.com/asset/bbe93206e5d086880f87f994c57428b9/play_video/f7de0a3ad7021d22ad70161c8f3e1d11_2.mp4",
      "services": [
        "仅看有货",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI PixLab X1 黑白激光打印机",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "96",
      "isInv": 1,
      "mobileVideoPath": "https://vod.vmall.com/asset/9c044103e5c783bd17323e53a643ed3c/play_video/a94107f5055c8297dcefbfa9a02a3ca0_2.mp4",
      "name": "HUAWEI PixLab X1 黑白激光打印机",
      "tag": "新品",
      "photoName": "D1BA03B40ACBDE152A51E93ACE23DA9A227EE48AB3606C39mp.png",
      "photoPath": "/product/6941487237746/",
      "picture3DPath": "",
      "price": {
        "newPrice": 1899,
        "oldPrice": 1999
      },
      "priceAccurate": 1899,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086478166035,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订立省400元",
      "rateCount": 2734,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "3102150348801",
      "skuCount": 1,
      "skuName": "【新品】华为黑白激光多功能打印机 HUAWEI PixLab X1 HarmonyOS 靠近配网 一碰打印 复印扫描",
      "webVideoPath": "https://vod.vmall.com/asset/9c044103e5c783bd17323e53a643ed3c/play_video/a94107f5055c8297dcefbfa9a02a3ca0_2.mp4",
      "services": [
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateBook 14 2021款",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "94",
      "isInv": 1,
      "mobileVideoPath": "https://vod.vmall.com/asset/5a78d2cbfc1e8bfa0b89d1bdf7847e8d/play_video/82d48481f2da3f9cf71f86152a21c398_2.mp4",
      "name": "HUAWEI MateBook 14 2021款",
      "tag": "新品",
      "photoName": "0586DDD43A796BB8F9DCE0CF38A3C248212C18CA891A2AB9mp.png",
      "photoPath": "/product/6941487210565/",
      "picture3DPath": "",
      "price": {
        "newPrice": 5699,
        "oldPrice": 6999
      },
      "priceAccurate": 5699,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086549931177,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订最高省400元",
      "rateCount": 4163,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "2801010061733",
      "skuCount": 7,
      "skuName": "HUAWEI MateBook 14 2021款 i5 16GB 512GB（深空灰）锐炬显卡 触控屏 11代酷睿处理器 14英寸2K护眼全面屏轻薄笔记本",
      "webVideoPath": "https://vod.vmall.com/asset/5a78d2cbfc1e8bfa0b89d1bdf7847e8d/play_video/82d48481f2da3f9cf71f86152a21c398_2.mp4",
      "services": [
        "仅看有货",
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateBook X Pro 2021款",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "97",
      "isInv": 1,
      "mobileVideoPath": "https://vod.vmall.com/asset/f3cdc6af7392602c47d4d5c49a87af12/play_video/bdcee2ce27b4f25888281d54e05738a7_2.mp4",
      "name": "HUAWEI MateBook X Pro 2021款",
      "photoName": "C3B4EDC1CBDB58C859ED06B23B852CD1mp.jpg",
      "photoPath": "/uomcdn/CN/pms/202112/displayProduct/10086857314109/",
      "picture3DPath": "",
      "price": {
        "newPrice": 10999,
        "oldPrice": 12999
      },
      "priceAccurate": 10999,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086857314109,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "尊享12期免息",
      "rateCount": 6029,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "2801010057233",
      "skuCount": 3,
      "skuName": "HUAWEI MateBook X Pro 2021款 i7 16GB 1TB（深空灰）锐炬显卡 13.9英寸3K高清触控屏 11代酷睿处理器 商务轻薄笔记本",
      "webVideoPath": "https://vod.vmall.com/asset/f3cdc6af7392602c47d4d5c49a87af12/play_video/bdcee2ce27b4f25888281d54e05738a7_2.mp4",
      "services": [
        "仅看有货",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateBook 13 2021款",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "95",
      "isInv": 1,
      "mobileVideoPath": "https://vod.vmall.com/asset/fb588aa94c2eb9bad7ef80ea909927d7/play_video/0ce23ff7d645e17774dc59b1a4d0d561_2.mp4",
      "name": "HUAWEI MateBook 13 2021款",
      "tag": "价保618",
      "photoName": "3DABF5539F6B25DF426191D94B8D8415FAA73E1C8681C940mp.png",
      "photoPath": "/product/6941487236411/",
      "picture3DPath": "",
      "price": {
        "newPrice": 5199
      },
      "priceAccurate": 5199,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086294084142,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订立省200元",
      "rateCount": 2297,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "2801010059937",
      "skuCount": 6,
      "skuName": "HUAWEI MateBook 13 2021款 i5 16GB 512GB（银）2K炫丽全面屏 11代酷睿处理器13英寸轻薄笔记本",
      "webVideoPath": "https://vod.vmall.com/asset/fb588aa94c2eb9bad7ef80ea909927d7/play_video/0ce23ff7d645e17774dc59b1a4d0d561_2.mp4",
      "services": [
        "仅看有货",
        "分期免息",
      ]
    },
    {
      "briefName": "HUAWEI MateBook 16",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "96",
      "isInv": 1,
      "mobileVideoPath": "",
      "name": "HUAWEI MateBook 16",
      "tag": "价保618",
      "photoName": "25208B40BAF8CF246305FD1559BC09EAmp.png",
      "photoPath": "/uomcdn/CN/pms/202306/displayProduct/10086049915262/",
      "picture3DPath": "",
      "price": {
        "newPrice": 6599,
        "oldPrice": 6799
      },
      "priceAccurate": 6599,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086475813571,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订立省300元",
      "rateCount": 1503,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "2801010066607",
      "skuCount": 4,
      "skuName": "【新品】HUAWEI MateBook 16 R7 16GB 512GB（灰）Windows 11 16英寸2.5K专业全面屏 标压处理器 轻薄高性能笔记本",
      "webVideoPath": "",
      "services": [
        "仅看有货",
        "分期免息"
      ]
    },
    {
      "briefName": "HUAWEI MateBook 14 2021款 锐龙版",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "96",
      "isInv": 1,
      "mobileVideoPath": "",
      "name": "HUAWEI MateBook 14 2021款 锐龙版",
      "tag": "价保618",
      "photoName": "64810357D54DF471C801127244440EF1mp.jpg",
      "photoPath": "/uomcdn/CN/pms/202112/displayProduct/10086210747193/",
      "picture3DPath": "",
      "price": {
        "newPrice": 6299
      },
      "priceAccurate": 6299,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086210747193,
      "promoLabels": [
        "限时特价",
        "分期免息",
        "赠送积分"
      ],
      "promoPrice": 5599,
      "promoPriceAccurate": 5599,
      "promotionInfo": "预订立省700元",
      "rateCount": 1011,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "2801010086204",
      "skuCount": 4,
      "skuName": "【新品】HUAWEI MateBook 14 2021 锐龙版 R7 16G 512G（深空灰）2K触控全面屏 14英寸轻薄本",
      "webVideoPath": "",
      "services": [
        "仅看有货",
        "分期免息"
      ]
    },
    {
      "briefName": "HUAWEI MateBook 13s",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "94",
      "isInv": 1,
      "mobileVideoPath": "https://vod.vmall.com/asset/bbe93206e5d086880f87f994c57428b9/play_video/f7de0a3ad7021d22ad70161c8f3e1d11_2.mp4",
      "name": "HUAWEI MateBook 13s",
      "tag": "新品",
      "photoName": "489E4F53219E6909E7A7F49FABA605D6C60C0B53F1DA152Amp.png",
      "photoPath": "/product/6941487233809/",
      "picture3DPath": "",
      "price": {
        "newPrice": 6499,
        "oldPrice": 6699
      },
      "priceAccurate": 6499,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086845419415,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订立省500元",
      "rateCount": 1228,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "2801010079901",
      "skuCount": 4,
      "skuName": "【新品】HUAWEI MateBook 13s 13.4英寸 11代酷睿标压处理器 i5 16G 512G  2.5K触控全面屏  90Hz高刷 锐炬显卡 乐享App 多设备互联 轻薄笔记本 皓月银",
      "webVideoPath": "https://vod.vmall.com/asset/bbe93206e5d086880f87f994c57428b9/play_video/f7de0a3ad7021d22ad70161c8f3e1d11_2.mp4",
      "services": [
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI Matebook X 2021款",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "93",
      "isInv": 1,
      "mobileVideoPath": "https://vod.vmall.com/asset/97058dcb06ffb0e4bb545a295b6b96c7/play_video/f3c2ece4fef62a1fa88c3d39e42ee616_2.mp4",
      "name": "HUAWEI Matebook X 2021款",
      "tag": "价保618",
      "photoName": "6E52FE5AD52A2106A11D6D894FCB12F04E037A1519BF7E05mp.png",
      "photoPath": "/product/6941487215461/",
      "picture3DPath": "",
      "price": {
        "newPrice": 6999,
      },
      "priceAccurate": 6999,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086715572678,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订立省200元",
      "rateCount": 190,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "2801010083804",
      "skuCount": 6,
      "skuName": "【新品】HUAWEI MateBook X 2021款13英寸 11代酷睿 i5 16GB 512GB（冰霜银）3K触控全面屏 轻至1kg 多屏协同 4扬声器环绕音效 轻薄笔记本",
      "webVideoPath": "https://vod.vmall.com/asset/97058dcb06ffb0e4bb545a295b6b96c7/play_video/f3c2ece4fef62a1fa88c3d39e42ee616_2.mp4",
      "services": [
        "仅看有货",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateView",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "97",
      "isInv": 1,
      "mobileVideoPath": "",
      "name": "HUAWEI MateView",
      "tag": "新品",
      "photoName": "83863676E551FCB7E3FBF673B61B8979EF4A923BA06F4475mp.png",
      "photoPath": "/product/6941487222872/",
      "picture3DPath": "",
      "price": {
        "newPrice": 3999,
      },
      "priceAccurate": 3999,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086690832694,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订立省200元",
      "rateCount": 1210,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "34020000502",
      "skuCount": 2,
      "skuName": "【无线投屏版】HUAWEI MateView 28.2英寸 原色显示器 4K+ 超高清分辨率  电影级色域  94%高屏占比  3:2 屏幕比例 支持华为手机一碰投屏 65W Type-C反向充电",
      "webVideoPath": "",
      "services": [
        "仅看有货",
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateView GT 27英寸",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "96",
      "isInv": 1,
      "mobileVideoPath": "https://vod.vmall.com/asset/12defa62ac19c232e27eb7d33ad632e7/play_video/25081b882872f4c5a78e79a21e673704_2.mp4",
      "name": "HUAWEI MateView GT 27英寸",
      "photoName": "91B768F89D6CBB0B25384A645603CBD8mp.png",
      "photoPath": "/uomcdn/CN/pms/202202/gbom/6941487232963/",
      "picture3DPath": "",
      "price": {
        "newPrice": 2099,
        "oldPrice": 2299
      },
      "priceAccurate": 2099,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086419944776,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订最高省500元",
      "rateCount": 561,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "4602010001501",
      "skuCount": 2,
      "skuName": "HUAWEI MateView GT 27英寸2K超清曲面屏 165Hz刷新率90% P3色域 低蓝光无频闪莱茵护眼认证（无HDMI线缆）",
      "webVideoPath": "https://vod.vmall.com/asset/12defa62ac19c232e27eb7d33ad632e7/play_video/25081b882872f4c5a78e79a21e673704_2.mp4",
      "services": [
        "仅看有货",
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateStation S 锐龙版",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "96",
      "isInv": 1,
      "mobileVideoPath": "",
      "name": "HUAWEI MateStation S 锐龙版",
      "tag": "新品",
      "photoName": "F91D2C8C6DF7A0D2E50CAD4C3ACFE42Dmp.png",
      "photoPath": "/uomcdn/CN/pms/202204/sbom/4601010000304/",
      "picture3DPath": "",
      "price": {
        "newPrice": 4998
      },
      "priceAccurate": 4998,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086469978892,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订最高省900元",
      "rateCount": 1043,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "4601010000304",
      "skuCount": 4,
      "skuName": "【搭配显示器套装】HUAWEI MateStation S 小机箱台式机 7nm锐龙六核R5-4600G 8GB+512GB 多设备高效协同 一键指纹开机解锁 满载28分贝智慧风冷系统 Win10三年保修+华为显示器 S24（含HDMI线）",
      "webVideoPath": "",
      "services": [
        "仅看有货",
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateView GT 34英寸",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "97",
      "isInv": 1,
      "mobileVideoPath": "https://vod.vmall.com/asset/dd43fc2a20f3ccb66571c125d306110c/play_video/7a4bb69d530e09dcab8f0d68e9fc579b_3.mp4",
      "name": "HUAWEI MateView GT 34英寸",
      "tag": "价保618",
      "photoName": "CAA6012E4EAA262252BC8FDA4960985Bmp.png",
      "photoPath": "/uomcdn/CN/pms/202202/gbom/6941487222858/",
      "picture3DPath": "",
      "price": {
        "newPrice": 2699,
        "oldPrice": 3699
      },
      "priceAccurate": 2699,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086632258266,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订最高省600",
      "rateCount": 783,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "34020001601",
      "skuCount": 2,
      "skuName": "HUAWEI MateView GT 34英寸曲面显示器 3K高清分辨率 21:9 屏幕比例 165Hz电竞刷新率 电影级色域 沉浸式环绕大屏游戏显示器（无HDMI线缆）",
      "webVideoPath": "https://vod.vmall.com/asset/dd43fc2a20f3ccb66571c125d306110c/play_video/7a4bb69d530e09dcab8f0d68e9fc579b_0.mp4",
      "services": [
        "仅看有货",
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateStation X",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "97",
      "isInv": 1,
      "mobileVideoPath": "https://vod.vmall.com/asset/a04fcf17048c946079ff773fcefcdf39/play_video/a2adc8c3286e40cb1b5a7d99bbc3fe87_2.mp4",
      "name": "HUAWEI MateStation X",
      "tag": "价保618",
      "photoName": "2CD097D65993F90E35A97E381D9209CBBADCD3750D50113Amp.png",
      "photoPath": "/product/6941487244263/",
      "picture3DPath": "",
      "price": {
        "newPrice": 9999
      },
      "priceAccurate": 9999,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086246464159,
      "promoLabels": [
        "分期免息",
        "赠送积分"
      ],
      "promotionInfo": "预订立省500元",
      "rateCount": 478,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "4603010000204",
      "skuCount": 5,
      "skuName": "HUAWEI MateStation X一体机 28.2英寸十点触控全面屏 锐龙R5 5600H 16GB+512GB 金属机身 多设备高效协同 一键指纹开机解锁 皓月银",
      "webVideoPath": "https://vod.vmall.com/asset/a04fcf17048c946079ff773fcefcdf39/play_video/a2adc8c3286e40cb1b5a7d99bbc3fe87_2.mp4",
      "services": [
        "仅看有货",
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "华为显示器 S24",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "98",
      "isInv": 1,
      "mobileVideoPath": "https://vod.vmall.com/asset/97c05bb2c5473dd6a3ca91a7dcfd79af/play_video/756e5358ce7ef06af4bee3eab40b1a5a.mp4",
      "name": "华为显示器 S24",
      "tag": "价保618",
      "photoName": "AA9DBAA797633A14F84309B161392F75mp_tds2.png",
      "photoPath": "/uomcdn/CN/pms/202209/gbom/6941487222865/",
      "picture3DPath": "",
      "price": {
        "newPrice": 999
      },
      "priceAccurate": 999,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086839196289,
      "promoLabels": [
        "赠送积分"
      ],
      "promotionInfo": "预订立省230元",
      "rateCount": 1869,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "34020008701",
      "skuCount": 1,
      "skuName": "华为显示器 S24（灰色）全面屏高清办公显示器 窄边框90%屏占比 75Hz刷新率 顺滑画面 畅爽体验",
      "webVideoPath": "https://vod.vmall.com/asset/97c05bb2c5473dd6a3ca91a7dcfd79af/play_video/756e5358ce7ef06af4bee3eab40b1a5a.mp4",
      "services": [
        "仅看有货",
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateBook B3-420",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "100",
      "isInv": 1,
      "mobileVideoPath": "",
      "name": "HUAWEI MateBook B3-420",
      "tag": "价保618",
      "photoName": "C87F6C546FEBC02F0A3931780657D7095AEDE8CC5BE5C793mp.png",
      "photoPath": "/product/6941487217120/",
      "picture3DPath": "",
      "price": {
        "newPrice": 5199,
        "oldPrice": 5599
      },
      "priceAccurate": 5199,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086700131130,
      "promoLabels": [
        "赠送积分"
      ],
      "promotionInfo": "批量采购享优惠",
      "rateCount": 0,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "2801010075804",
      "skuCount": 6,
      "skuName": "[三年保修 三年专家上门] HUAWEI MateBook B3-420 2021 i5 8GB 512GB 深空灰 45% NTSC色域 14英寸 商用笔记本",
      "webVideoPath": "",
      "services": [
        "仅看有货",
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateStation B515 台式机",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "100",
      "isInv": 1,
      "mobileVideoPath": "",
      "name": "HUAWEI MateStation B515 台式机",
      "tag": "新品",
      "photoName": "2309E3EAC19408D03275BEF025D245DBmp.png",
      "photoPath": "/uomcdn/CN/pms/202205/gbom/6941487207497/",
      "picture3DPath": "",
      "price": {
        "newPrice": 3799,
        "oldPrice": 3999
      },
      "priceAccurate": 3799,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086092274209,
      "promoLabels": [
        "赠送积分"
      ],
      "promotionInfo": "批量采购享优惠",
      "rateCount": 3,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "34010000301",
      "skuCount": 7,
      "skuName": "[三年保修 三年专家上门] HUAWEI MateStation B515 小机箱 集显 R5-4600G 8GB 1TB HDD 有线键盘 有线鼠标（黑色） 商用台式机",
      "webVideoPath": "",
      "services": [
        "仅看有货",
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateBook B7",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "100",
      "isInv": 1,
      "mobileVideoPath": "",
      "name": "HUAWEI MateBook B7",
      "tag": "价保618",
      "photoName": "475AE7EE1684FFA352EE92B05E9C5E60739B1F87791D1EBCmp.png",
      "photoPath": "/product/6941487222780/",
      "picture3DPath": "",
      "price": {
        "newPrice": 9599,
        "oldPrice": 9999
      },
      "priceAccurate": 9599,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086967025187,
      "promoLabels": [
        "赠送积分"
      ],
      "promotionInfo": "",
      "rateCount": 0,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "2801010076101",
      "skuCount": 3,
      "skuName": "[三年保修 三年专家上门] HUAWEI MateBook B7 2021 i5 16GB 512GB 深空灰 13.9英寸 商用笔记本",
      "webVideoPath": "",
      "services": [
        "仅看有货",
        "分期免息",
        "优惠商品"
      ]
    },
    {
      "briefName": "HUAWEI MateBook B5-430",
      "buttonMode": "1",
      "carrierCode": "VMALL-HUAWEIDEVICE",
      "currencyUnit": "",
      "displayToCustomer": "0",
      "goodRate": "100",
      "isInv": 1,
      "mobileVideoPath": "",
      "name": "HUAWEI MateBook B5-430",
      "tag": "新品",
      "photoName": "F25E2E42E8CE4FC87D4DBA2CC3441C7C698586AAFCE6FFFDmp.png",
      "photoPath": "/product/6941487231874/",
      "picture3DPath": "",
      "price": {
        "newPrice": 6599,
        "oldPrice": 6799
      },
      "priceAccurate": 6599,
      "priceLabel": 1,
      "priceMode": 1,
      "productId": 10086829728173,
      "promoLabels": [
        "赠送积分"
      ],
      "promotionInfo": "批量采购享优惠",
      "rateCount": 0,
      "shopH5Url": "https://m.vmall.com/sc/shop/index.html?carrierCode=VMALL-HUAWEIDEVICE",
      "shopMobileUrl": "vmall://com.vmall.client/shop/home?carrierCode=VMALL-HUAWEIDEVICE",
      "shopName": "华为商城自营",
      "skuCode": "2801010076001",
      "skuCount": 6,
      "skuName": "[三年保修 三年专家上门] HUAWEI MateBook B5-430 2021 i5 8GB 512GB 深空灰 14英寸 商用笔记本",
      "webVideoPath": "",
      "services": [
        "仅看有货",
        "分期免息",
        "优惠商品"
      ]
    }
  ]
  ```
  :::
  
  ::: details Click me to view the code js
  ::: code-group
  ```js
  <script src="./json/product_data.js"></script>

  // 0.资源服务器的地址
  var serverURL = "https://res.vmallres.com/pimages"

  // 1.获取元素
  var productsEl = document.querySelector(".products")

  // 2.动态的展示商品列表
  for (var i = 0; i < resultList.length; i++) {
    // 2.1 获取一条数据
    var resultItemEl = resultList[i]

    // 2.2 将这条数据转换成界面一个item
    // 创建li
    var liEl = document.createElement("li")
    liEl.classList.add("item")
    productsEl.append(liEl)

    // 创建a
    var aEl = document.createElement("a")
    aEl.href = "#"
    liEl.append(aEl)

    // 创建img
    var albumEl = document.createElement("img")
    albumEl.classList.add("album")
    albumEl.src = `${serverURL}${resultItemEl.photoPath}800_800_${resultItemEl.photoName}`
    aEl.append(albumEl)


    // 创建name
    var nameEl = document.createElement("div")
    nameEl.classList.add("name")
    aEl.append(nameEl)

    if (resultItemEl.tag) {
      var iEl = document.createElement("i")
      iEl.classList.add("icon")
      iEl.textContent = resultItemEl.tag
      nameEl.append(iEl)
    }

    var spanEl = document.createElement("span")
    spanEl.classList.add("title", "nowrap_ellipsis")
    spanEl.textContent = resultItemEl.name
    nameEl.append(spanEl)

    // 创建services
    var servicesEl = document.createElement("div")
    servicesEl.classList.add("services")
    aEl.append(servicesEl)

    for (var item of resultItemEl.promoLabels) {
      var tipEl = document.createElement("span")
      tipEl.classList.add("tip")
      tipEl.textContent = item
      servicesEl.append(tipEl)
    }

    // 创建price
    var priceEl = document.createElement("div")
    priceEl.classList.add("price")
    aEl.append(priceEl)

    // for (var key in resultItemEl.price) {
    //   if (key === "newPrice") {
    //     var value = resultItemEl.price[key]
    //     var newPriceEl = document.createElement("span")
    //     newPriceEl.classList.add("new-price")
    //     newPriceEl.textContent = "¥" + value
    //     priceEl.append(newPriceEl)
    //   } else if (key === "oldPrice") {
    //     var value = resultItemEl.price[key]
    //     var oldPriceEl = document.createElement("span")
    //     oldPriceEl.classList.add("old-price")
    //     oldPriceEl.textContent = "¥" + value
    //     priceEl.append(oldPriceEl)
    //   }
    // }

    // 优化👆🏻注释代码
    const priceTypes = {
      newPrice: "new-price",
      oldPrice: "old-price"
    }

    for (var key in resultItemEl.price) {
      var value = resultItemEl.price[key]
      var priceItemEl = document.createElement("span")
      priceItemEl.classList.add(priceTypes[key])
      priceItemEl.textContent = "¥" + value
      priceEl.append(priceItemEl)
    }

    // 创建comment
    var commentEl = document.createElement("div")
    commentEl.classList.add("comment")
    aEl.append(commentEl)

    var countEl = document.createElement("span")
    countEl.textContent = resultItemEl.rateCount + "人评价"
    commentEl.append(countEl)

    var goodEl = document.createElement("span")
    goodEl.textContent = resultItemEl.goodRate + "%好评"
    commentEl.append(goodEl)
  }
  ```
  
  ```js
  <script src="./json/product_data.js"></script>

  // 0.资源服务器的地址
  var serverURL = "https://res.vmallres.com/pimages"

  // 1.获取元素
  var productsEl = document.querySelector(".products")

  // 2.动态的展示商品列表
  for (var i = 0; i < resultList.length; i++) {
    // 2.1 获取一条数据
    var resultItemEl = resultList[i]

    // 2.2 将这条数据转换成界面一个item
    // 创建li
    var liEl = document.createElement("li")
    liEl.classList.add("item")
    productsEl.append(liEl)

    // service
    servicesString = ""
    for (var servicesItem of resultItemEl.services) {
      servicesString += `<span class="tip">${servicesItem}</span>`
    }

    // price
    var priceString = ""
    for (var key in resultItemEl.price) {
      var value = resultItemEl.price[key]

      if (key === "oldPrice") {
        priceString += `<span class="old-price">¥${value}</span>`
      } else if (key === "newPrice") {
        priceString += `<span class="new-price">¥${value}</span>`
      }
    }

    liEl.innerHTML = `
    <a href="#">
      <!-- 封面 -->
      <img class="album" src=${serverURL}${resultItemEl.photoPath}800_800_${resultItemEl.photoName} alt="">
      <!-- 标题 -->
      <div class="name">
        <i class="icon">${resultItemEl.tag}</i>
        <span class="title nowrap_ellipsis">${resultItemEl.name}</span>
      </div>
      <!-- 描述 -->
      <div class="describe nowrap_ellipsis">${resultItemEl.promotionInfo}</div>
      <!-- 服务 -->
      <div class="services">${servicesString}</div>
      <!-- 价格 -->
      <div class="price">${priceString}</div>
      <!-- 评论 -->
      <div class="comment">
        <span>${resultItemEl.rateCount}人评价</span>
        <span>${resultItemEl.goodRate}%好评</span>
      </div>
    </a>
    `
  }
  ```
  :::

### 3. 服务优惠的筛选

  ::: details Click me to view the code js
  ```js
  ....
  // 1.获取元素
  ...
  var operationEl = document.querySelector(".operation")
  var discountEl = operationEl.querySelector(".discount")

  // 2.定义变量
  var discountFilters = [] // 记录用户选择的服务优惠
  var resultListFilters = resultList // 过滤数据

  // 3.动态的展示商品列表
  showResultListAction()
  // 封装函数: 通过for循环,展示数据  ✅
  function showResultListAction() {
    // 防止出现叠加情况
    productsEl.innerHTML = ""
    for (var i = 0; i < resultListFilters.length; i++) {
      // 2.1 获取一条数据
      var resultItemEl = resultListFilters[i]

      ....
    }
    // 布局对齐
    layout()
  }

  // 4.服务优惠的筛选(从"仅看有货"开始) ✅
  for (var i = 1; i < discountEl.children.length; i++) {
    // 过滤元素
    // 获取对应的discountItemEl
    var discountItemEl = discountEl.children[i]

    // 监听discountItemEl的点击
    discountItemEl.onclick = function () {
      // 在 active 和 非active 切换
      this.classList.toggle("active")

      // 判断是否将关键字添加或者从discountFilters删除掉
      if (this.classList.contains("active")) {
        discountFilters.push(this.textContent.trim())
      } else {
        var filterItemEl = this.textContent.trim()
        var filterIndex = discountFilters.findIndex(function (item) {
          return item === filterItemEl
        })
        discountFilters.splice(filterIndex, 1)
      }

      // 过滤resultList数据
      filterResultListAction()
    }
  }

  // 5.封装函数: 过滤resultList数据
  function filterResultListAction() {
    resultListFilters = resultList.filter(function (item) {
      var isFlag = true
      var services = item.services

      for (var filterItemEl of discountFilters) {
        if (!services.includes(filterItemEl)) {
          isFlag = false
          break
        }
      }
      return isFlag
    })

    // 重新渲染数据
    showResultListAction()
  }

  // 6.封装函数: 布局对齐
  function layout() {
    var liEl = productsEl.children[0]
    // 获取一行存放几个
    var count = Math.floor(productsEl.clientWidth / liEl.clientWidth)

    // 添加span的个数是列数减-2 ✅
    for (var i = 0; i < count - 2; i++) {
      var spanEl = document.createElement("span")
      spanEl.classList.add("item")
      spanEl.style.height = "0"
      productsEl.append(spanEl)
    }
  }
  ```
  :::

### 4. 排序的筛选

  ::: details Click me to view the code html
  ```html
  <!-- 排序 -->
  <ul class="row sort">
    <li class="item">排序 ：</li>
    <li data-action="default" class="item active">综合</li>
    <li data-action="goodRate" class="item">好评</li>
    <li data-action="rateCount" class="item">评论数</li>
    <li data-action="priceAccurate" class="item">价格</li>
  </ul>
  ```
  :::

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  ...
  var sortEl = operationEl.querySelector(".sort")
  var activeEl = sortEl.querySelector(".active")

  // 2.定义变量
  var discountFilters = [] // 记录用户选择的服务优惠
  // var resultListFilters = [...resultList] // 过滤数据
  var resultListFilters = [].concat(resultList) // 过滤数据
  var sortKey = "default" // 默认当前是综合排序

  ...

  // 5.封装函数: 过滤resultList数据
  function filterResultListAction() {
    // 1.过滤数据
    ...
    
    // 2.重新展示数据
    sortResultListAction(true)
  }

  ...

  // 7.排序的筛选(从"综合"开始) ✅
  for (var i = 1; i < sortEl.children.length; i++) {
    var sortItemEl = sortEl.children[i]
    sortItemEl.onclick = function () {
      // 1.取消之前的active,添加新的active,记住最新的activeEl
      activeEl.classList.remove("active")
      this.classList.add("active")
      activeEl = this

      // 2.获取信息
      sortKey = this.dataset.key

      // 3.根据key,通过key对数据进行排序
      sortResultListAction(false)
    }
  }

  // 封装函数: 排序resultList数据
  function sortResultListAction(isJustShow) {
    if (sortKey === "default" && !isJustShow) {
      filterResultListAction()
    } else {
      resultListFilters.sort(function (item1, item2) {
        // 🔥 为什么不是item2.key,因为key是一个字符串,所以访问对象属性,必须是obj["xx"],而不是obj."xx"
        return item2[sortKey] - item1[sortKey]
      })
    }
    showResultListAction()
  }

  ```
  :::

### 5. 完整的代码

  ::: details Click me to view the code html
  ```html
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品筛选</title>
    <!-- 样式重置 -->
    <link rel="stylesheet" href="./css/reset.css">
    <!-- 公共样式 -->
    <link rel="stylesheet" href="./css/common.css">
    <!-- 站点图标 -->
    <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
    <!-- 商品样式 -->
    <link rel="stylesheet" href="./css/producs.css">
  </head>

  <body>
    <div class="wrapper">
      <!-- 面包屑导航 -->
      <div class="crumbs">
        <span class="item">首页</span>
        <span>&gt;</span>
        <span class="item">笔记本</span>
      </div>

      <!-- 操作 -->
      <div class="operation">
        <!-- 分类 -->
        <ul class="row category">
          <li class="item">分类 ：</li>
          <li class="item active">笔记本</li>
          <li class="item">MateBook E系列</li>
          <li class="item">MateBook D系列</li>
          <li class="item">MateBook X系列</li>
          <li class="item">华为显示器系列</li>
          <li class="item">Matebook B系列</li>
          <li class="item nowrap_ellipsis">MateBook数字系列</li>
        </ul>
        <!-- 服务优惠 -->
        <ul class="row discount">
          <li class="item">服务优惠 ：</li>
          <li class="item">仅看有货</li>
          <li class="item">分期免息</li>
          <li class="item">优惠商品</li>
        </ul>
        <!-- 排序 -->
        <ul class="row sort">
          <li class="item">排序 ：</li>
          <li class="item active" data-key="default">综合</li>
          <li class="item" data-key="goodRate">好评</li>
          <li class="item" data-key="rateCount">评论数</li>
          <li class="item" data-key="priceAccurate">价格</li>
        </ul>
      </div>

      <!-- 商品 -->
      <ul class="products"></ul>
    </div>

    <script src="./json/product_data.js"></script>
    <script>
      // 0.资源服务器的地址
      var serverURL = "https://res.vmallres.com/pimages"

      // 1.获取元素
      var productsEl = document.querySelector(".products")
      var operationEl = document.querySelector(".operation")
      var discountEl = operationEl.querySelector(".discount")
      var sortEl = operationEl.querySelector(".sort")
      var activeEl = sortEl.querySelector(".active")

      // 2.定义变量
      var discountFilters = [] // 记录用户选择的服务优惠
      // var resultListFilters = [...resultList] // 过滤数据
      var resultListFilters = [].concat(resultList) // 过滤数据
      var sortKey = "default" // 默认当前是综合排序

      // 3.动态的展示商品列表
      showResultListAction()
      // 封装函数: 通过for循环,展示数据  ✅
      function showResultListAction() {
        // 防止出现叠加情况
        productsEl.innerHTML = ""
        for (var i = 0; i < resultListFilters.length; i++) {
          // 2.1 获取一条数据
          var resultItemEl = resultListFilters[i]

          // 2.2 将这条数据转换成界面一个item
          // 创建li
          var liEl = document.createElement("li")
          liEl.classList.add("item")
          productsEl.append(liEl)

          // service
          servicesString = ""
          for (var servicesItem of resultItemEl.services) {
            servicesString += `<span class="tip">${servicesItem}</span>`
          }

          // price
          var priceString = ""
          for (var key in resultItemEl.price) {
            var value = resultItemEl.price[key]

            if (key === "oldPrice") {
              priceString += `<span class="old-price">¥${value}</span>`
            } else if (key === "newPrice") {
              priceString += `<span class="new-price">¥${value}</span>`
            }
          }

          liEl.innerHTML = `
        <a href="#">
          <!-- 封面 -->
          <img class="album" src=${serverURL}${resultItemEl.photoPath}800_800_${resultItemEl.photoName} alt="">
          <!-- 标题 -->
          <div class="name">
            <i class="icon">${resultItemEl.tag}</i>
            <span class="title nowrap_ellipsis">${resultItemEl.name}</span>
          </div>
          <!-- 描述 -->
          <div class="describe nowrap_ellipsis">${resultItemEl.promotionInfo}</div>
          <!-- 服务 -->
          <div class="services">${servicesString}</div>
          <!-- 价格 -->
          <div class="price">${priceString}</div>
          <!-- 评论 -->
          <div class="comment">
            <span>${resultItemEl.rateCount}人评价</span>
            <span>${resultItemEl.goodRate}%好评</span>
          </div>
        </a>
        `
        }

        // 布局对齐
        layout()
      }

      // 4.服务优惠的筛选(从"仅看有货"开始) ✅
      for (var i = 1; i < discountEl.children.length; i++) {
        // 过滤元素
        // 获取对应的discountItemEl
        var discountItemEl = discountEl.children[i]

        // 监听discountItemEl的点击
        discountItemEl.onclick = function () {
          // 在 active 和 非active 切换
          this.classList.toggle("active")

          // 判断是否将关键字添加或者从discountFilters删除掉
          if (this.classList.contains("active")) {
            discountFilters.push(this.textContent.trim())
          } else {
            var filterItemEl = this.textContent.trim()
            var filterIndex = discountFilters.findIndex(function (item) {
              return item === filterItemEl
            })
            discountFilters.splice(filterIndex, 1)
          }

          // 过滤resultList数据
          filterResultListAction()
        }
      }

      // 5.封装函数: 过滤resultList数据
      function filterResultListAction() {
        resultListFilters = resultList.filter(function (item) {
          var isFlag = true
          var services = item.services

          for (var filterItemEl of discountFilters) {
            if (!services.includes(filterItemEl)) {
              isFlag = false
              break
            }
          }
          return isFlag
        })

        // 重新渲染数据
        sortResultListAction(true)
      }

      // 6.封装函数: 布局对齐
      function layout() {
        var liEl = productsEl.children[0]
        // 获取一行存放几个
        var count = Math.floor(productsEl.clientWidth / liEl.clientWidth)

        // 添加span的个数是列数减-2 ✅
        for (var i = 0; i < count - 2; i++) {
          var spanEl = document.createElement("span")
          spanEl.classList.add("item")
          spanEl.style.height = "0"
          productsEl.append(spanEl)
        }
      }

      // 7.排序的筛选(从"综合"开始) ✅
      for (var i = 1; i < sortEl.children.length; i++) {
        var sortItemEl = sortEl.children[i]
        sortItemEl.onclick = function () {
          // 1.取消之前的active,添加新的active,记住最新的activeEl
          activeEl.classList.remove("active")
          this.classList.add("active")
          activeEl = this

          // 2.获取信息
          sortKey = this.dataset.key

          // 3.根据key,通过key对数据进行排序
          sortResultListAction(false)
        }
      }

      // 封装函数: 排序resultList数据
      function sortResultListAction(isJustShow) {
        if (sortKey === "default" && !isJustShow) {
          filterResultListAction()
        } else {
          resultListFilters.sort(function (item1, item2) {
            // 🔥 为什么不是item2.key,因为key是一个字符串,所以访问对象属性,必须是obj["xx"],而不是obj."xx"
            return item2[sortKey] - item1[sortKey]
          })
        }
        showResultListAction()
      }

    </script>
  </body>

  </html>
  ```
  :::


## 23. 华为商城的轮播图

  ![interview](/interview_js_19.png)

  > **https://djhwsab.github.io/products_Filters/**

### 1. 界面搭建

  ::: details Click me to view the code html
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VM-Banner</title>
    <!-- 样式重置 -->
    <link rel="stylesheet" href="./css/reset.css">
    <!-- 站点图标 -->
    <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
    <!-- banner -->
    <link rel="stylesheet" href="./css/banner.css">
  </head>
  <body>
    <div class="banner">
      <!-- 1.图片 -->
      <ul class="images">
        <li class="item active">
          <a href="#">
            <img src="./img/banner_01.webp" alt="">
          </a>
        </li>
        <li class="item">
          <a href="#">
            <img src="./img/banner_02.webp" alt="">
          </a>
        </li>
        <li class="item">
          <a href="#">
            <img src="./img/banner_03.webp" alt="">
          </a>
        </li>
        <li class="item">
          <a href="#">
            <img src="./img/banner_04.webp" alt="">
          </a>
        </li>
        <li class="item">
          <a href="#">
            <img src="./img/banner_05.webp" alt="">
          </a>
        </li>
        <li class="item">
          <a href="#">
            <img src="./img/banner_06.webp" alt="">
          </a>
        </li>
        <li class="item">
          <a href="#">
            <img src="./img/banner_07.webp" alt="">
          </a>
        </li>
        <li class="item">
          <a href="#">
            <img src="./img/banner_08.webp" alt="">
          </a>
        </li>
        
      </ul>
      
      <!-- 2.左右按钮 -->
      <div class="control prev"></div>
      <div class="control next"></div>

      <!-- 3.指示器(小圆点) -->
      <div class="indicator">
        <div class="item active"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </div>
  </body>
  </html>
  ```
  :::

  ::: details Click me to view the code css
  ```css
  /* 这里存放的是样式重置 */
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
    /* 去除下划线 */
    text-decoration: none;
    /* 不要外轮廓 */
    outline: none;
  }

  img {
    vertical-align: top;
  }
  ```
  :::

  ::: details Click me to view the code css
  ```css
  /* 这里存放的是轮播图样式 */
  .banner {
    position: relative;
  }

  /* 1.图片 */
  .banner .images {
    position: relative;
    height: 550px;
  }

  .banner .images .item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    overflow: hidden;
    opacity: 0;
  }

  .banner .images .item.active {
    opacity: 1;
  }

  .banner .images .item a {
    /* 必须是block,默认独占一行,宽度为100% */
    display: block;
  }

  .banner .images .item a img {
    /* 🚚 图片居中且等比例缩放 */
    position: relative;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    width: 1440px;
    height: 550px;
  }

  /* 2.左右按钮 */
  .banner .control {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 41px;
    height: 69px;
    background: url(../img/spirit_bg.png) no-repeat;
    /* 鼠标小手 */
    cursor: pointer;
    /* 默认隐藏 */
    opacity: 0;
  }

  .banner:hover .control {
    opacity: 1;
  }

  .banner .control.prev {
    /* 🚚 1440 - 1200 + 200 = 440px */
    left: 440px;
    background-position: -84px 50%;
  }

  .banner .control.prev:hover {
    background-position: 0 50%;
  }

  .banner .control.next {
    right: 440px;
    background-position: -125px 50%;
  }

  .banner .control.next:hover {
    background-position: -42px 50%;
  }

  /* 3.指示器(小圆点) */
  .banner .indicator {
    position: absolute;
    left: 50%;
    bottom: 24px;
    transform: translate(-50%, 0);
    height: 32px;
    display: flex;
    /* 垂直居中 */
    align-items: center;
    /* 水平居中 */
    justify-content: space-between;
  }

  .banner .indicator .item {
    width: 8px;
    height: 8px;
    margin: 0 6px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    /* 鼠标小手 */
    cursor: pointer;
  }

  .banner .indicator .item.active {
    width: 12px;
    background-color: #fff;
  }
  ```
  :::

### 2. 动态数据展示

  ::: details Click me to view the code js
  ```js
  // banner_data.js
  var banners = [
    {
      "actionUrlWap": "",
      "actionUrlWeb": "https://www.vmall.com/portal/activity/index.html?pn=zhuhuichangpc",
      "actonUrl": "",
      "bgColor": "#ED2E35",
      "dataSourceCode": "DB000044",
      "dataSourceType": "ad",
      "id": 20533,
      "imgUrl": "/uomcdn/CN/cms/202202/F1B873739558FB5D1059099F4220ABA4.jpg",
      "imgWebpUrlMap": {
        "webp_1": "/uomcdn/CN/cms/202202/F1B873739558FB5D1059099F4220ABA4.jpg.25.webp",
        "webp_2": "/uomcdn/CN/cms/202202/F1B873739558FB5D1059099F4220ABA4.jpg.50.webp",
        "webp_3": "/uomcdn/CN/cms/202202/F1B873739558FB5D1059099F4220ABA4.jpg.75.webp",
        "webp_4": "/uomcdn/CN/cms/202202/F1B873739558FB5D1059099F4220ABA4.jpg.webp"
      },
      "tagSelected": "{}",
      "title": "主"
    },
    {
      "actionUrlWap": "",
      "actionUrlWeb": "https://www.vmall.com/portal/activity/index.html?pn=huaweizonePC",
      "actonUrl": "",
      "bgColor": "#ED2E35",
      "dataSourceCode": "DB000044",
      "dataSourceType": "ad",
      "id": 17691,
      "imgUrl": "/uomcdn/CN/cms/202202/9B8652362711564FEB2B33793250D8B9.png",
      "imgWebpUrlMap": {
        "webp_1": "/uomcdn/CN/cms/202202/9B8652362711564FEB2B33793250D8B9.png.25.webp",
        "webp_2": "/uomcdn/CN/cms/202202/9B8652362711564FEB2B33793250D8B9.png.50.webp",
        "webp_3": "/uomcdn/CN/cms/202202/9B8652362711564FEB2B33793250D8B9.png.75.webp",
        "webp_4": "/uomcdn/CN/cms/202202/9B8652362711564FEB2B33793250D8B9.png.webp"
      },
      "tagSelected": "{}",
      "title": "华为"
    },
    {
      "actionUrlWap": "",
      "actionUrlWeb": "https://www.vmall.com/portal/activity/index.html?pageId=401022361",
      "actonUrl": "",
      "bgColor": "#ED2E35",
      "dataSourceCode": "DB000044",
      "dataSourceType": "ad",
      "id": 839,
      "imgUrl": "/uomcdn/CN/cms/202202/55338EF54406E2D3D6FAC2BF6C9D231D.png",
      "imgWebpUrlMap": {
        "webp_1": "/uomcdn/CN/cms/202202/55338EF54406E2D3D6FAC2BF6C9D231D.png.25.webp",
        "webp_2": "/uomcdn/CN/cms/202202/55338EF54406E2D3D6FAC2BF6C9D231D.png.50.webp",
        "webp_3": "/uomcdn/CN/cms/202202/55338EF54406E2D3D6FAC2BF6C9D231D.png.75.webp",
        "webp_4": "/uomcdn/CN/cms/202202/55338EF54406E2D3D6FAC2BF6C9D231D.png.webp"
      },
      "tagSelected": "{}",
      "title": "教育办公"
    },
    {
      "actionUrlMp": "",
      "actionUrlWap": "",
      "actionUrlWeb": "https://www.vmall.com/portal/activity/index.html?pn=harmonyosconnectpc",
      "actonUrl": "",
      "bgColor": "#ED2E35",
      "dataSourceCode": "DB000044",
      "dataSourceType": "ad",
      "id": 29135,
      "imgUrl": "/uomcdn/CN/cms/202202/B53ABB8B90DC11AABDDE6F379FF57866.png",
      "imgWebpUrlMap": {
        "webp_1": "/uomcdn/CN/cms/202202/B53ABB8B90DC11AABDDE6F379FF57866.png.25.webp",
        "webp_2": "/uomcdn/CN/cms/202202/B53ABB8B90DC11AABDDE6F379FF57866.png.50.webp",
        "webp_3": "/uomcdn/CN/cms/202202/B53ABB8B90DC11AABDDE6F379FF57866.png.75.webp",
        "webp_4": "/uomcdn/CN/cms/202202/B53ABB8B90DC11AABDDE6F379FF57866.png.webp"
      },
      "tagSelected": "{}",
      "title": "行业"
    },
    {
      "actionUrlWap": "",
      "actionUrlWeb": "https://www.vmall.com/portal/activity/index.html?pn=zhixuanpc",
      "actonUrl": "",
      "bgColor": "#ED2E35",
      "dataSourceCode": "DB000044",
      "dataSourceType": "ad",
      "id": 9059,
      "imgUrl": "/uomcdn/CN/cms/202202/15550D184131C453A2CED9E443AEDDF8.jpg",
      "imgWebpUrlMap": {
        "webp_1": "/uomcdn/CN/cms/202202/15550D184131C453A2CED9E443AEDDF8.jpg.25.webp",
        "webp_2": "/uomcdn/CN/cms/202202/15550D184131C453A2CED9E443AEDDF8.jpg.50.webp",
        "webp_3": "/uomcdn/CN/cms/202202/15550D184131C453A2CED9E443AEDDF8.jpg.75.webp",
        "webp_4": "/uomcdn/CN/cms/202202/15550D184131C453A2CED9E443AEDDF8.jpg.webp"
      },
      "tagSelected": "{}",
      "title": "智选"
    },
    {
      "actionUrlWap": "",
      "actionUrlWeb": "https://www.vmall.com/portal/activity/index.html?pn=zhcxaitoweb",
      "actonUrl": "",
      "bgColor": "#ED2E35",
      "dataSourceCode": "DB000044",
      "dataSourceType": "ad",
      "id": 18893,
      "imgUrl": "/uomcdn/CN/cms/202201/3E994BF010D07F8CD8E8B445514A06F5.png",
      "imgWebpUrlMap": {
        "webp_1": "/uomcdn/CN/cms/202201/3E994BF010D07F8CD8E8B445514A06F5.png.25.webp",
        "webp_2": "/uomcdn/CN/cms/202201/3E994BF010D07F8CD8E8B445514A06F5.png.50.webp",
        "webp_3": "/uomcdn/CN/cms/202201/3E994BF010D07F8CD8E8B445514A06F5.png.75.webp",
        "webp_4": "/uomcdn/CN/cms/202201/3E994BF010D07F8CD8E8B445514A06F5.png.webp"
      },
      "tagSelected": "{}",
      "title": "AITO"
    },
    {
      "actionUrlMp": "",
      "actionUrlWap": "",
      "actionUrlWeb": "https://www.vmall.com/portal/activity/index.html?pageId=401021384",
      "actonUrl": "",
      "bgColor": "#ED2E35",
      "dataSourceCode": "DB000044",
      "dataSourceType": "ad",
      "id": 29439,
      "imgUrl": "/uomcdn/CN/cms/202202/B1726D36C05F0486A3D07605F34A4C7D.png",
      "imgWebpUrlMap": {
        "webp_1": "/uomcdn/CN/cms/202202/B1726D36C05F0486A3D07605F34A4C7D.png.25.webp",
        "webp_2": "/uomcdn/CN/cms/202202/B1726D36C05F0486A3D07605F34A4C7D.png.50.webp",
        "webp_3": "/uomcdn/CN/cms/202202/B1726D36C05F0486A3D07605F34A4C7D.png.75.webp",
        "webp_4": "/uomcdn/CN/cms/202202/B1726D36C05F0486A3D07605F34A4C7D.png.webp"
      },
      "tagSelected": "{}",
      "title": "智慧办公"
    },
    {
      "actionUrlWap": "",
      "actionUrlWeb": "https://www.vmall.com/portal/activity/index.html?pageId=301002069",
      "actonUrl": "",
      "bgColor": "#ED2E35",
      "dataSourceCode": "DB000044",
      "dataSourceType": "ad",
      "id": 19369,
      "imgUrl": "/uomcdn/CN/cms/202202/083AA2A10A88835A2BE7A786DC18F85F.jpg",
      "imgWebpUrlMap": {
        "webp_1": "/uomcdn/CN/cms/202202/083AA2A10A88835A2BE7A786DC18F85F.jpg.25.webp",
        "webp_2": "/uomcdn/CN/cms/202202/083AA2A10A88835A2BE7A786DC18F85F.jpg.50.webp",
        "webp_3": "/uomcdn/CN/cms/202202/083AA2A10A88835A2BE7A786DC18F85F.jpg.75.webp",
        "webp_4": "/uomcdn/CN/cms/202202/083AA2A10A88835A2BE7A786DC18F85F.jpg.webp"
      },
      "tagSelected": "{}",
      "title": "莫塞尔"
    }
  ]
  ```
  :::

  ::: details Click me to view the code html
  ```html
  <div class="banner">
    <!-- 1.图片 -->
    <ul class="images"></ul>

    <!-- 2.左右按钮 -->
    <div class="control prev"></div>
    <div class="control next"></div>

    <!-- 3.指示器(小圆点) -->
    <div class="indicator"></div>
  </div>
  ```
  :::

  ::: details Click me to view the code js
  ```js
  <script src="./json/banner_data.js"></script>

  // 0.资源服务器地址
  var serverURL = "https://res.vmallres.com"

  // 1.获取元素
  var bannerEl = document.querySelector(".banner")
  var imagesEl = bannerEl.querySelector(".images")
  var indicatorEl = bannerEl.querySelector(".indicator")

  // 2.定义变量
  var bannersCount = banners.length // banners的长度大小

  // 3.根据数据动态添加页面内容
  // 3.1 动态添加图片相关内容
  for (var i = 0; i < bannersCount; i++) {
    // 3.1 获取数据
    var banner = banners[i]

    // 3.2创建li元素
    var itemEl = document.createElement("li")
    itemEl.classList.add("item")
    // 默认显示第一张图片
    if (i === 0) itemEl.classList.add("active")
    imagesEl.append(itemEl)

    // 🚚 方法一: 一个一个创建元素

    // 3.3创建a元素
    // var aEl = document.createElement("a")
    // aEl.href = "#"
    // itemEl.append(aEl)

    // // 3.4创建img元素
    // var imgEl = document.createElement("img")
    // imgEl.src = `${serverURL}${banner.imgUrl}`
    // aEl.append(imgEl)

    // 🚚 方法二: innerHTML
    itemEl.innerHTML = `
      <a href="#">
        <img src = "${serverURL}${banner.imgUrl}">
      </a>
    `
  }

  // 3.2 动态添加指示器(小圆点)内容
  for (var i = 0; i < bannersCount; i++) {
    var itemEl = document.createElement("div")
    itemEl.classList.add("item")
    // 默认显示第一张图片
    if (i === 0) itemEl.classList.add("active")
    indicatorEl.append(itemEl)
  }
  ```
  :::

### 3. 自动轮播

  ::: details Click me to view the code css
  ```css
  .banner .images .item {
    ...
    /* 添加过渡动画 */
    transition: opacity 500ms ease;
  }
  ```
  :::

  ::: details Click me to view the code js
  ::: code-group
  ```js
  ...

  // 2.定义变量
  ...
  var currentIndex = 0 // 当前索引
  var imagesActiveEl = imagesEl.querySelector(".active") // 图片选中
  var indicatorActiveEl = indicatorEl.querySelector(".active") // 指示器(小圆点)选中
  ...
  
  // 4.自动轮播
  setInterval(function () {
    currentIndex++
    if (currentIndex === bannersCount) currentIndex = 0

    // 切换轮播图
    switchBanner()
  }, 3000)

  // 封装函数: 切换轮播图
  function switchBanner() {
    // 1.切换图片的item
    // 移除之前的active,添加新的active,记住最新的activeEl
    imagesActiveEl.classList.remove("active")
    var currentItemEl = imagesEl.children[currentIndex]
    currentItemEl.classList.add("active")
    imagesActiveEl = currentItemEl


    // 2.切换指示器(小圆点)的item
    indicatorActiveEl.classList.remove("active")
    var currentInItemEl = indicatorEl.children[currentIndex]
    currentInItemEl.classList.add("active")
    indicatorActiveEl = currentInItemEl
  }
  ```

  ```js
  ...

  // 2.定义变量
  ...
  var currentIndex = 0 // 当前索引
  var previousIndex = 0 // 上一个索引
  var currentIndex = 0 // 当前索引
  ...
  
  // 4.自动轮播
  setInterval(function () {
    previousIndex = currentIndex
    currentIndex++
    if (currentIndex === bannersCount) currentIndex = 0

    // 切换轮播图
    switchBanner()
  }, 3000)

  // 封装函数: 切换轮播图
  function switchBanner() {
    // 1.切换图片的item
    // 让currentIndex变成active状态,让previousIndex变成普通状态
    var currentItemEl = imagesEl.children[currentIndex]
    var previousItemEl = imagesEl.children[previousIndex]
    previousItemEl.classList.remove("active")
    currentItemEl.classList.add("active")
  
    // 2.切换指示器(小圆点)的item
    var currentInItemEl = indicatorEl.children[currentIndex]
    var previousInItemEl = indicatorEl.children[previousIndex]
    previousInItemEl.classList.remove("active")
    currentInItemEl.classList.add("active")
  }
  ```
  :::

  `👆🏻方法 推荐使用第二种方法`

### 4. 鼠标移动到banner上清除定时器

  ::: details Click me to view the code js
  ```js
  ...

  // 2.定义变量
  ...
  var timeID = null // 定时器

  ...

  // 4.自动轮播(开启定时器)
  startTime()

  // 5.鼠标移动到banner上清除定时器
  bannerEl.onmouseenter = function () {
    // 清除定时器
    stopTime()
  }

  // 6.鼠标离开banner开启定时器
  bannerEl.onmouseleave = function () {
    //开启定时器
    startTime()
  }

  ...

  // 封装函数: 开启定时器
  function startTime() {
    if (timeID) return
    timeID = setInterval(function () {
      previousIndex = currentIndex
      currentIndex++
      if (currentIndex === bannersCount) currentIndex = 0

      // 切换轮播图
      switchBanner()
    }, 3000)
  }

  // 封装函数: 清除定时器
  function stopTime() {
    if (!timeID) return
    clearInterval(timeID)
    timeID = null // 清除定时器之后, 必须timeID赋值为null
  }
  ```
  :::

### 5. 指示器(小圆点)的点击

  ::: details Click me to view the code js
  ::: code-group
  ```js
  ...

  // 3.2 动态添加指示器(小圆点)内容
  for (var i = 0; i < bannersCount; i++) {
    ...

    // 监听指示器(小圆点)的点击
    // 🚚 方法一
    // 获取索引
    itemEl.index = i
    itemEl.onclick = function() {
      previousIndex = currentIndex
      currentIndex = this.index
      // 切换轮播图
      switchBanner()
    }
  }
  ...
  ```
  ```js
  // 7.监听指示器(小圆点)的点击
  indicatorEl.onclick = function (event) {
    if (event.target === this) return
    currentInItemEl = event.target

    // 获取索引
    // 🚚 方法一: for
    // for (var i = 0; i < indicatorEl.children.length; i++) {
    //   var itemEl = indicatorEl.children[i]
    //   if (itemEl === currentInItemEl) {
    //     var index = i
    //     break
    //   }
    // }

    // 🚚 方法二: indexOf
    // var index = Array.from(this.children).indexOf(currentInItemEl)

    // 🚚 方法一: findIndex
    var index = Array.from(this.children).findIndex(function (item) {
      return item === currentInItemEl
    })

    previousIndex = currentIndex
    currentIndex = index

    // 切换轮播图
    switchBanner()
  }
  ```
  :::

  `👆🏻方法 推荐使用第一种方法`

### 6. 左右按钮的点击

  ::: details Click me to view the code js
  ```js
  // 1.获取元素
  ...
  var prevBtnEl = bannerEl.querySelector(".prev")
  var nextBtnEl = bannerEl.querySelector(".next")

  ...

  // 6.上下按钮的点击切换
  prevBtnEl.onclick = function () {
    // 找到上一个
    previousIndex = currentIndex
    currentIndex--
    if (currentIndex === -1) currentIndex = bannersCount - 1

    // 切换轮播图
    switchBanner()
  }

  nextBtnEl.onclick = function () {
    // 找到下一个
    previousIndex = currentIndex
    currentIndex++
    if (currentIndex === bannersCount) currentIndex = 0

    // 切换轮播图
    switchBanner()
  }
  ```
  :::

  > `代码重构`

  ::: details Click me to view the code js
  ```js
  ...

  // 简洁写法: nextBtnEl.onclick = nextSwitch 不推荐 阅读性太差 🔥
  nextBtnEl.onclick = function () {
    // 切换下一个
    nextSwitch()
  }

  ...

  // 封装函数: 开启定时器
  function startTime() {
    if (timeID) return
    // 简洁写法: timeID = setInterval(nextSwitch,3000) 不推荐 阅读性太差 🔥
    timeID = setInterval(function () {
      // 切换下一个
      nextSwitch()
    }, 3000)
  }

  // 封装函数: 播放下一个
  function nextSwitch() {
    // 找到下一个
    previousIndex = currentIndex
    currentIndex++
    if (currentIndex === bannersCount) currentIndex = 0

    // 切换轮播图
    switchBanner()
  }

...

// 封装函数: 开启定时器
function startTime() {
  if (timeID) return
  // 简洁写法: timeID = setInterval(nextSwitch,3000) 不推荐 阅读性太差 🔥
  timeID = setInterval(function () {
    // 切换下一个
    nextSwitch()
  }, 3000)
}

// 封装函数: 播放下一个
function nextSwitch() {
  // 找到下一个
  previousIndex = currentIndex
  currentIndex++
  if (currentIndex === bannersCount) currentIndex = 0

  // 切换轮播图
  switchBanner()
}
  ```
  :::

### 7. 离开浏览器窗口时,清除定时器

  ```js
  // window的焦点(离开浏览器窗口时,清除定时器)
  document.onvisibilitychange = function () {
    // 如果离开当前浏览器页面,清除定时器; 如果在当前浏览器页面,开启定时器; 
    if (this.visibilityState === "hidden") {
      stopTime()
    } else if (this.visibilityState === "visible") {
      startTime()
    }
  }
  ```
  :::