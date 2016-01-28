#underScore 源码解析（3）

##array
###1 initial（）

```
_.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
 };

```

1. 通过Array.prototype.slice转换为真正的数组的带有length属性的对象。
2. math.max()防止数组越界。

######first(array，n) // 返回前n个数

######rest(array,n) // 返回后n个数
######last(array,n) // 返回最后的数，有n 返回后n个数
```
slice.call(array, n == null || guard ? 1 : n);
// 可以判断n guard， 用了||
```

###2 compact ()

根据过滤函数，返回值为真的数组集合。

`_.filter(array,_.indentity)`


###3 flatten（array,shallow）【平滑】

用了内部函数flatten（）将一个多层的数组从多层中解析出来。
有两个参数，shallow, strict。
// strict: 可以对数进行解析
// shallow: 只解析一层还是全部解析。 false:深层解析， true:浅解析。

```
   if (shallow) {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        } else {
          flatten(value, shallow, strict, output);
          // 迭代循环
          idx = output.length;
    }


```

###4 restArgs（）
```
  var restArgs = function(func, startIndex) {
    // func.length 是函数期望的参数，arguments.length是实际传入的参数
    // 这里对startIndex 参数进行校正，如果是null 则func.length-1 否则的话用+startIndex
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    // 返回；一个函数
    return function() {
      // length 是参数的个数，根据实际参数和startIndex确定
      var length = Math.max(arguments.length - startIndex, 0);
      // 根据length 生成一个数组
      var rest = Array(length);
      // 将对应的参数存在新数组中rest
      for (var index = 0; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      // 根据startIndex返回如何调用函数。
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
        // 生成一个startIndex长度的数组
      var args = Array(startIndex + 1);
      // 存放剩下的参数
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      // 然后将这些参数合并
      args[startIndex] = rest;
      // 一起调用这个函数。
      return func.apply(this, args);
    };
  };
```




###5 uniq 

数组去重。

我的思路：额外添加一个表格，用作标记，用内存换时间了。

本地的思路：遍历，判断数据是否存在结果数组中。如果不是就压入。


###6 union
是先合并，再去重，

###7 intersection 
获取多个数组的重合部分。

```
  _.intersection = function(array) {
    // 存结果的数组
    var result = [];
    // 参数的长度
    var argsLength = arguments.length;
    // 遍历数组
    for (var i = 0, length = getLength(array); i < length; i++) {
      // 获取当前的遍历值
      var item = array[i];
      // 如果当前对象已经在结果中，就跳过这次
      if (_.contains(result, item)) continue;
      var j;
       // 针对其他参数进行判断，j=1,过滤掉已经在遍历的那个数组。
      for (j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      // 如果当前值没有在其他的数组中，则插入到结果中。
      if (j === argsLength) result.push(item);
    }
    return result;
  };
  // [[1,23],[1,3,4],[2,3,4]]? 这种情况不支持。
```


###8 difference
判断第一个元素与后面数组不一样的元素。

```
  _.difference = restArgs(function(array, rest) {
    rest = flatten(rest, true, true);
    // 针对array fileter
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  });

```
###9 unzip
将多个数组重组，采用pluck(array, index)// 将第index元素抽出来，生成一个新的元素。

```
    var length = array && _.max(array, getLength).length || 0;
    //获取对象的最大的长度，还是挺好的。也判断了边际值array。

```

###10 createIndexFinder
内部函数,判断item是否存在。

```
  var createIndexFinder = function(dir, predicateFind, sortedIndex) {
  // 闭包哦
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
        // 从前到后
          i = idx >= 0 ? idx : Math.max(idx + length, i); // 根据idx计算初始值。
        } else {
        // 从后到前
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1; // 
        }
        
      } else if (sortedIndex && idx && length) {
        // 如果可以直接计算 判断sortedIndex
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  };

```
###11 range
值得学习的是，对于变化的参数是如何处理的,所以说传进去的数值都是一个一个从左到右对应的。

```
  _.range = function(start, stop, step) {
  // 如果stop是空的，stop = start || 0 
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }
    ......
}

```





