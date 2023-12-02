---
layout: doc
---

# iTerm2

iTerm2 是 Terminal 的替代品，也是 iTerm 的继任者。它适用于装有 macOS 10.14 或更新版本的 Mac。iTerm2 以您从未想过的功能将终端带入现代。

Iterm2 是苹果系统增加的命令行工具，定制化很强使用方便，并且外观也好看。

## 1. [下载](https://iterm2.com/)
![iterm2](/iterm_01.png)

## 2. [颜色主题](https://iterm2colorschemes.com/#)

> 设置想要颜色主题，BlulocoDark

  ![iterm2](/iterm_02.png)

  1. 在桌面新建文件，命名：`BlulocoDark.itermcolors`

  2. 把 `BlulocoDark`的代码 复制到 `BlulocoDark.itermcolors`

  3. 打开 `item2` 设置界面，按照👇🏻操作，import 导入 `BlulocoDark.itermcolors`

  ![iterm2](/iterm_04.png)

## 3. 快捷键

  ::: details Click me to view the code
  ```shell
  #新建标签：
  command + t

  # 关闭标签：
  command + w

  #切换标签：
  command + 数字
  command + 左右方向键

  # 切换全屏：
  command + enter

  # 查找：
  command + f

  # 查看历史命令：
  command + ;

  # 查看剪贴板历史
  command + shift + h

  # 清除当前行：
  control + u

  # 到行首：
  control + a

  #到行尾：
  control + e

  # 删除光标之前的字符：
  control + h

  #删除光标之前的单词：
  control + w

  #清屏1：
  command + r

  #清屏2：
  ctrl + l

  ```

  ::: 

## 4. 终端切换语言

  ```shell
  # 当前的语言环境设置
  locale
  ```
  :loudspeaker: 将以下命令添加到您的`.bashrc`或`.zshrc`文件中，以便在每次启动终端时自动设置语言环境
  ::: code-group

   ```zh_CN
   export LANG="zh_CN.UTF-8"
   export LC_COLLATE="zh_CN.UTF-8"
   export LC_CTYPE="zh_CN.UTF-8"
   export LC_MESSAGES="zh_CN.UTF-8"
   export LC_MONETARY="zh_CN.UTF-8"
   export LC_NUMERIC="zh_CN.UTF-8"
   export LC_TIME="zh_CN.UTF-8"
   export LC_ALL=

   ```
   
   ```en_US
   export LANG="en_US.UTF-8"
   export LC_COLLATE="en_US.UTF-8"
   export LC_CTYPE="en_US.UTF-8"
   export LC_MESSAGES="en_US.UTF-8"
   export LC_MONETARY="en_US.UTF-8"
   export LC_NUMERIC="en_US.UTF-8"
   export LC_TIME="en_US.UTF-8"
   export LC_ALL=
   
   ```
  ::: 

## 5. 关闭每日提示
 
 ![iterm2](/iterm_08.png)

## 6. 全屏窗口下使用iterm2
  - 增加 Hotkey Window
    - Hotkey Window
      - Keys --> Hotkey --> Create a Dedicated Hotkey Window...
      
      ![iterm2](/iterm_09.png)
      
      ![iterm2](/iterm_10.png)
      
      ![iterm2](/iterm_11.png)
      
      ![iterm2](/iterm_13.png)
    
    - 快捷键
    ```shell
    # 显示/隐藏窗口
    ⌥ + 空格
    ```

## 8. 取消iterm关闭时询问是否关闭弹窗

  1. Preferences -> General -> Closing
  
  2. 勾选 Confirm "Quit iTerm2" 选项后，再次取消勾选该选项即可

  3. 关闭iTerm2应用程序，再次打开时，关闭时将不再提示是否关闭

  ![iterm2](/iterm_12.png)
