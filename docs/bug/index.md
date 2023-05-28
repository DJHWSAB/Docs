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

  ![bug_js](/bug_js_01.png)

  [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Bad_return)


## 4. 使用递归函数必须有结束条件

  ```js
  var count = 0
  function bar() {
    console.log(count++)
    bar()
  }
  bar(0)
  
  👇🏻 报错

  Uncaught RangeError: Maximum call stack size exceeded
  ```

## 5. 函数声明 和 函数表达式 的执行顺序不同

  ```js
  // 函数声明
  foo() // 1

  function foo() {
    console.log(1)
  }

  // 函数表达式 
  bar()
  var bar = function() {
    console.log(2)
  }

  `函数声明` 可以在 `定义函数前面先调用函数`, `函数表达式` `只能先定义函数才能调用函数` ,要不然会报错
  👇🏻
  Uncaught TypeError: bar is not a function

  ```