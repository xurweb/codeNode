#react-redux 源码解析

###目录结构


    |--provider.js react-redux源码
    |--content.js  react-redux源码
    |--redux, react-redux, react直接的关系
   

####provider.js
功能：生成Provider组件。主要获取props.store 存到自己的this.store。 给孩子想要的props给孩子。

代码：

```
// 生成一个名为Providers的组件
class Provider extends Compoonent {

	// 这个是react的新出来关于上下文环境 传递到子组件中。
	getChildContext(){
		return {store: this.store}
	}

	// 初始化，this.store
    constructor(props, context) {
      super(props, context)
      this.store = props.store
    }
    
    // 当接收到新的props时， 跟新store
    componentWillReceiveProps(nextProps) {
      const { store } = this
      const { store: nextStore } = nextProps

      if (store !== nextStore) {
        warnAboutReceivingStore()
      }
    }
   // 渲染，
    render() {
      let { children } = this.props
      return Children.only(children)
    }


}
//childContextTypes 子组件的类型检查，和getChiedContext合用。返回 children 中仅有的子级。否则抛出异常。
Provider.childContextTypes = {
  store: storeShape.isRequired
}

```


####connect.js

功能： 获得改变的props，重新渲染state。 有惹加载？version，版本号控制的。

参数：

* mapStateToProps： 子组件中要输入props, 这些props和store的对应关系，是一个pure obj。
* mapDispatchToProps：action 的props，应该是通过动作改变的？？

```
发现问题：react context,childrenType,等~


function connect (...参数) {
	// 定义了初始化参数函数，
	// 处理参数函数
	
	return function wrapWithConnect (WrappedComponent) {
		// 定义了一个组件
		Class Contect extends Component {
		    
		    // 优化，如果没有改变，就不重新渲染
		    shouldComponentUpdate() {
       			 return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
      		}
      		
      		 constructor(props, context) {
      		 	// 从props, context中获得store, 用store中的state 初始化this.state.
      		 	
      		    this.version = version
      		    // content函数被调用了，version就会改变
      		 }
      		 
      		 // 计算需要改变的props赋值到。this.stateProps， this.dispatchProps，this.props,一起和并到mergedProps。
      		 
      		 componentDidMount() {
      		 	this.tyrSubscribe();
      		 	// 这个函数是，在有参数的情况下并且还在注册的情况下，首先subscribe返回一个解注函数。
      		 	// 执行this.handleChange() 如果state中的内容相比之前发生了改变。就setState(),重新渲染。
      		 }
      		 
      		 componentWillUnmount（）{
      		 // 组件挂载的时候，
      		   this.tryUnsubscribe() // 执行注销函数（），
      		   this.clearCache()// 清空缓存，将变量设置为null。
      		 }
      		 
      		 // react中的state是怎么获得的呢？这个是Connect中的，是上下文环境中的。
      		 // redux中的store中的state是怎么获得的呢？
      		 handleChange (){
      		 	// 没有产生解注函数，说明没有生成执行监听函数
      		 	if(!this.unsubscribe){
      		 		return
      		 	}
      		 	// 这个是 state中的storeState, 一个是通过action改变过的store中的state.
      		 	// 如果发生了改变，就setState,改变react视图。
      		 	const prevStoreState = this.state.storeState
        		const storeState = this.store.getState()
        		
        		if (!pure || prevStoreState !== storeState) {
          		  this.hasStoreStateChanged = true
          		  this.setState({ storeState }) // 改变state。
        		}
        		
        		render() {
        			// 渲染的时候，生成一个Element, 为WrappedComponent，啥意思？
        		
        		}
      		 }
      		    
      		 if (process.env.NODE_ENV !== 'production') {

    	      // 在非生产环境下，通过判断版本号是否变化，
    	       this.trySubscribe() // 跟新state
        	   this.clearCache() // 清楚缓存。
		
		    }
	
	
	
	}

}

```



###react react-redux redux直接的关系

思维脑图：

[redux](http://naotu.baidu.com/file/76dd6d5ee6b98c969c4c5c96d741982d)

[react-redux]()


















