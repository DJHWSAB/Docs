---
layout: doc
---

# js

## 1. 封装工具类函数

### 1. 数字转换文本

  > 传入一个数字，可以根据数字转化成显示为 亿、万文字显示的文本；

  - Math.floor()：向下取整

  - 语法糖的概念：一种简写或者特殊的写法，这种写法相对于原有的写法更加的方便或者阅读性更强；相比于原来的写法，有一点点的甜头，称之为 `语法糖`
  
    - 10_0000_0000 就是 1000000000 语法糖

  ::: details Click me to view the code
  ```js
  // 封装一个工具函数: 对数字进行格式化
  function formatCount (count) {
    var result = 0
    // 大于10亿的情况下进行转换
    if (count >= 10_0000_0000) { // 1_0000_0000 es6的语法糖
      // result = `${Math.floor(count / 1_0000_0000)}亿` 模版字符串
      result = Math.floor(count / 1_0000_0000) + "亿"
    } else if (count >= 10_0000) { // 大于10万的情况下进行转换
      result = Math.floor(count / 1_0000) + "万"
    } else {
      result = count
    }
    return result
  }

  console.log(formatCount(87_6663_3333)) // 87亿
  console.log(formatCount(543_3322)) // 543万
  console.log(formatCount(13687)) // 13687
  ```
  :::