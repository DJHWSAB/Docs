---
layout: doc
---

# Github

## 如何解决Github的访问速度

> **如果你的Github是无法打开，那么这篇文章可能对你没有用，需要你在打开Github情况下使用才行，你可以先考虑更换hosts，再来使用哈！！！💪🏻**

1. 下载 [fastgithub](https://github.com/dotnetcore/FastGithub/releases)

![image-20230525150935164](/github_01.png)

:loudspeaker: 如果你的mac是M1，安装 `fastgithub_osx-arm64.zip` 可能会出现闪退，请安装 `fastgithub_osx-x64` ;如果是win，安装 `fastgithub_win-x64`

2. 使用 fastgithub
   - win下使用
     - 双击运行FastGithub.UI.exe
     
     ![github](/github_02.png)


    :loudspeaker: D:\software\fastgithub_win-x64是你将fast GitHub下载存放的位置
     ```shell
     # 以windows服务安装并启动
      fastgithub.exe start

      # 以windows服务加载并删除
      fastgithub.exe stop

     ```

     启动之后fast GitHub会自动更改你的dns
     
     ![github](/github_03.png)

     然后就可以顺畅无阻的访问GitHub啦！

     ![github](/github_04.png)

   - Mac下使用

     - 双击运行fastgithub

     - 安装cacert/fastgithub.cer并设置信息
     
     - 设置系统自动代理为`http://127.0.0.1:38457`，或手动代理http/https为`127.0.0.1:38457`
     
     - 配套配置详情
     
       - 打开`FastGithub`后，目录会生成`cacert`目录，双点击打开`fastgithub.cer`，系统弹出`Keychain Access`窗口，列表中双点击`FastGitHub`，弹出证明书详细信息窗口，展开打开信任并选择始终信任。
     
       ![github](/github_05.png)

       ![github](/github_06.png)

       - 配置代理
          - 自动代理
            - 打开mac设置，网络，点击高级，选择代理，勾选网自动代理配置，填写FastGithub窗口提示的地址
            
            ![github](/github_07.png)
            
          - 手动代理
            - 打开mac设置，网络，点击高级，选择代理，勾选网页代理(HTTP)及安全网页代理(HTTPS),填写FastGithub窗口提示的地址
            
            ![github](/github_08.png)


