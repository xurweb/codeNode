#3.android安装指南

这里主要描述支持react native 开发的安装开发环境的布置。 这里不讨论开发工具的设置如IDE等。

###安装git
* 在mac上， 如果你已经安装Xcode, git 也已经安装上了。 如果没有，可以通过如下命令安装：`brew install git`。
* 在Linux, [通过包管理安装](https://git-scm.com/download/linux)
* 在windows, 下载安装 [git for windows](https://git-for-windows.github.io/)。在安装时期，选择run git from windows command prompt, 这要添加环境变量。

###安装android SDK 
1. [安装最新的JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)。
2. 安装android SDK.
   + on mac `brew install android-sdk`.
   + on linux and windows: [download from the android website](https://developer.android.com/intl/zh-cn/sdk/installing/index.html)。
   
 
### 定义 ANDROID_HOME 环境变量
* on Mac, 添加以下代码到，~/.bashrc, ~/.bash_profile,以及其他你需要用到shell的地方
 


