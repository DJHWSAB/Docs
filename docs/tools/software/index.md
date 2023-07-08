---
layout: doc
---

# Vscode

  VSCode 是微软推出的跨平台、扩展组件丰富的文本编辑器

## 1. 下载安装

  ![vscode](/vscode_01.png)

  官方提供 [稳定的发行版本](https://code.visualstudio.com/) 与 [最新测试版本](https://code.visualstudio.com/insiders/) 两个版本。

  > 苹果M1芯片电脑，记得选择 [Apple silicon](https://code.visualstudio.com/Download) 版本，拥有更好的性能

  ![vscode](/vscode_02.png)

## 2. 彻底删除

有时编辑器安装插件过多，造成异常时就需要重置 VSCODE。

> 重置前将安装的插件和热键备份，在下次重装时就省很多事情，具体操作方式请看下面的章节

### 2.1 mac

  1. 首先删除 vscode 软件（可以使用腾讯柠檬清理删除）

  2. 执行以下命令删除 vscode 本地数据

  ```shell
  rm -rf ~/Library/Application\ Support/Code
  rm -rf ~/.vscode
  ```

  3. 如果是 insider 版本执行以下命令删除本地数据

  ```shell
  rm -rf ~/Library/Application\ Support/Code\ -\ Insiders/
  rm -rf ~/.vscode-insiders/
  ```

### 2.2 window

  1. 首先删除 vscode 软件

  2. window 系统删除以下文件夹 将houdunren 换成你的帐号

  ```shell
  C:\Users\houdunren\.vscode
  C:\Users\houdunren\AppData\Roaming\Code
  ```

## 3. 插件

  1. Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code

  ![vscode](/vscode_03.png)

  2. Atom One Dark Theme 颜色主题

  ![vscode](/vscode_04.png)

  3. VSCode Great Icons 文件图标主题

  ![vscode](/vscode_05.png)

  4. Live Server 自动在浏览器中打开网页

  ![vscode](/vscode_06.png)

  > 如果状态栏没有 `Go Live`,可以考虑降级

  5. 翻译(英汉词典)

  ![vscode](/vscode_07.png)

  6. Path Intellisens 路径

  ![vscode](/vscode_08.png)

  7. Svg Preview svg 图片预览

  ![vscode](/vscode_09.png)

  8. Better Comments 注释高亮

  ![vscode](/vscode_10.png)

  ![vscode](/vscode_11.png)

  9. Error Lens 错误语法提示

  ![vscode](/vscode_12.png)

  ![vscode](/vscode_13.png)

  10. ES7+ React/Redux/React-Native snippets 打印语句(console.log)

  ![vscode](/vscode_14.png)

  11. Code Spell Checke

  ![vscode](/vscode_28.png)

  12. Template String Converter

  ![vscode](/vscode_29.png)

  13. Image preview 图片预览

  ![vscode](/vscode_30.png)

  14. Code Runner

  ![vscode](/vscode_31.png)

  15. Trailing Spaces 高亮标识出你末尾多余的space，并帮你快速删除它们

  ![vscode](/vscode_35.png)


## 4. 配置

### 4.1 相关配置

  1. Auto Save: 自动保存

  ![vscode](/vscode_15.png)

  2. Font Size: 修改代码字体大小

  ![vscode](/vscode_16.png)

  3. Word Wrap: 代码自动换行

  ![vscode](/vscode_17.png)

  4. Render Whitespace: 空格的渲染方式(个人推荐)

  ![vscode](/vscode_18.png)

  5. Tab Size: 代码缩进，推荐2个空格（公司开发项目基本都是2个空格）

  ![vscode](/vscode_19.png)

  6. 行内元素(a、span、i...)自动换行

  ```json
  "emmet.syntaxProfiles": {
    "html": {
        "inline_break": 1
    }
  }
  ```

  7. 代码块出现提示线

  ```json
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  ```

  8. 滚动条滚动时出现代码层级

  ```json
  "editor.stickyScroll.enabled": true
  ```

  9. 修改终端的 光标 和 字体大小

  ![vscode](/vscode_20.png)

  ![vscode](/vscode_21.png)

  10. 控制台输出时滚动条自动滚动
  ![vscode](/vscode_34.png)

### 4.2 完整的配置

::: details Click me to view the code
  ```json
  {
    // 关闭欢迎界面
    "workbench.startupEditor": "none",
    // 颜色主题
    "workbench.colorTheme": "Atom One Dark",
    // 终端字体大小
    "terminal.integrated.fontSize": 18,
    // 终端光标类型
    "terminal.integrated.cursorStyle": "line",
    // 字体大小
    "editor.fontSize": 18,
    // 自动保存
    "files.autoSave": "afterDelay",
    // 👇🏻两行代码 ----- 实现代码自动换行
    "editor.wordWrap": "on",
    "diffEditor.wordWrap": "on",
    // 空格的渲染方式
    "editor.renderWhitespace": "all",
    // 代码缩进2个空格
    "editor.tabSize": 2,
    // 行内元素(a、span、i...)自动换行
    "emmet.syntaxProfiles": {
        "html": {
            "inline_break": 1
        }
    },
    // 👇🏻两行代码 ----- 实现代码块出现提示线
    "editor.bracketPairColorization.enabled": true,
    "editor.guides.bracketPairs": "active",
    // 滚动条滚动时出现代码层级
    "editor.stickyScroll.enabled": true,
    // 允许打开未受信任的文件
    "security.workspace.trust.untrustedFiles": "open",
    // 报错语法提示
    "typescript.locale": "zh-CN",
    // 显示索略图
    "editor.minimap.autohide": true,
    // Live Server扩展的信息提示
    "liveServer.settings.donotShowInfoMsg": true,
    // 保存时自动格式化代码功能
    "editor.formatOnSave": true,
    // 更换HTML元素(更换开始标签,结束标签同步更改 / 更换结束标签,开始标签同步更改)
    "editor.linkedEditing": true,
    // 修改liveServer端口
    "liveServer.settings.port": 8080,
    // 开启悬停显示翻译结果
    "EnglishChineseDictionary.enableHover": true,
    // Code Spell Checker 标记后不会被认为是拼写错误
    "cSpell.userWords": [
        "autohide",
        "coderccb",
        "donot",
        "Matebook",
        "vitepress"
    ],
    // template-string-converter 相关配置(只需要输入${},自动将 双引号"" 转换成 模版字符串`${}`)
    // 扩展适用的语言
    "template-string-converter.validLanguages": [
        "svelte",
        "typescript",
        "javascript",
        "typescriptreact",
        "javascriptreact",
        "js"
    ],
    // 👇🏻两行代码 ----- 删除 `${}` 中的 $, {, } 都会自动转换成 双引号
    "template-string-converter.autoRemoveTemplateString": true,
    "template-string-converter.convertWithinTemplateString": false,
    // 禁止突出显示歧义字符
    "editor.unicodeHighlight.ambiguousCharacters": false,
    // 文件主题颜色
    "workbench.iconTheme": "vscode-great-icons",
    // 保存自动删除空格
    "trailing-spaces.trimOnSave": true
  }
  ```
:::

## 5. 平滑移动

  vscode 中使用 vim 时，默认情况下移动光标会有卡顿延迟，下面来设置平滑移动光标。

  1. 在命令行执行以下命令

  ```shell
  # For VSCode
  defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false

  # For VSCode Insiders
  defaults write com.microsoft.VSCodeInsiders ApplePressAndHoldEnabled -bool false
  ```

  2. 修改 系统偏好设置 > 键盘 更改 按键重复 与 重复前延迟

  ![vscode](/vscode_22.png)

## 6. 快捷键

::: details Click me to view the code
  ```shell
  单行注释: ⌘ + /

  多行注释: ⌥ + ⇧ + A

  移动行: ⌥ + ↑ ↓

  显示/隐藏左侧目录栏: ⌘ + b

  复制当前行: ⌥ + ⇧ + ↑ ↓

  删除当前行: ⌘ + delete

  跳转指定函数: ⌃ + g

  控制台终端显示与隐藏: ⌃ + ~

  查找文件: ⌘ + p

  新建一个窗口 : ⌘ + ⇧ + n

  行增加缩进: ⌘ + [

  行减少缩进: ⌘ + ]

  字体放大/缩小: ⌘ + ( + 或 - )

  查找: ⌘  + f

  全局查找文件: ⌘ + ⇧ + f

  删除行 :  ⌘ + delete

  快速回到顶部 :  ⌘ + ↑

  快速回到底部 : ⌘ + ↓

  多行同时添加内容（光标） : ⌥ + ⌘ + ↓（↑）

  随意多行同时添加内容（光标）: ⌥ + 鼠标点击

  全局替换: ⌘ + ⇧ + h

  打开最近打开的文件: ⌥ + r

  终端: ⌃ + `
  ```
:::

## 7. 常见问题

### 7.1 vscode中回车与自动补全起冲突

  1. 打开键盘快捷方式

  ![vscode](/vscode_23.png)

  2. 搜索框中输入 acceptSelectedSuggestion

  ![vscode](/vscode_24.png)

  3. 找到acceptSelectSuggestion，默认情况下一条绑定Tab键，一条绑定Enter键，选中Enter的那条右键删除键绑定。

  4. 取消了之后不能像我们取消时的操作那样，用添加键绑定加回去。这时需按下 `ctrl+shift+p` ,调出 `命令面板` ,然后输入 `keyboard` ,选择这一个:

  ![vscode](/vscode_25.png)

  进去以后在 `keybindings.json` 文件中加入这段代码:

  ```json
  {
    "key": "enter",
    "command": "acceptSelectedSuggestion",
    "when": "acceptSuggestionOnEnter && suggestWidgetVisible && suggestionMakesTextEdit && textInputFocus"
  }
  ```

### 7.2 Code安装似乎损坏,请重新安装.

  1. 我们下载一个叫Fix VSCode Checksums的扩展

  ![vscode](/vscode_26.png)

  2. `ctrl+shift+P` 打开命令面板

  3. 输入 `Fix Checksums: Apply`

  ![vscode](/vscode_27.png)

  4. 最后重启vscode就好啦~

### 7.3 Code Runner 上的“运行”按钮时，出现错误“未找到命令‘code-runner.run’ ”

  1. 卸载 CodeRunner 插件

  2. 删除 Code Runner 配置文件和文件夹

  3. mac 打开extensions
  ```shell
  ~/.vscode
  open extensions
  ```

  ![vscode](/vscode_32.png)

  4. win 打开extensions
  ```shell
  cd ~/.vscode
  start extensions
  ```

  ![vscode](/vscode_33.png)
