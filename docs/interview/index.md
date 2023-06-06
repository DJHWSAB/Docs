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