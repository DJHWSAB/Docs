---
layout: doc
---

# Chrome

## 1. [下载](https://www.google.cn/intl/zh-CN/chrome/)

  ![chrome](/chrome_01.png)

## 2. [插件](https://www.crxsoso.com/?utm=itab)

  ![chrome](/chrome_02.png)

  ![chrome](/chrome_03.png)

  ![chrome](/chrome_04.png)

  > 个人推荐

  ![chrome](/chrome_05.png)

## 3. 常见快捷键

  1. 搜索框自动聚焦: /

  2. 关闭当前标签页: ⌘ + w

  3. 切换标签页:  ⌘ + 数字

  4. 新建标签页: ⌘ + t

  5. 新建Chrome页面: ⌘ + n

## 4. 常见问题

  > <font color="red">Chrome控制台提示“Slow network is detected. Fallback font will be used while loading</font>

  新版本的Chrome在网络环境较差的时候会在控制台输出`Slow network is detected. Fallback font will be used while loading`，但有时会对调试造成不便，可以在chrome配置中禁用该项：

  方法：地址栏输入`chrome://flags/#enable-webfonts-intervention-v2`，并设置为Disabled；重启Chrome。

  在Console 栏

  1. 点击小齿轮 Console settings

  2. 勾选 User messages only 即可

  ![chrome](/chrome_06.png)

  3. 下面这个地方勾掉也不会出那些xhr

  ![chrome](/chrome_07.png)

  > <font color="red">警告：请勿将您不理解或未自行检查的代码粘贴到开发者工具控制台中。这可能会导致攻击者趁机窃取您的身份信息或控制您的计算机。请在下方输入“允许粘贴”以允许粘贴。</font>

  ![chrome](/chrome_09.png)

  解决方法:

  1. 在控制台输入"允许粘贴",取消警告并启用粘贴功能。

  2. 打开控制台 - Settings（设置）- Experiments（实验），搜索 past ，取消勾选 Show warning
  about Self-XSS when pasting code。

  ![chrome](/chrome_10.png)

  ![chrome](/chrome_11.png)

  3. 关闭设置，点击顶部的 Reload DevTools 按钮，重新加载控制台，就可以正常粘贴了。

  ![chrome](/chrome_12.png)

  > <font color="red">插件警告</font>

  <font color="red">通过👇🏻 插件问题，方便以后解决类似问题</font>

  沉浸式翻译插件

  <font color="red">[Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive.</font>

  ![chrome](/chrome_13.png)

  - 从👆🏻知道是<font color="red">`沉浸式翻译插件中的content_script.js文件` 出现问题,问`ChatGPT`</font>

  - <font color="red">如何获取解决方法 ？</font>

  ```js
  在控制台中出现出现 Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive.
  发现沉浸式翻译：双语对照网页翻译&PDF文档翻译插件中的 content_script.js，请问怎么解决这个警告?
  ```

  ```js
  document.addEventListener('touchstart', yourEventHandler);
  ```

  你应该将其修改为：

  ```js
  document.addEventListener('touchstart', yourEventHandler, { passive: true });
  ```

  这样，事件监听器就被标记为<font color="red">`passive`</font>，警告信息应该就会消失。 请注意，如果你的事件处理函数确实需要调用<font color="red">`preventDefault`</font>方法来阻止默认行为，那么就不能将其设置为<font color="red">`passive`</font>。在这种情况下，你需要重新考虑你的代码逻辑，或者寻找其他方法来优化性能。 总之，为了提高网页的性能和用户体验，建议尽可能地将滚动事件的监听器设置为<font color="red">`passive`</font>。

  - 根据 👆🏻方法，找到 <font color="red">`沉浸式翻译`</font> 这个插件，修改 <font color="red">`content_script.js文件`</font> ✅

  - 从 <font color="red">`github 沉浸式翻译`</font> 插件 和 扩展上的 <font color="red">`沉浸式翻译` </font> 插件发现<font color="red">`版本号`</font> 不一样，以为已经解决👆🏻bug，所以从 <font color="red"> `github`</font> 下载该插件，发现还是出现相同的bug ！！！

  ![chrome](/chrome_14.png)

  ![chrome](/chrome_15.png)

  - 没有办法，只能下载最新版本的，在项目中的 <font color="red">`content_script.js` </font>文件解决这个bug

  ![chrome](/chrome_16.png)

  ```js
  o.current.removeEventListener("touchstart", A, { passive: true });
  ```

  - 最后在 <font color="red">`Chrome`</font> 的 <font color="red">`扩展程序`</font>中 <font color="red">`重新加载`</font>

  ![chrome](/chrome_17.png)

  - 在控制台可以看到 <font color="red">`content_script.js`</font>文件已修改

  ![chrome](/chrome_18.png)

## 5. Google搜索技巧

  1. 以图搜片

  ![chrome](/chrome_08.png)

  2. 搜索特定文件类型

  ```shell
  # 文件名 filetype:类型
  GPT-4 filetype:pdf

  xxx:torrent
  ```

  3. 搜索特定大小的图片

  ```shell
  Apple:50x50
  ```

  4. 搜索特点范围的数字

  ```shell
  哪个队伍赢得了的斯坦利杯...2004
  ```

  5. 排除法

  ```shell
  # -关键词
  如何编写React组件-class
  ```

  6. 缓存查询

  ```shell
    # cache:网址
    cache:www.freedidi.com
  ```