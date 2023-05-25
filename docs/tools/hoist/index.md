---
layout: doc
---

# Github

## 如何解决Github的访问速度

> **如果你的Github是无法打开，那么这篇文章可能对你没有用，需要你在打开Github情况下使用才行，你可以先考虑更换hosts，再来使用哈！！！💪🏻**

1. 下载 [fastgithub](https://github.com/dotnetcore/FastGithub/releases)

![image-20230525150935164](/github_01.png)

📢：如果你的mac是M1，安装 `fastgithub_osx-arm64.zip` 可能会出现闪退，请安装 `fastgithub_osx-x64` ;如果是win，安装 `fastgithub_win-x64`

2. 使用 fastgithub
   - win下使用
     - 双击运行FastGithub.UI.exe
     
     ![github](/github_02.png)
     
     - # D:\software\fastgithub_win-x64是你将fast GitHub下载存放的位置

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



