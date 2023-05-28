---
layout: doc
---

# js

## 1. 变量未声明（declaration）就直接使用

  ```js
  console.log(message)

  👇🏻 报错
  
  Uncaught ReferenceError: messag is not defined
  ```

## 2. 变量有声明，但是没有赋值，那么默认值是undefined

  ```js
  var message 
  console.log(message)

  👇🏻 输出
  
  undefined
  ```
  var arr = ["abc", "bac", "acb", "cab", "cba"]

## 3. 只能在函数中使用return语句

  ```js
  // 在数组中第几次找到 acb
  var arr = ["abc", "bac", "acb", "cab", "cba"]
  var findStr = "acb"
  for (var i = 0; i < arr.length; i++) {
    if (findStr === arr[i]) {
      return console.log(i+1)
    }
  }

  👇🏻 报错
  
  Uncaught SyntaxError: Illegal return statement
  ```