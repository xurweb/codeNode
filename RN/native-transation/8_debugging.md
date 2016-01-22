#8 Debugging && testing

###Debugging React Native Apps

通过app内部开发按钮
1. 在ios上面，晃动手机，或者在模拟机上按control + cmomand + z;
2. 在安卓上，晃动手机，或者按手机的菜单键（这个在很多老手机或者大部分的模拟机上，在genymotion你可以按command+m 可以模拟菜单键）。

hint:
对于在功能机上不可以用的情况：
1. 对于在xcode上开发的ios工程, 选择 product->scheme->editScheme .. (或者按 command +<)。然后 在左侧的面版中选择run, 并 设置Build configuration 为release。
2. For Android, by default, developer menu will be disabled in release builds done by gradle (e.g with gradle assembleRelease task). Although this behavior can be customized by passing proper value to ReactInstanceManager#setUseDeveloperSupport.

###加载
选择reload 或者按command + r 在ios模拟器上，将会加载js. 如果你新添加了资源（比如通过Image.xcassets 添加图片在ios系统上，或者在安卓系统上用res/drawable），以及修改了native的代码（oc, swift, c++,java）。你就需要重新构建你的app了。

###chrome 开发者工具
为了在chrome 中debug js, 在开发面板中选择debug in chrome, 这个将打开一个新的tab,http://localhost:8081/debugger-ui.

在chrome中，按 command + option + i 打开开发中工具的面板。 Enable Pause On Caught Exceptions 效果更好。

在真的机器上debug:
1. 在ios上，打开RCTWebSocketExecutor.m 文件，并把网络换成电脑统一ip,晃动手机，打开开发面板，开始调试。
2. 在安卓上，如果你用的是5.0+的机器，用usb链接，你能用adb命令链接工具，对你的电脑开启端口，run : adb reverse tcp: 8081 tcp 8081

####React Developer Tools
安装 [React Developer Tools ](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

###热加载
当你的js改变了，你的模拟器或者手机会实时的重新加载。
1. 在ios上，选择 Enable live Reload, 通过开发着面版设置。
2. 在安卓上，去 Dev Settings and 选折 Auto reload on JS change option

###FPS
这个要在。5-rc或者更高的版本上的，可以提欧诺个过开发者面板中设置，可以debug 性能问题。