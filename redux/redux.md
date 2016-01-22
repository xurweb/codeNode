#redux

###1 什么是redux？出现的需求背景是什么？可以做什么用。
类比：redux类似 Array.propoty.reduce()// 数据状态迭代。

1. 在reudx中，state变化只能通过触发action来，action就是描述发生了什么的普通对象
2. 对应action, reducer 指明如何跟新state。他通过输入旧state,action ==>新state
3. 如何联系起，action和reducer呢？store,可以通过dispatch（）。应用中所有的state都存储在stroe中, 需要存储范式的形式，什么事范式呢？就是减少沉余。

 ####需求背景
  state太多无法管理，前端新需求服务端渲染，路由转跳。主要原因来自于：变化和异步融合在一起。
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

react-redux，Redux-Dev-Tools

###3 redux高级
异步action

Middleware

###4 源码

###5 问题
1 组件直接没有数据隔离？整个项目都用一个数据state?
对于不需要组件减交互数据的组件不需要使用，跨越component树的状态交互才用Redux，一棵树下props和state足以，性能也好。

###6 demo
