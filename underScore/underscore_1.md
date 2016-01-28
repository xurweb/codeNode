#underScore 源码解析（1）

##框架

1. 整个代码放在一个闭包中，为了了防止污染环境。

 ```
 (fucntion(){
   // 定义相关的代码
  }());
    
  
 ```
   
2. 框架相关代码

```
// 对于浏览器放在self中，nodejs放在global对象中，最后都赋值给root
var root = this;

// 这个将内置的原型链赋值给变量，减少代码，便于压缩。
var ArrayProto = Array.prototype, ObjProto = Object.prototype;

// 将原型链中的方法赋值给变量，便于快速查找。用一个var也是减少代码、
var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;
      
// 将es5中已经定义的原生方法提出来，如果浏览器支持es5则用es5中的原生方法。
 var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;
      
// 所有的方法都放在"_"这个对象上。创建对象的形式调用，返回的是“_”对应的对象，并且将其赋值给了_wrapped。类似jq中的$.
 var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

// 该库，既可以在浏览器端使用，也可以在nodejs中使用。通过exports.nodeType判断。如果是浏览器就放在全局变量上，如果是nodejs就放在exports对象上。
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    // root
    root._ = _;
  }
  
 //....定义了具体的函数。在（2，3，4）中详细讲述
 
 //...对库的调用以及链式还有minx等进行设置
  
   
```
