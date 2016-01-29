#redux vs flux vs @mtfe/noflux

###1 turbo/noflux

就是简单的设计了一个存储state的数据中心。

####dataton 
dataton 实现了一个State对象。在这个对象上定义了很多方法get,set,updata,cursor。
set updata,都是对curosr的操作。

cursor是什么呢？就是用来引用state中某个路径上的值。通过对他进行操作，可以改变state上的值。

####noflux

`state.js`

noflux中的state就是一个dataton的实例。

`connect.js`

就是用来连接实例后的state数据中心，和组件。

如何连接的呢？通过相应change事件。对传入的组件的componentDidMount函数进行扩展，在其中执行change事件和message事件，

```
datasource.on('change', function(){,,,});


```

这个对应dataton中的哪个事件？

turbo做的事情：

维护一个公共的state。
直接通过connect, 所有的change事件都会响应变化到维护的整个数据中心。


###flux
flux是一个架构，具体的处理是有你自己来写的。


`Dispatcher`

实现了一个Dispatcher的类。
这个类主要是实现对回调函数的注册和解注，以及执行的顺序等。通过this._callback[..]这个数组完成的。没注册一个函数返回一个id,就存在这个callback中，接下来，都是最这些id进行操作。控制callback的执行，调用，停止。

id:
每个id都有唯一性。

`store`

实现了一个FluxStore的类，

通过EventEmitter模块，真正的为事件添加监听函数。并且可以执行监听的事件回调。

###redux
应该是flux 的一种实现和改进

通过定义store, redux, action 完全解耦了dispatch和action, 和store的联系。
这种更容易扩展，比如添加中间件等，redux的combine, 添加action， 添加state都是非常方便的。



