#redux源码解析

代码结构redux目录

      |--index.js 入口，返回下面几个函数接口
      |
      |--createStore.js  创建store, 建立store的相关方法
      |
      |--combineReducers.js 合并多个reducer 返回合并后的reducer
      |
      |--bindActionCreators.js 形成一个可以自己dispatch的action,和react-redux有点关系
      |
      |--applyMiddleware.js 中间件相关
      |
      |--compose.js 其实是一个功能函数，柯里化函数。在中间件里用到
###createStore.js 
函数功能：生成store,并为store实现dispatch函数，subscribe函数，getState，replaceReducer方法。

####1 代码的组织结构

```
export defalut function(reducer, inintalState) {

// 输入参数型，这种方式用class能用吗？不能，这里用的是函数，没有用class

// 返回对象的参数

return {
	dispatch,	
	subscribe,	
	replaceReducer,
}

}
```

####2 注册监听函数

```

  function subscribe(listener) {
    listeners.push(listener)
    var isSubscribed = true

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false
      var index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }
// 原来就是把注册函数放到一个数组里。
// 比较好的是，返回的是解除监听函数，调用遍历时就可以解封了。

```

###combineReducers.js
函数功能介绍：

该函数是将多个reducer合并成一个reducer函数。用于处理多个复杂情况的state. 可以将state分块让不同的reduce进行处理。 用combinerReducer合并多个reducer 进而创建createStore。然后这个store就维护了整个state.

这个返回的函数同样包含两个参数，state, action.

####代码组织结构

实现三个对异常处理的函数，保证redcuer 不为undefined, warning, 判断reducer.

```
function combineReducers (reducers) {
 // 过滤 reducers 中的item 都是function类型
 // 断言下 过滤后的reducers 都是合法的，否则抛出异常。
 // 返回函数，接收两个参数 state action
 
 return function combination(state = {}, action) {
 	// 检查异常
 	// 在生成环境下，打印waring 信息
 	
 	// 保存变化标志
 	var hasChanged = false
 	
 	// 发挥reducer的本能，迭代state,这个是迭代所有reduce中的state,并且以key存储在finalState中
 	
 	// 遍历finalReduers 中的所有reducer, 一个个处理，这个key，是reducer对应的key 比如：
 	/*  {todo: todo, AddItem: AddItem}
 	 *  function todo(action) { switch (action.type){..}}, 
 	 *  function AddItem(action) {}
 	 *   对应的state = {
 	 *		 todo: ...
 	 	     AddItem: ..	
 	 *     }
 	 *
 	 // finalState 是改变后的state的集合。
 	var finalState = mapValues(finaReducers, (reducer, key) => {
 	    // 根据key获取当前的state
 		var previousStateForKey = state[key];
 		var nextStateForKey = reducer(previousStateForKey, action);
 		if(typeof nextStateForKey === 'underfined') {
 			// 抛异常
 		}
 		
 		hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
 		
 		return nextStateForkey
 	})
 	
 	// 根据变化标志，返回state
 	return hasChanged? finalState : state;
 	
 }


}


```


###bindActionCreators.js


          
####bindActionCreator

输入参数 : actionCreator, 创建action的函数
          dispatch: 调用action的函数，
          
 demo
 
```
 function addAction(text){
 	return {
 		type: AddText,
 		text:text
 	}
 
 }
 
 var ba = bindActionCreator(addAction, dispatch) => 
 
 function(args) {
 	var action = addAction(args);
 	dispatch(args)	
 }
 // 调用
 ba("use_name");
 console.log(store.getState())  // state: use_name
 
 // 这个绑定action之后，不需要通过store.dispatch(action)触发 =》变换了一种调用方式，ba(test)
 
```
 
 源码
 
```
  return (...args) => dispatch( actionCreator(...args))
  // actionCreator(...args) => 返回的是action。
  // 调用 dispatch(action)
  
  
```


####bindActionCreators

参数： actionCreators, 创建action的函数集合
       dispatch: 调用时传入的是store.dispatch
       
好处是啥？？？

```
// 一个action直接调用
if( typeof actionCreators === 'function'){
	return bindActionCreator
}

return mapValue(actionCreators, (actionCreator) => {
	bindActionCreator(actionCreator, dispatch)
})

```



###applyMiddleware.js

函数作用：对于处理异步等情况，在调用dispatch时，它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点，能够处理多个中间件函数，并且返回store, 和被包装后的dispatch。
达到目标：每次用中间件调用dispatch事，都是通过封装，返回一个新的dispatch, 然后供下一个中间件使用。

源码：

```
function applyMiddleware (...middlewares){
  return (next) => (reducer, initialState) => {
    var store = next(reducer, initialState)
    var dispatch = store.dispatch
    var chain = []

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 这个是可以执行多个中间件的dipatch
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
	
}

es5的写法：

function applyMiddleware( middlewares ){
	var middlewares = middlewares.slice();
	middlewares.reverse();
	
	// next 其实是dispatch函数，为了保证每次middle中间件调用的不是同一个dispatch。
	return function (next) {
		return function (reducer, initialState) {
			var store = next(reducer, initalState);
			var dispatch = store.dispatch;
			var chain = [];
			
			var middlewareAPI = {
				getState: store.getStae,
				dispatch: function(action){
					dispatch (action)
				}
			}
			
			chain = mideelewares.map(function(middleware) {
				middleware (middlewareAPI)
			})
			
			// store.dispatch 是参数
			dispatch = compose(...chiain)(store.dispatch)
		    
		    return {
		    	...store, // store中包含的东西都有
		    	dispatch  // 新的dispatch
		    }
		}
	}

}

注意几点：
1. 用next做参数，就是每一个 middleware 都可以操作（或者直接调用）前一个 middleware 包装过的 store.dispatch。 
2. 函数柯里化：将接收多个参数的函数，变成返回一个函数并且接收余下参数的函数。
3. applyMiddleware(...middlewares)(react.createStore) , 不先创建store, 传人参数是为了避免在同一个store上多次应用同一个middlerware。

var storetWithMiddle = applyMiddleware(..middle)(createStore);
storeWidthMiddle.


```

















