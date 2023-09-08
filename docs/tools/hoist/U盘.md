# U盘如何在 Mac 和 Win 自由切换

> 📢：**文件记得备份，再执行操作！！！**

  ![U盘](/U盘_01.png)

  ![U盘](/U盘_02.png)

  ![U盘](/U盘_03.png)

报错: 使用磁盘工具格式化硬盘时 会提示 未能卸载硬盘 （-69888）或类似报错

```shell
diskutil list
```

```sh
diskutil unmountDisk force disk4
此处disk0可替换为上面提到的要卸载的磁盘
```

![U盘](/U盘_01.png)
