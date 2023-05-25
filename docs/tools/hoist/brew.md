---
layout: doc
---

# Brew

brew 是 MAC 与 LINUX 上的软件包管理器，类似于 Linux 中的 yum 与 apt 软件管理器 。

虽然 brew 可以运行在 Linux 中，但主要还是在 Mac 系统中使用，因为 Linux 有更适合的包管理器。

## 1. [官网](https://brew.sh/index_zh-cn.html)

![brew](/brew_01.png)

## 2. 安装

下面介绍两种方式安装 brew

### 2.1 独立安装【推荐】

> 下面使用 [中国科学技术大学](https://mirrors.ustc.edu.cn/help/brew.git.html) 源安装brew。

- 开始安装

  - 首先在命令行运行如下几条命令设置环境变量：

  ```shell
  export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
  export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
  export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
  export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
  ```

  - 执行以下命令开始安装brew

  ```shell
  /bin/bash -c "$(curl -fsSL https://mirrors.ustc.edu.cn/misc/brew-install.sh)"
  ```

- 安装后的操作

  - 安装后执行以下命令设置镜像，需要先安装zsh
  
  ```shell
  echo 'export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"' >> ~/.zshrc
  echo 'export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"' >> ~/.zshrc
  echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"' >> ~/.zshrc
  echo 'export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"' >> ~/.zshrc
  ```

  - 然后在 ~/.zshrc 文件中定义brew命令路径，否则brew命令无效

  ```shell
  export PATH=$HOME/bin:/usr/local/bin:$PATH:/opt/homebrew/bin
  ```

  - 将 brew 更新到最新版
  
  ```shell
  brew update
  ```

  - 将已安装的仓库远程替换为 USTC 镜像
  
  ```shell
  brew tap --custom-remote --force-auto-update homebrew/cask https://mirrors.ustc.edu.cn/homebrew-cask.git
  ```

### 2.2 自动安装

> 使用自动安装脚本 [HomebrewCN](https://gitee.com/cunkai/HomebrewCN) 安装简单快速，并可以在安装过程中设置镜像源，适合安装经常失败的同学。

- 安装命令

  - 苹果电脑标准安装脚本：（推荐 优点全面 缺点慢一点）

  ```shell
  /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
  ```

  - 苹果电脑极速安装脚本：（优点安装速度快 缺点 update 功能需要命令修复 ）

  ```shell
  /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)" speed
  ```

  - Linux 标准安装脚本：
  ```shell
  rm Homebrew.sh ; wget https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh ; bash Homebrew.sh
  ```

### 2.3 验证是否安装成功

  - 安装脚本执行完成后，重启终端。（重启后才生效）

  - 通过在终端输入"brew -v"，可以查看homebrew版本。

  - 如果正确输出版本信息，表示成功安装。

  - 虽然叫做'Homebrew'，但实际使用时，命令是'brew'。

  ![brew](/brew_03.png)
 
  > 在M1芯片上，homebrew的安装路径为："/opt/Homebrew/"

## 3. 卸载命令

  - 苹果电脑卸载脚本：
  
  ```shell
  /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
  ```

  - Linux 卸载脚本：

  ```shell
  rm HomebrewUninstall.sh ; wget https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh ; bash HomebrewUninstall.sh
  ```

## 4. 恢复镜像

  > 如果对源不满意可以恢复到初始源

  - 首先执行下述命令:  

  ```shell
  # 重置brew.git:
  $ cd "$(brew --repo)"
  $ git remote set-url origin https://github.com/Homebrew/brew.git
  # 重置homebrew-core.git:
  $ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
  $ git remote set-url origin https://github.com/Homebrew/homebrew-core.git
  ```
  
  - 然后删掉 HOMEBREW_BOTTLE_DOMAIN 环境变量,将你终端文件

  ```shell
  ~/.bash_profile

  # 中
  HOMEBREW_BOTTLE_DOMAIN

  # 行删掉, 并执行
  source ~/.bash_profile
  ```

  或者

  ```shell
  ~/.zshrc

  # 中
  HOMEBREW_BOTTLE_DOMAIN

  # 行删掉, 并执行
  source ~/.zshrc
  ```

## 5. 常用命令

> 下面介绍使用 brew 管理软件包的操作。

### 5.1 搜索软件
  
  - 查看 PHP 版本信息

  ```shell
  brew info php
  ```

  - 搜索 php

  ```shell
  brew search php
  ```


### 5.2 更新软件

  ```shell
  # 更新 homebrew
  brew update
  
  # 更新软件
  brew upgrade
  ```

### 5.3 安装软件
  
  ```shell
  # 安装 xxx 软件
  brew install xxx

  # 重新安装 xxx 软件
  brew reinstall xxx
  ```

### 5.4 删除软件

  ```shell
  #删除 xxx 软件
  brew uninstall xxx
  ```

## 6. 常见问题

  ![brew](/brew_04.png)

  - 运行如下命令添加 Git 信任目录`homebrew-core`、`homebrew-cask`、`homebrew-services`

  ```shell
  git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-core
  git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-cask
  git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-services
  ```

  - 同样如果要取消之前添加的 Git 信任目录运行如下命令即可
  
  ```shell
  git config --global --unset safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-core
  git config --global --unset safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-cask
  git config --global --unset safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-services
  ```

  - 查看 Git 全局配置

  ```shell
  git config --global --list
  ```