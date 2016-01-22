##配置react native -androad 环境开发

###1. 安装开发软件
 配置环境。<https://facebook.github.io/react-native/docs/android-setup.html#content>。
 
 其他都还好，就是在`Download and install Genymotion`.资源可以在这里找：<http://wiki.sankuai.com/pages/viewpage.action?pageId=119672282>。
 
###2.native环境配置
  1. ```
      npm install -g react-native-cli //安装前要安装npm 
     ```   
  
  2. ```
      react-native init AwesomeProject 
      //通过react-native 命令 建立一个项目。AwesomeProject为项目名称。
      ```
      
1. 遇到问题
 
    ```
   $ react-native init nativeDemo
    This will walk you through creating a new React Native project in /Users/xuru/
          work/androad-native/nativeDemo
    Installing react-native package from npm...
    
    // 然后就一直这样，不动了。
   ```
   分析可能问题： 1. node, npm ,版本问题，已更新为最高 node>4 npm =2.x. `notdone`
   
   配置： /Users/xuru/.nvm/versions/io.js/v2.5.0/bin/react-native
   
   在run , runVerbose 函数中的`npm` 改为   `npm --registry=http://r.npm.sankuai.com install。`
   然后用，有限网。下载。
   
###3.android环境

如何将native 和安卓环境相配合。

###4. 考虑到所有的设备只适合做ios，还是先做ios入门。
在xcode中打开project文件，在编辑器中打开js文件。运行xcode可以看到native,但是现在还不能修改js改变界面的输出。

1. 学习xcode,
2. 学习reactnative.

直接在ios中打开可以出现hello-reactnative的界面。