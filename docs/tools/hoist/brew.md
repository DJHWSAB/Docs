---
layout: doc
---

# Brew

> **如果未安装 `xcode` ,请建议安装后再来!!!**

brew 是 MAC 与 LINUX 上的软件包管理器，类似于 Linux 中的 yum 与 apt 软件管理器 。

虽然 brew 可以运行在 Linux 中，但主要还是在 Mac 系统中使用，因为 Linux 有更适合的包管理器。

## 1. [官网](https://brew.sh/zh-cn/)

![brew](/brew_01.png)

## 2. 安装

下面介绍两种方式安装 brew

### 2.1 独立安装

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

### 2.2 自动安装【推荐】

> 使用自动安装脚本 [HomebrewCN](https://gitee.com/cunkai/HomebrewCN) 安装简单快速，并可以在安装过程中设置镜像源，适合安装经常失败的同学。

- 安装命令

  - 苹果电脑标准安装脚本：（推荐 优点全面 缺点慢一点）✅

  ```shell
  /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
  ```


  ![brew](/brew_07.png)

  ![brew](/brew_08.png)

  ![brew](/brew_09.png)

  > 暂时不管👇🏻 问题,后面再解决

  ![brew](/brew_10.png)

  ![brew](/brew_11.png)

  > 暂时不管👇🏻 问题,后面再解决

  ![brew](/brew_12.png)

  ![brew](/brew_13.png)
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

  ```shell
	brew install appName  // 安装任意包，例如 brew install node

	brew uninstall appName // 卸载任意包，例如 brew uninstall git

  brew search appName[当不知道具体名字时-这里可直接用关键字搜索]  // 查询可用包

  brew info appName // 查看任意包信息

  brew update // 更新Homebrew

  brew upgrade  // 升级已安装的软件到最新版本

  brew -v // 查看Homebrew版本

  brew -h // Homebrew帮助信息

  brew list  或者  brew ls  // 列出已安装的软件

  brew home // 用浏览器打开brew的官方网站

  brew deps // 显示包依赖
  ```

## 6. 常见问题

  > 安装brew时出现的问题

  ![brew](/brew_10.png)

  这条信息表明 Xcode 的命令行工具已经安装在你的电脑上，但是你想要更新它们。Xcode 的命令行工具包含了许多有用的开发工具，如 `git`、`clang`、`make` 等。如果你需要更新这些工具，可以按照以下步骤操作：

  1. **更新 Xcode 命令行工具**： 在终端中，你可以使用 `softwareupdate` 命令来检查和安装更新。输入以下命令：

  ```shell
   softwareupdate --list
  ```
  这将列出所有可用的更新。如果 Xcode 命令行工具有更新，你将看到它们在列表中。

  2. **安装更新**： 如果你看到 Xcode 命令行工具的更新，你可以使用以下命令来安装：

  ```shell
   softwareupdate --install NAME_OF_UPDATE
  ```
​	 将 `NAME_OF_UPDATE` 替换为你在上一步中看到的 Xcode 命令行工具更新的名称。

  3. **验证更新**： 更新完成后，你可以再次运行 `xcode-select` 命令来确认命令行工具是否已经更新：

  ```shell
   xcode-select --version
  ```
  这将显示当前安装的 Xcode 命令行工具的版本。

  ![brew](/brew_12.png)

  这些警告信息表明 Git 在尝试更新 Homebrew 的 tap 时，没有找到名为 `origin` 的远程仓库。Homebrew 的 tap 是一个包含特定软件包的 Git 仓库，它们通常用于扩展 Homebrew 的软件包列表。如果你想要更新这些 tap，你需要确保它们有正确的远程仓库设置。

  以下是解决这个问题的步骤：

  1. **添加远程仓库**： 打开终端，导航到你想要更新的 tap 的目录。例如，对于 `homebrew-cask`，你可以使用以下命令：

  ```shell
   cd /opt/homebrew/Library/Taps/homebrew/homebrew-cask
  ```

  然后，添加远程仓库 `origin`：

  ```shell
   git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-cask
  ```

  2. **更新 tap**： 添加远程仓库后，你可以使用以下命令来更新 tap：

  ```shell
   git fetch origin
   git reset --hard origin/master
  ```
  这将从远程仓库获取最新的更改并重置你的本地分支。

  3. **检查其他 tap**： 对于 `homebrew-core` 和 `homebrew-services`，`重复👆🏻步骤`，确保你添加了正确的远程仓库 URL。✅

  4. **验证更新**： 更新完成后，你可以使用 `git status` 命令来检查本地仓库的状态，确保没有未跟踪的更改。

​  请注意，如果你不熟悉 Git 或 Homebrew 的操作，建议在执行这些命令之前备份你的数据。如果你不确定如何操作，可以查阅 Homebrew 的官方文档或寻求社区的帮助。此外，如果你只是想更新 Homebrew 的软件包，通常你只需要运行 `brew update` 和 `brew upgrade` 命令，而不需要手动更新每个 tap。

  ![brew](/brew_14.png)

  ```shell
  # 查看 Git 全局配置(按q退出)
  git config --global --list
  ```

  ![brew](/brew_02.png)