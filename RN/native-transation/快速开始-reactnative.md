#快速开始

###准备
1. osx -ios开发工具
2. homebrew - 为安装Watchman 和Flow 推荐工具。
3. Node.js 4.0 或者更新。


   +  安装nvm ,运行 `nvm install node && nvm alias default node`。 这样保证你安装的nodejs为最新版本，可以直接运行`node`。nvm是nodejs版本控制工具，可以安装不同的版本和切换版本。
   +   如果你用的是node 5.0 或者更新的版本， 最好安装npm2,这个版本比npm3更快。 安装完node之后，执行`npm install -g npm@2`。
   +   `brew install watchman`, 推荐使用[watchman](https://facebook.github.io/watchman/docs/install.html) , 可以实时监控文件bug。
   +  `brew install flow` , 如果你想要[flow](http://www.flowtype.org/)。
   
   建议先更新brew `brew update && brew upgrade`, 保证所有代码都是最新版。
   
   
   
###android 安装
在用reactnative之前，你需要先安装android SDK（还需要一个android模拟器，如果你的测试不是在真机的情况下能使用到）。具体的安装步骤看：[android 安装指南](http://facebook.github.io/react-native/docs/android-setup.html)。
注意： windows 和 Linux 平台下的android开发还处于试验阶段。

###快速开始

```
$ npm install -g react-native-cli
$ react-native init AwesomeProject // 这里初始化一个project 名称为AwesomeProject
```
####run Android app
 * `cd AwesomeProject // 进入到这个工程下面`
 * `$ react-native run-android // 这里可能会出现安装不成功的案例，见出现bug`
 * 打开index.android.js。用你喜欢的编辑器，推荐sublime,修改你需要修改的地方。
 * 按菜单键，（默认是F2， 或者command+M by Genymotion）,选中reload js.就可以看到变化。
 
 提示：
 
 *  如果你用的是真设备 ，[请移步这里](http://facebook.github.io/react-native/docs/running-on-device-android.html#content)。
 *  如果其中，出现一些bug,[请看这里](http://facebook.github.io/react-native/docs/troubleshooting.html#content)
 
   
