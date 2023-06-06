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

  ```html
  <div class="countdown">
    <span class="time hour">00</span>
    <span class="split">:</span>
    <span class="time minute">00</span>
    <span class="split">:</span>
    <span class="time second">00</span>
  </div>
  ```

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

  ::: details Click me to view the code
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