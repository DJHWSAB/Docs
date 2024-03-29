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

  - Chrome控制台提示“Slow network is detected. Fallback font will be used while loading

  新版本的Chrome在网络环境较差的时候会在控制台输出`Slow network is detected. Fallback font will be used while loading`，但有时会对调试造成不便，可以在chrome配置中禁用该项：

  方法：地址栏输入`chrome://flags/#enable-webfonts-intervention-v2`，并设置为Disabled；重启Chrome。

  在Console 栏

  1. 点击小齿轮 Console settings

  2. 勾选 User messages only 即可

  ![chrome](/chrome_06.png)



  3. 下面这个地方勾掉也不会出那些xhr

  ![chrome](/chrome_07.png)

  - 警告：请勿将您不理解或未自行检查的代码粘贴到开发者工具控制台中。这可能会导致攻击者趁机窃取您的身份信息或控制您的计算机。请在下方输入“允许粘贴”以允许粘贴。

  ![chrome](/chrome_09.png)

  解决方法:

  1. 在控制台输入"允许粘贴",取消警告并启用粘贴功能。

  2. 打开控制台 - Settings（设置）- Experiments（实验），搜索 past ，取消勾选 Show warning
  about Self-XSS when pasting code。

  ![chrome](/chrome_10.png)

  ![chrome](/chrome_11.png)

  3. 关闭设置，点击顶部的 Reload DevTools 按钮，重新加载控制台，就可以正常粘贴了。

  ![chrome](/chrome_12.png)


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