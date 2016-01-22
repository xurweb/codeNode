#underScore源码解析（2）

###collections相关

####1. 核心内部函数介

```
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-parameter case has been omitted only because no current consumers
      // made use of it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

// 函数作用：根据变量个数， 将函数变成相应的可执行函数。
// 如果context为空，返回函数 。。。，就是返回原值。

```
 值得借鉴的地方： context === void 0 判断是否为空
 
解析：

 *  argCount == 1的情况，执行单值的
 *  argCount == 2的情况，现在还没有用到。
 *  argCount == 3的情况， 主要处理迭代器的相关处理函数。
 *  grgCount == 4的情况， 处理reduce的相关函数。


###2. 判断是否是数组的思路

 1  通过获取length属性，
   
   ```
   var property = function(key) {
      return function(obj) {
         return obj == null ? void 0 : obj[key];
      };
    };

   ```
   
2  并且判断length属性是否为数值，length》=0，length<值，
   
   ```
      typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
   
   ```
   
###3.  each() ,map()
 
有几个地方值得借鉴的地方：
   
  
1  array 和obj 在遍历的时候，可以一起处理，通过 length = (obj || keys).length; 一起遍历，index = i || keys[i]; 然后获取值。

2  each 和map 的区别。each 只是遍历值，不改变值，map遍历值，并且改变相应的值。

 ```
     var keys = !isArrayLike(obj) && _.keys(obj),
         length = (keys || obj).length;
      // array 和obj的综合
      for (var index = 0; index < length; index++) {
      	var currentKey = keys ? keys[index] : index;
      	results[index] = iteratee(obj[currentKey], currentKey, obj);
      } 
      // 遍历时，两者综合
 ```   
    
###4. reduce()

reduce有从left, 和right两种形式，如果将他们合并处理呢，用了一个参数dir，left : dir = 1 , right: dir =-1;
好处: 这样可以对遍历时的步伐根据dir进行控制。
=》 抽象出了createReduce函数

```
	var createReduce = function(dir){
	   //  obj要处理的数据，iteratte是要执行的函数，memo,是初始值，initial和memo是对应的，初始的true or false。
	   var reduce = function(obj, iteratte, memo, initial) {
	   	   var keys = !isArrayLike(obj) && _.keys(obj),
               length = (keys || obj).length, // 这两个都是对array 和obj一起处理。
               index = dir > 0 ? 0 : length - 1; // 这个是处理向左还是向右，遍历的初始值。
           // 如果初始值为空，memo要进行赋值，赋值遍历的第一个值。obj[keys?key[index]: index],赞  
           if (!initial) {
       		    memo = obj[keys ? keys[index] : index]; 
       		    index += dir; // 初始值，
           }
          for (; index >= 0 && index < length; index += dir) {
              var currentKey = keys ? keys[index] : index;
              memo = iteratee(memo, obj[currentKey], currentKey, obj);
              // memo作为迭代的中间值，有点像斐波那契数列，并成为最后的结果
           }
            return memo；	   
	   }
	 //  一层闭包 ,
	 return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      // 二层闭包
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
	
	}


```
闭包的好处：
1、避免污染变量环境。
2、保持变量持久化
3、变量私有化
    
    
###5. every, some()
这两个函数，every:一个是如果有一个错误，就返回错误否则返回正确。some:如果有一个正确就返回正确，否则返回错误。类似 && ||的关系。

```
every:

    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
    
    // for 循环里面返回true, 外层返回false。
```
    
 
### 6. pluck()

```
 _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };
 
 // property函数，到处都是闭包呀~ 只透露了一个参数，简化参数，更形象。返回一个函数。
 var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };
```
变量每个元素，返回元素的值。

eg: _.pluck([{name:'xuru'},{name:'zhangsan'},{name:'lisi'}],'name'); = > [xuru,zhangsan,lisi];
 
 
###7 max()
获取最大值最小值，针对{} [],[{}]复杂的情况下，需要提供函数计算的依据。
对于简单情况的处理，对于复杂情况的处理

```
    if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null){
    //判断是简单数值还是复杂数值。
    // 处理下[] {} 合并处理下，变量求最大值
    
    }else {
     //对有函数的情况，要计算值，通过计算值求最大值，同时还要保留原始值，用于返回。用each遍历。
    
    }
```
 
###8 sample(obj,n,guard)
获取随机的n个样本值，
如何保证随机，并且是obj中的n个元素。

```
sampel = isArrayLike(obj)? clone(obj): _.values(obj); // 处理array 和obj兼容的问题,重新克隆一个进行处理。
for(var i =0; i< last; i++) {
 var temp = Math.randan(i,last);
 
 // obj[i] <-> obj[sample]互换
 
 }

```
### 9 sortBy(obj,iteratee,context)
思路： 先在obj新增一个字段中插入计算后的值，通过计算后的值进行排序，排序完之后用pluck进行筛出一个值。
 
 ```
 //_.map(obj,function(value),key,list){
 		return {value: ..,
 		   // 新增一个字段
 		   criteria: func(value,key,list)
 		}
 	}
// obj.sort(function(left,right){
     比较left,right的criteria字段进行排序
   })
// _.pluck(obj, 'value'); 筛出obj的value字段对应的值。
     return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
 
 ```
 
 
 
 
 
 
 
 
 
 
 
 
 