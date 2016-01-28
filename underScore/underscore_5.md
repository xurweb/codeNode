#underScore 源码解析（5）
主要是obj相关的函数


###keys
检查参数，

```
if(!_.isObject(obj) return [] ;
// 如果不是obj,包含了undefine,null isObject()已经过滤了这些
// 对于不符合参数要求的值，也需要处理返回相关的值。比如[],{},0,等，或者提示

for (var key in obj) if (_.has(obj, key)) keys.push(key);
// 这里用到了_.has(obj,key) 检测key是否是obj中自己的属性，过滤掉继承来的属性。
// 对于用 key in obj的形式，对于不需要继承来的属性操作时需要判断hasOwnProperty()

```

allKey, value 等都是通过key类似的方式实现的。

###mapObject
类似于map方式，map通过 function 返回的是一个array.
mapObject 返回的是 obj的形式。


###invert
返回一个新的obj, 这个obj和原来的obj的键值和键对调。

### pick, omit 白名单 黑名单
pick(obj,keys)// 返回的是keys对应的键值对集合。
omit(obj, keys)// 返回的是keys对应的黑名单的过滤值。

```
// 对于不符合要求的argument, 返回的是空对象{}, 先设置对象，不仅可以对
var relult = {}

if(obj == null) return reslut
```

omit 

```
// 过滤keys,符合string
 keys = _.map(flatten(keys, false, false), String);
 
 if(function)
 iteratee = nege
 else
 iteratee = function(){
 	return !_.contains(keys, key)
 }
 
 return _.pick(obj, iteratee, context);

```

###isEmpty
如果是null => true
如果是为array,并且是obj, array, string的一种，直接返回obj.length === 0 , 表示是空的
直接返回 keys的长度。


###isObject, isArray
array

```
  // ES5 有isArray了，常见判断是toString.call(obj), toString 是obj的方法，为了每个对象都能被检查，要使用call（），apply()的形式被检查的对象作为第一个参数。 typeof a = obj, 为了区分array 和obj => toSting方法
return toString.call(obj) == '[object Array]'

```
object

```
// obj function都是obj, 并且排除了null的形式。通过！！obj
 var type = typeof obj
 return type === 'function' || type === 'object' && !!obj;
```

###othes 

```
  // 多个类型，用each遍历，定义多个函数，each([a,b,c],function(item){      return 'is'+ name = function(obj){return toString.call(obj) === '[object]' + name + ']'}});
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });


```
###has

  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

###random

function(min,max){
  if(max == null) {
  	max = min;
  	min = 0;
  }
   return min + Math.floor(Math.random() * (max-min +1));
}









