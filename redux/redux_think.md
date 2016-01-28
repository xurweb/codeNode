#redux 思想解析

###redux开发背景
没有react开发过程中，组件多，传输的数据流杂乱不堪双向数据流不好管理，最后开发了一套专门管理数据的这么个工具，redux。
###开发思路
由一个统一的地方管理数据，只能通过action改变的单向数据流。为了这个需要有一个地方管理这个数据state, 定义store, 可以获取state,可以分发action,改变state。 action,具体统一描述我们有哪些动作，具体定义动作的地方。只是个单纯的对象，包含了type属性。 最重要的，不同的action，怎么改变state, 我们定义redux 通过state，action迭代state。 

在分发action的过程中，store.dispatch (action)=> 正真的redux(state,action)迭代state的过程中。如果我们想在上述这个过程中增加其他操作，比如计时，log, 打印错误等。我们引入中间件的概念。 如何在redux中实现中间件呢？所谓中间件，就是将多个功能像洋葱一样一层层进，再一层层出。实现applyMiddleware函数。将多个中间件柯里化，一层层调用直到最后。 这个函数返回一个对象，store和dispatch。 这个被包装过的store和dispatch,可以多层调用中间件。compose 就是柯里化的过程。是一个可以向外的函数。

###周边工具

####react-redux
redux是单项数据流，只能是action能触发，然后改变保存的state。 但是react 到react是如何实现的呢？
要实现的内容，如何将react中的state和redux相结合？ 如何在redux中改变的东西让react得到改变？这些是怎么做到的？
