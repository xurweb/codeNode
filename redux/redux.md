#redux

###1 什么是redux？出现的需求背景是什么？可以做什么用。
类比：redux类似 Array.propoty.reduce()// 数据状态迭代。

1. 在reudx中，state只能通过action来改变，redux是根据action的语义来形成一个新的state。
2. redux是同步的，一定的state和一定的action得到的结果是一样的。
3. 存储的数据stroe, 需要存储范式的形式，什么事范式呢？就是减少沉余。

现在浅显的理解：用单向数据流的形式管理了一堆有交互组件的数据。让组件直接的数据交互更少。维护了一个store存储数据。这里的数据只能通过action才可以改变。dispatch是什么呢？是store和action之间的交互，可以生成新的state。渲染页面。那这个dipatch是如何做的呢？
用法是通过 store.dispatch() 把 action 传到 store。 那dispatch的触发时机是啥？

不是这样的？
是reduce action store到底都扮演了什么角色？

 1 `action`: 毋庸置疑，是动作，定义了很多操作类型，和相关的数据？一般情况下，这个数据还是未知的，因此把他用作函数到参数。具体的写法成这样的

```
function addItem(text) {
	return {
		type: types.ADD_ITEM,
		text
	
	}
}
// 这个是一个action，
// actionCreator来创建action? 啥意思？
```

2 `redcuer`, 和Array.propoty.reduce真的很像啊，当前状态（数据）+ action (函数) =》 新的状态 （新的数据）。
这个reducer就是state和action直接的桥梁。
这里包含了，映射action和state处理方法. 已经实现这个state的处理。

```
let createItem(text){
	// 具体处理state的方法。
}
let reducer = (state = [], action) => {
	switch(action.type) {
		case ADD_ITEM:
			return [crateItem(action.text,..state)]
		default:
		return state;
		// 这个default很重要，不可以省，没有合适的就返回当前state.
	}
}

```

3 `store` 是将要干什么的action和更新state的reducer链接起来。 主要可以干这些事，

   * 维护了一个state。 
   * 通过getState（）获得state, 
   * 通过dipatch(action)，来更新新state（这里是不是和reduce功能重合了？）。
   * 通过subscribe(listener)来监听注册。
   
   创建store 
   
   ```
   let store = createStore(rootReducers, initialState); // 参数是reduce 和initialstate.
 
   
   ```
   使用store 跟新state
   
   ```
   store.dispatch(addItem('textcontent'));
   //addItem('textcontent') 是上面创建的action。
   
   ```
   store.dispatch()的源码
   
   ```
   function dispatch(action) {
  		// 	currentReducer 是当前的Reducer
  		currentState = currentReducer(currentState, action);

  		listeners.slice().forEach(function (listener) {
   		 return listener();
  		});

  		return action;
   }
   
   ```
   
 他是如何找到是哪个reducer发生了。。其实就一个哈，对于大型的reduce需要组合的，维护整个的字段。
 
 
 ```
 现在的理解是，redux就是保持数据的一致性，将数据存储在state中，只能通过action 触发才能有改变state的动机，那怎么改变呢？就是reduce就是 根据不同的action,可以生成新的state的这样一种才能（函数）改变action对应的state中的字段。如何执行这个函数呢？ 只有在store中执行，他可以获取state, 通过dispatch(action) 跟新当前的state =>到一种新的状态。用什么更新呢，用reduce定义的函数。store创建的时候，传给他reduce和action集合。 所以说：store是reduce和action的桥梁。
 
 ```
 
[流程架构](流程架构)

####1.2redux介绍
三大原则

1. 所有的数据state都存储在一个obj tree中，并且位于唯一一个store钟。
2. state只能通过触发action改变state。action描述事件的普通对象。
3. 为了描述action如何改变state, 需要编写reducers。

####action
action就是普通的js对象，返回干了什么事的描述，一般情况下就是对象中包含了type类型。

创建action

```
export function increment () {
	return {
		type:DECREMENT_COUNTER
	}
}
// 用函数的原因：用函数返回action, 是一个纯函数只返回普通对象。 
```
 action 只是描述了只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。
####reducer
告诉他人，根据不同的action类型，迭代state, 生成新的state。

 1. 设计state的结构
 
    redux应用中，所有的数据都放在一个state中，用一个对象表示。

 2. action处理
 
 	接收action, state => newstate。 action已经在上面定义了，state最开始的时候是undefine, 所以要定义初始值。
   
    创建reduce
 	
 	```
 	 const initialState = ..
 	 
 	 function todoApp(state = initialState, action) {
 	 	switch(action.type) {
 	 		case SET_File: 
 	 			return object.assign({}, state, {
 	 				visibilityFile: action.fileter
 	 		    });
 	 		 case Add_TODO: 
 	 		 	return object.assign({}, state, {
 	 		 		todos: [..state.todos, {text:actiontext,completed:false}]
 	 		 	});
 	 	}
 	 }
 	 // 注意：不能修改state, 用assigin（）返回。
 	```
 3. redux合成
 
   将整个redux分解成一小块，每个小块负责处理state对象数据中的一部分。传入的不在是state，可以是state中的任意数据类型。在整合的时候，主redux将相应的部分传递给redux小块。
   
  ```
  import { combineReducers } from 'redux';

	const todoApp = combineReducers({
 	  visibilityFilter,
 	  todos
  });

  export default todoApp;
  
  ```	
####store 
store 能维持应用的 state，并在当你发起 action 的时候调用 reducer.

1. 创建store
	
	```
	import { createStore } from 'redux'
	import todoApp from './reducers'

	let store = createStore(todoApp)
	```
2. 分发action


```
// reduce 是一件定义好的action函数.
store.dispatch(action)
```

###2 redux和react是什么关系
没啥关系，就是用react-redux联系起来了。 当然redux可以用其他的中间链接和vue,ang,jq等一起使用。
那问题来啦react-redux是什么东西呢？
#### 2.1  react-redux
疑惑？
this.props中的内容是如何传进去的？

###3 工具

react-redux，Redux-Dev-Tools


###4 源码

###5 问题
1 组件直接没有数据隔离？整个项目都用一个数据state?
对于不需要组件减交互数据的组件不需要使用，跨越component树的状态交互才用Redux，一棵树下props和state足以，性能也好。

###6 demo