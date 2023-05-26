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
