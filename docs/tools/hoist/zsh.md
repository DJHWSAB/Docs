---
layout: doc
---

# zsh

 [zsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH) 可以提高终端使用体验，是命令行终端必装软件, Zsh 是一种替代 Bash 的 Shell，它具有更多的功能和可定制性。

## 1. 安装 xcode

  在 mac 上还是建议使用 item 做为命令行终端，先安装 xcode。之前已经安装了,如果还没有安装,请看下面这篇关于 [xcode](/tools/hoist/xcode)

## 2. 安装 brew

  如果没有 brew 命令请自行安装, 之前已经安装了,如果还没有安装,请看下面这篇关于 [brew](/tools/hoist/brew)

## 3. 安装 zsh 和 zsh-completions

  > 下面两种方法任选其中一种即可

### 3.1 利用 brew 安装

  ```shell
  # 安装 zsh 和 自动补全插件
  brew install zsh zsh-completions

  # 将当前用户的默认 shell 更改为 zsh
  chsh -s /bin/zsh

  # 检查 zsh 版本
  zsh --version

  # 检查自动补全插件是否已加载,如果输出了 Zsh 的版本号，则说明自动补全插件已成功加载
  echo $ZSH_VERSION
  ```

### 3.2 利用 安装 Macports

  1. 安装 [port](https://www.macports.org/install.php)

  ![zsh](/zsh_01.png)

  按照操作  -> 关于本机 ,获取你的mac系统版本
  
  ![zsh](/zsh_02.png)
  
  ![zsh](/zsh_03.png)
  
  2. 安装后需要执行
  
  ![zsh](/zsh_04.png)

  ```shell
  export PATH=/opt/local/bin:/opt/local/sbin:$PATH

  # 检查是否安装Macports,如果出现目录地址,则证明安装成功
  which port

  # 如果安装了Macports,显示版本号
  port version / port -v 
  ```

  3. 安装 zsh 和 zsh-completions

  ```shell
  # 安装 zsh 和 自动补全插件
  sudo port install zsh zsh-completions
  ```

## 4. oh my zsh

  [oh my zsh](https://ohmyz.sh/) 是管理 ZSH 的配置，并提供了丰富的插件

  ![zsh](/zsh_05.png)

### 4.1 安装 oh my zsh

  > 如果你前面没有安装 `zsh`,就没有必要继续下去哈

  - **软件安装**
    
    - 因为是国外资源可能下载不成功，多试几次

    ```shell
    sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
    ```

    - 如果上面的不行，试试下面的命令

    ```shell
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
    ```

    - 如果还是不能下载，就再试试下面的命令

    ```shell
    	sh -c "$(curl -fsSL https://gitee.com/shmhlsy/oh-my-zsh-install.sh/raw/master/install.sh)"
    ```

  **初始配置**

  第一次安装后，需要注销后重新登录。之后会显示如下初始配置界面，选择`q`退出

  ![zsh](/zsh_06.png)

  ```shell
  # 列出目录下所有文件包括以.开头的隐藏文件
  ls -a
  ```
  
  ![zsh](/zsh_07.png)

  主要在配置文件 `~/.zshrc` 中修改设置。

  > 有些软件比如 LINUXBREW，的配置保存在 `~/.profile` 文件中，安装了 zsh 就需要复制到 `~/.zshrc` 文件头部

### 4.2 修改主题

  将 `.zshrc`文件在vscode中打开

  ```sh
  code .zshrc
  ```

  :loudspeaker: 如果没有 code 命令，可以看 `vscode`

  **1. [查看主题](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)**

  ![zsh](/zsh_08.png)

  **2. 设置主题**
    
  修改配置文件 `~/.zshrc` 中的 `ZSH_THEME` 来设置使用的风格，这里默认不修改了
      
  ![zsh](/zsh_09.png)


  ```text
  ZSH_THEME="robbyrussell"
  ```



  ```sh
  # 重新加载和应用当前用户的 Zsh 配置文件（.zshrc 文件
  source ~/.zshrc
  ```

  :loudspeaker: 更新配置也可以选择重启终端

  你可以使用👆🏻设置主题,也可以直接通过iterm设置主题
  Preferences > Profiles > Colors > Color Presets
  
### 4.3 颜色风格

  有时 `zsh-autosuggestions` 插件的提示颜色看不清，可以通过修改颜色处理。打开配置文件 `~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh` 

  ![zsh](/zsh_10.png)

  ```shell
  code .oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
  ```

  修改以下配置项

  ```zsh-autosuggestions.zsh
  typeset -g ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=12'
  
  # 可以支持的颜色有限：
  black , red , green , yellow , blue , magenta , cyan and whit
  ```

### 4.4 插件

  插件需要修改 `~/.zshrc` 配置文件中的 `plugins`配置段如下：

  ```.zshrc
  plugins=(git history history-substring-search node npm wd web-search last-working-dir)
  ```

  **1. 历史记录提示插件**

  ```shell
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions 
  ```

  ![zsh](/zsh_11.png)

  下载后在配置文件的 `plugins` 选项的最后面添加即可

  ```.zshrc
  plugins=((git ... zsh-autosuggestions))
  ```

  让插件生效
  ```sh
  source ~/.zshrc
  ```

  **2. 额外的自动补全**

  > tab键提示

  ```sh
  git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-completions
  ```

  下载后在配置文件的 `plugins` 选项的最后面添加即可

  ```.zshrc
  plugins=(git ... zsh-autosuggestions zsh-completions)
  ```

  让插件生效
  ```sh
  source ~/.zshrc
  ```

  **3. zsh-syntax-highlighting 语法高亮插件**

  ```sh
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
  ```

  下载后在配置文件的 `plugins` 选项的最后面添加即可

  ```.zshrc
  plugins=(git ... zsh-syntax-highlighting)
  ```

  让插件生效
  ```sh
  source ~/.zshrc
  ```

  :loudspeaker: 如果不进入有关git的文件夹，只会显示 ~

  ![zsh](/zsh_12.png)