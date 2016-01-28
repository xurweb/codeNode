#underScore 源码解析（4）


###memoize

```
   // hasher: func类型，计算存储的值在cache对应的key。
  // 主要是针对递归迭代的情况吧
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      // memoize是外部函数定义的变量，在闭包函数内也是可以用的。
      var cache = memoize.cache;
      // 计算在cache中的key值
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      // 如果有cache值就直接拿值，否则计算
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };
```

###throttle（func,wait,options）
* 控制频率执行函数，就是每wait时间内执行一次，
* options中，可能存在的值。

   options.leading, 如果忽略开始边界的调用就 false.

   options.trailing , 如果忽略结束边界的调用就false。
   
 ``` 
   _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    // 上次执行的时间点
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      // 如果忽略开始边界，previous = 0
      previous = options.leading === false ? 0 : _.now();
      // 将定时置空
      timeout = null;
      // 执行函数
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
     // 延迟执行函数
    var throttled = function() {
      // 记录当前时间
      var now = _.now();
      //没人在前面，前一个人设为当前时间
      if (!previous && options.leading === false) previous = now;

      // 两次执行时间间隔 remaining。
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // remaining < 0 表示两次执行时间大于一个时间窗口了,就执行啦
      if (remaining <= 0 || remaining > wait) {
        // 清除timeout
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        // 计算函数结果
        result = func.apply(context, args);
        // 清除上下文，args
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // 一个时间窗口还没到，还有剩余时间，继续等待remaining时间执行。
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };
 ```

###debounce
空闲时间控制函数，根据两次动作之间的空闲时间判断是否执行函数。 如果空闲时间小于wait继续等待，如果大于就执行。

  /**空闲控制调用函数，两次调用的空闲时间必须大于wait才能调用。
   * func 传入的函数
   *  wait 空闲时间窗口大小
   * immediate = true 调用触发在开始边界。

  */
  
  ```
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    // 如果没到，等待后执行该函数

    // 用了闭包是 公用了一个变量timeout
    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArgs(function(args) {
      var callNow = immediate && !timeout;
      if (timeout) clearTimeout(timeout);
      // 开启一个延时设定
      if (callNow) {
        timeout = setTimeout(later, wait);
        result = func.apply(this, args);
      } else if (!immediate) {
        // 如果没有开始执行，延迟wait时间然后执行。
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };

```
















       
       
       