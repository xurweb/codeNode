#underscore源码解析（4）-扩展
这一节主要讲的是函数。

##js里的函数function
Function对应的方法，和一些属性的意义
###Function
* length

是函数的期望参数。

* bind

  bind方法会创建一个新的函数。
  当调用这个新函数时，将传入的第一个参数作为新函数的this, 传人的第二个参数，以及调用时的参数变成原函数的实际传入参数。
  
  运用场景：要某个函数在自己想要的环境里执行，就将这个函数绑定到某个对象上。

* apply

  在指定this和参数的情况下调用某个函数。

  apply和call的关系

  apply的参数是一个数组，call()的参数是一组数据列表。

###argument
argument 指的是本次函数调用时传入函数的实参列表. 
argument[0]代码第一个参数。

```
argument.length // 实际的参数个数。

```
argument不是真正的数组，称为伪数组。 没有Array的方法和属性，只有一个length的对象我们称为伪数组。

伪数组可以变为真正的数组

```
var args = Array.prototype.slice.call(arguments);
```
貌似这个用法对v8的性能不好。

###[这里拓展下v8性能相关](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments)。
* v8下很多东西不支持的标识符都不好用。比如try-catch, try-finallly, let const等。

   workarounds: try-catch 要明确的指出具体的发生地方。
* 使用arguments 对函数的效率不太好。
    1. 在函数中即使用了argument 又使用了参数。
    
    	workarounds: （1）要将参数用变量保存下来，提供性能。（2）enable strict mode ('use strict') per-file or per-function.
    	
    2. arguments是不可以外泄的，对于slice(arguments)这样的行为都不好。
       
       workarounds: 用code-inline的方式，将arguments遍历，复制到另一个数组中。
       
