---
layout: doc
---

# Alfred
> Alfred 是一款屡获殊荣的 macOS 应用程序，可通过热键、关键字、文本扩展等提高您的效率。搜索您的 Mac 和网络，并通过自定义操作来更高效地控制您的 Mac。

## 1. 唤醒-设置热键【command+空格】

  1. 取消mac系统自带的 `聚焦搜索` 快捷键

  ![Alfred](/Alfred_01.png)
  
  ![Alfred](/Alfred_02.png)

  2. 设置 `Alfred` 热键

  ![Alfred](/Alfred_03.png)


## 2. File Search - 文件检索
> 可以将下列关键字进行修改

  - open + 搜索词，表示打开文件
  - find + 搜索词，表示打开该文件所在的目录
  - in + 关键词，搜索文件内容包含该关键词的文件
  - tags + 关键词，搜索包含该标签的文件

  ![Alfred](/Alfred_04.png)

  1. 快速打开App,切换App

  ![Alfred](/Alfred_05.png)
  
  2. open + 文件，便可以快速打开

  ![Alfred](/Alfred_06.png)

  3. 快速预览图片文件（模糊或精确匹配移动到文件或图片上按shift）
  
  ![Alfred](/Alfred_07.png)

## 3. 剪切板历史设置

  - 设置文本图片保留时长
  - 设置呼起切剪历史快捷 option(⌥) + v
  - 设置关键字
  - 设置清除指令 cl

  ![Alfred](/Alfred_08.png)

  option(⌥) + c 查看

  ![Alfred](/Alfred_09.png)

## 4. 设置快捷打开web
> 以 B站 为例

  - Workfolws: Templates > Web and Urls > Open custom URL in specified browser
  
  ![Alfred](/Alfred_10.png)
  
  - 双击此处

  ![Alfred](/Alfred_11.png)
  
  ![Alfred](/Alfred_12.png)

  - 输入网址

  ![Alfred](/Alfred_13.png)

## 5. 设置快捷搜索web
> 以 B 站 为例

  ![Alfred](/Alfred_14.png)
  
  ![Alfred](/Alfred_15.png)

  ```shell
  百度：https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=&tn=baiduerr&bar=&wd={query}
  掘金搜索：https://juejin.cn/search?query={query}&fromSeo=0&fromHistory=0&fromSuggest=0
  知乎内容：https://www.zhihu.com/search?type=content&q={query}
  京东搜索：https://search.jd.com/Search?enc=utf-8&keyword={query}
  GitHub：https://github.com/search?q={query}&type=repositories
  StackOverflow：https://www.stackoverflow.com/search?q={query}
  MDN：https://developer.mozilla.org/zh-CN/search?q={query}
  哔哩哔哩：https://search.bilibili.com/all?keyword={query}
  ```
  ```shell
  Search MDN for `{query}`
  ```

## 6. 插件
> 下载完插件，直接双击打开即可

  - Visual Studio Code plus  `启动 vsocde`
    - 访达中打开文件夹后，不选中文件情况下，输入 `code`
    
    ![Alfred](/Alfred_16.png)
    
    - 在访达中打开文件夹，选中文件情况下，输入 `code`
    
    ![Alfred](/Alfred_17.png)

  - NewPath  `创建文件`
    1. mkdir xx 创建空文件夹
    2. mkdiro xx 创建空文件夹并自动打开
    3. touch xx.xx 创建文件（例如 touch index.md）
  
  - Ip-Address 可以直接获取本机ip和公网ip

    ![Alfred](/Alfred_18.png)
  
  - GitClone 自动读取剪切板的git仓库地址，并克隆到指定的目录
    - 修改默认终端
    ```shell
    on alfred_script(q)
      tell application "iTerm"
          activate
          tell current window
              tell current session
                  write text q
              end tell
          end tell
      end tell
    end alfred_script
    ```
    ![Alfred](/Alfred_19.png)

    - 先复制地址

    ![Alfred](/Alfred_20.png)

    - 输入命令 `cloneto de` ，克隆到本地

    ![Alfred](/Alfred_21.png)

  - procedure 全局快捷键 option(⌥) + 1 打开/激活 Typora

    ![Alfred](/Alfred_22.png)

    ![Alfred](/Alfred_23.png)

    ```shell
    on alfred_script(q)
       tell application "Typora"
          if not running then
             run
             delay 0.5
          end if
          reopen
    	  activate
          set miniaturized of every window to false
       end tell
    end alfred_script
    ```
        
    ![Alfred](/Alfred_36.png)
    
    ![Alfred](/Alfred_37.png)

  - sequence 生成序列，多用于列编辑

    ![Alfred](/Alfred_24.png)
    
    ![Alfred](/Alfred_25.png)

    ![Alfred](/Alfred_26.png)

  - css 把写好的css【内联样式】和【内部样式之间】互相转换

    1. 内联->内部：复制内联样式（不包含style=""，仅复制里面的样式内容），alfred命令 style

    ![Alfred](/Alfred_27.png)

    ![Alfred](/Alfred_28.png)
    
    ![Alfred](/Alfred_29.png)

    2. 内部->内联：复制内部样式（不包含<style></style>，仅复制里面的样式内容），alfred命令 inline
    
    ![Alfred](/Alfred_30.png)
    
    ![Alfred](/Alfred_31.png)
    
    ![Alfred](/Alfred_32.png)

  - TerminalFinder 在 Finder(访达) 和 终端（包括iterm）之间来回切换的组件

    1. 打开 桌面 Finder(访达)

    ![Alfred](/Alfred_33.png)
    
    ![Alfred](/Alfred_34.png)

    2. 打开 访达 的 终端
    > 默认情况下,必须有 Finder(访达) ,否则打不开 终端（包括iterm）
    
    ![Alfred](/Alfred_35.png)
