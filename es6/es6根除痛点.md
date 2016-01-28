#es6, es7 痛点根除


###函数
####箭头函数

1  基本用法

```
// es5
var t = function myFun(a){ return a + a}

// es6

var t = a => a+a

function myFun (a) {
...
}

// se6

let myFun = (a) => {
	...
}

```

2 对于参数个数，没有，或者有多个的时候一定要（）

```
// es5

var t = function (a,b) {return a+b;}

// es6

var t = ()=>{var a = 5; return a;}
var t = (a,b)=> a+b;

```
3 对于函数体有多条语句的时候，{}， 并且要有return 

```
var t = ()=>{var a = 5; return a;}
```
4 箭头函数要返回一个对象，函数体{} 外面要加对（）

```
var t = () => ({name: 'xuru', age: 25})
```
5 参数是一对参数。

```
// es6
var t = ({name, age}) => { return name + '' + age}

// es5
var t = function(person) {
	return person.name + '' + person.age;
}

```

`注意点`

1. 函数体内的this， 指向的不在是函数运行时的对象，而是定义时的对象。
原因在于，箭头函数内部本身没有this, 用的就是外层代码块的this.
2. 由于箭头函数没有this. 因此不能用call, apply, bind()去改变箭头函数的this. 但是不是箭头函数的外部函数还是可以改变的。
3. 除了this, argument, super等，这些也没有了，如果在箭头函数里面调用了，也是通过函数链找到的外层对应属性。


6 嵌套箭头函数

```
//es5
function insert(a) {
	return {
		into: function (array) {
			return {after: function (value) {
				//叭叭叭array.....
				return array
			}}
		
		}
	
	}
}

// es6

let insert = (a) => ({into: (array) => (after: (value)=> {...}})

````

pipeline， 前面一个函数的输出是后面一个函数的输入。

可以嵌套 demo

```
// es6
function applyMiddleware(...middlewares){
	return (next) => (reducer, initialState) => {
		store, dispatch deal with;
		return {
			... store,
			dispatch
		}
	}
}

// es5
function applyMiddleware(...middlewares) {
	return funtion (next) {
		return function (reducer, initalState) {
			deal with: store, dispatch;
			return {
				store: ...store,
				dispatch: dispatch
			}
		}
	}
}

```


###数组

###对象

1 es6允许直接写入变量和函数。

```
var foo = 'bar'
var baz = {foo}

// 类似
var baz = {foo: foo}

// baz = {foo: 'bar'}

```
demo 

```
const Add_ITEM = 'Add_ITEM';
function AddItem (item) {
// item 就是用的直接对象写入
	return {
		type: ADD_ITEM,
		item
	}
}

```
2 es6允许在对象之中，只写属性名，不写属性值。

```
function (x,y) {
	return {x,y}
}
// return {x:x, y:y}

```



3 在对象中定义属性和方法可以写成这样

```
const color = 'blue';
var cart = {
// 定义属性
_wheels: 4,
color,

// 定义方法
drive (a,b) {
...
}

// 定义set, get方法
set _wheels (value) {

}
get _wheels (value) {
	return this._wheels;
}

}
```
4. object.assign()

是将源对象中的所有可枚举属性复制到目标对象中（target）

```
Object.assign(targe, source1, source2);

```
demo

```
// reducer.js中的一个片段
    case INVALIDATE_REDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })

```
`注意`
  assign函数，必须包含至少两个参数
  只能复制可枚举的对象（也能处理数组，把其当成对象处理）。


5 可枚举
对象中 enumerable属性为false的时候，为不可枚举。
对于obj的相关操作，下列情况下，只能是可枚举的obj可用。

es5:

for..in, 遍历对象自身和继承来的可枚举属性。
object.keys: 返回对象的所有可枚举的属性的键名。
JSON.stringify: 只串行对象可枚举的属性。

es6 
Object.assign(), 拷贝对象自身的可枚举的属性。

6 对象的扩展运算符（...）

`Rest参数`

```
let {x,y, ...z} = {x:1, y:2, z:3, a:4, b:5}

// x = 1, y =2, z ={ z:3,a:4, b:5}

```
如果一个键的值是复合类型的值，拷贝的是引用，就是一个改了会影响其他的。

`扩展运算符（。。。）`

扩展运算符用于取出参数对象中所有可遍历的属性，拷贝到当前对象中

let z = {a:3, b:4};
let n = {...z}

将参数z中所有可以遍历的属性，a,b 都拷贝到对象中。


demo

```
export default function applyMiddleware(...middlewares) {
// ...middlewares 是一个对象，对象中包含了key:middelware的对。
//{logg: loggMiddleware, error: errorMiddleware}

}

```

###class

1 定义类

```
class point {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	toString() {
		return '( '+this.x+')';
	}

}

// 方法：用名称（）的形式，方法直接不用,
```

2 类的继承

如果继承父类就必须要在constructor中调用super方法。 子类中没有this属性。


3 Class的静态方法

有静态方法

```
class point {
	static aa () {
	
	}
}
```
调用 point.aa()

静态属性
是在类上定义的

```
class point {
	constructor(){
	
	}
}
point.count = 1 ;

```




