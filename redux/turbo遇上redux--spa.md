#SPA into react with react-router

react-router的 三个问题 why, what, how

##why

先说单页面应用（SPA），在一个页面中实现了包含这个页面的所有部分，并可以根据操作展现页面的不同部分。好处：高效，减少后端请求，当然也有缺点，发送多次ajax请求。

对于单页面，必须要有路由支撑。现在出现很多路由系统，比如ag backbone都有自己的路由系统。react-router，它是专门针对react的路由系统。这个是我们的重点。

##what
###路由基础
路由通俗的说就是浏览器地址栏中输入什么地址就在浏览器中展现什么页面。当用户请求知乎中的某个页面`http://zhuanlan.zhihu.com/purerender`的时候，知乎的后端会根据/purerender找到相应的web应用逻辑进行处理，然后分发。这种路由主要依力与后端。

#####前端路由

前端路由在技术实现上是和传统的不一样，但是原理是一样的。

在h5 api出来之前，前端的路由都是通过 hash 来实现的，hash 能兼容低版本的浏览器。

比如，在单页面/app中有两个view页面的路由，通过hash表现是这样的：

```
www.baidu.com/app#person
www.baidu.com/app#detail
```

实现方式可以：锚点，id

```
<a name="person"></a>
<a name="detail"></a>

```

但是有以下问题：

1. hash的方式不能很好的处理浏览器的前进、后退等问题
2. 上述问题，可以通过onhashChange接口解决，事件有两个属性：新的url, 旧的url。（但是要考虑兼容性，ie8）
3. 对搜索引擎不友好，后来google支持#!为引擎支持。

HTML5 history新的api出现之后，可以操纵浏览器的历史会话，并且地址像正常的URL一样，在前端甚至判断不出是前端路由还是后端路由。
h5 api实现的单页面路由可以是这样的：

```
www.baidu.com/ap/person
www.baidu.com/app/detail
```

HTML5 introduced the ` history.pushState()` and `history.replaceState()`

```

/*
 state中可以自定义字段，在执行方法时，监听onpopstate事件，可以在event中获得该state对象。从而拿到旧的url。
 state = {
 	url, 
 	title 	
 }, 
 url: 当前的url
 title: 标题
*/

history.pushState(state, title, url)
同理history.replaceState（）

```
`这个有问题，如何实现前进后退，没有介绍清楚`

总结下：原生js下，在单页面下模拟路由可以有两种方式：hash(#)、h5 Api。

那react种单页面路由是如何实现的呢？ 当然是通过react-router。有木有想看源码的冲动？

我们先学习下什么是react-router, 如何用，再小窥下源码。

###react-router
react-router是纯前端的路由。

react-router 是建立在[history](https://github.com/mjackson/history)的基础之上的。这个`history`不是DOM history对象，而是自己写的组件和原生的有很多相似的方法。该history的作用是监听地址的变化，并且将url转换为location对象。 react-router使用转换的location匹配路由。然后渲染路由指向的component。

####宏观感受下
给一段代码

```
import React, {Component}
import {About, Inbox, Dashboard, Message } from './components'
import {Router,Route, IndexRoute,Redirect} from 'react-router'

export default class App extends Component {

// 定义。。。

  React.render((
   <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="/messages/:id" component={Message} />
        {/* 跳转 /inbox/messages/:id 到 /messages/:id */}
        <Redirect from="messages/:id" to="/messages/:id" />
      </Route>
    </Route>
   </Router>
  ), document.body)
}
```
不同路由对应的组件图
 	
|URL	   |组件|
| -------------| -------------|
|/	|App -> Dashboard|
|about	|App -> About|
|inbox	|App -> Inbox|
|messages/:id	|App -> Inbox -> Message|

####介绍重要的组件

##### 1  Router

Router是组件，作用是它能保持 UI 和 URL 的同步。原理：当 history 改变时， <Router> 会匹配出一个Route分支，并且渲染这个分支中配置的组件，渲染时保持父 route 组件嵌套子 route 组件。保存嵌套是啥意思，保留后面说（1）


###### props。 (相当于函数的参数)
作为组件，必须有的props, 必须有children。 children可以是一个或者多个 Route, 或者PlainRoute。

```
 <Router history>
		{children}
 </Router>

```

##### 2 Route

Route是作为Router的子组件存在。是用来配置路由和组件直接的映射关系。

######props

path: URL 中的路径。会组合父组件的path. 如果是从/开始的就是个绝对路径。

component: 当路由匹配时，对应的组件会被渲染。它可以被父route组件的 this.props.children 渲染。

childeren：可以有子元素，并且可以被嵌套。

还有很多props 有需要可以看文档api

```
 <Route path="inbox" component={Inbox}>
        <Route path="/messages/:id" component={Message} />
        {/* 跳转 /inbox/messages/:id 到 /messages/:id */}
        <Redirect from="messages/:id" to="/messages/:id" />
 </Route>
```
##### 3 Link

link组件就相当于是a链接。

props有

to : 链接的地址

activeClassName, actionStyle 当处于激活状态可以添加样式

onclick（e）：可以添加处理点击函数。
。。。

```
<Link to={`/users/${user.id}`} activeClassName="active">{user.name}</Link>

<a href="/users/123" class="active">Michael</a>

// 两者的形式是等价的

```

##### 4 IndexRoute
默认路由，组要用于，当路由是/ 的时候渲染的组件是 App组件，但是App中的this.props.children 是underfined的。 没有可以渲染的东西怎么办呢？ 我们设定个默认路由，当子组件为underfined的时候，就渲染IndexRoute对应的组件。

```
  <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path='/aa' component = {AA}>
  </Route>

// 那有同学问了，为什么不渲染AA呢？ AA 现在还不是App的子组件， 只是路由是子路由而已。
```
##### 5 Redirect 组件
 在应用中 <Redirect> 可以设置重定向到其他 route 而不改变旧的 URL。

```
// 我们需要从 `/profile/123` 改变到 `/about/123`
<Route component={App}>
  <Route path="about/:userId" component={UserProfile}/>
  <Redirect from="profile/:userId" to="about/:userId" />
</Route>

```

##how
说下react-router 下 组件的渲染lifecycle















































