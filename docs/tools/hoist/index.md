---
layout: doc
---

# Github

## 1. 如何解决Github的访问速度

  > **最直接的效果是GitHub图片可以正常加载，网页也稳定了。GitHub Hosts主要是通过修改host的方式加速GitHub访问，解决图片无法加载以及访问速度慢的问题。**

  [Github hosts](https://github.com/ineo6/hosts#windows)

## 2. 使用方式

### 2.1 远程主机 

  ![github](/github_01.png)

  https://gitlab.com/ineo6/hosts/-/raw/master/next-hosts

  ![github](/github_02.png)

### 2.2 本地主持服务

  **本地区hosts服务获得的ip是经过本地区测试，所以成功率比较高。而与会时取得最新的ip，尽管可能保证访问。注意，该方案需要结合SwitchHosts起来使用，或者你也可以直接访问地址，手动复制。**

  1. macOS(Intel)

  执行下面命令, 服务会运行在： http://localhost:8888

  ```shell
  # 下载Hosts 服务器的安装包，并将其解压缩到当前目录中
  curl -L https://github.com/ineo6/hosts/releases/download/v1.0.1/hosts-server-pkg-mac-x64.tar.gz | tar xzvf -

  # 删除属性列表，这不是必须的，但是可以确保您的服务器不会受到阻止
  xattr -d com.apple.quarantine ./hosts-server-pkg-mac-x64/hosts-server

  # 启动 Hosts 服务器，并将其监听在传递给 --port 选项的端口
  ./hosts-server-pkg-mac-x64/hosts-server --port=8888
  ```

  2. macOS(Apple Silicon)

  执行下面命令, 服务会运行在： http://localhost:8888

  ```shell
  # 下载Hosts 服务器的安装包，并将其解压缩到当前目录中
  curl -L https://github.com/ineo6/hosts/releases/download/v1.0.1/hosts-server-pkg-mac-arm64.tar.gz | tar xzvf -

  # 启动 Hosts 服务器，并将其监听在传递给 --port 选项的端口
  ./hosts-server-pkg-mac-arm64/hosts-server --port=8888
  ```

  ![github](/github_03.png)
  
  ![github](/github_04.png)

  下一次我们可以通过以下方式启动软件:

  ![github](/github_05.png)

  ![github](/github_04.png)

  也可以直接修改端口号
  
  ```shell
  # 指定端口号
  ./hosts-server --port=9999

  # 👇🏻 拓展
  # 查看8080端口是否被占用
  sudo lsof -i tcp:8080

  # 删除进程的PID
  sudo kill -9 PID
  ```

  3. Windows
  
  下载 https://github.com/ineo6/hosts/releases/download/v1.0.1/hosts-server-pkg-win-x64.zip ，解压后执行下面命令，服务会运行在： http://localhost:8888

  ```shell
  .\hosts-server.exe --port=8888
  ```



## 3. 配置hosts教程

### 3.1 SwitchHosts 自动更新

  **这里推荐使用 SwitchHosts 配置hosts，操作很简单，支持跨平台。**

  > 注意：首次使用先备份下本地hosts。

  1. 下载地址: [https://github.com/oldj/SwitchHosts/releases](https://github.com/oldj/SwitchHosts/releases)

  ![github](/github_06.png)

  2. 操作作步骤

  ![github](/github_07.png)

### 3.2 手动配置

  1. macOS

  hosts文件位置：`/etc/hosts`

  ![github](/github_08.png)
  
  ![github](/github_09.png)

  复制hosts文件到桌面上，鼠标右键右击它，选择「打开方式」—「文本编辑」，打开这个hosts文件，把前面的hosts内容复制进来。

  然后把你修改好的hosts文件替换掉：/etc/hosts 文件。

  注意：如果弹出密码输入框，你需要输入你当前登录账号对应的密码。

  最后刷新缓存：

  ```shell
  sudo killall -HUP mDNSResponder
  ```

  2. Windows

  hosts文件位置：`C:/windows/system32/drivers/etc/hosts`

  将前文hosts内容追加到hosts文件，然后刷新DNS缓存：

  ```shell
  ipconfig /flushdns
  ```

## 4. github镜像网站 和 github文件加速下载

  github镜像网站：https://githubfast.com/

  github文件加速下载：https://ghproxy.com/
