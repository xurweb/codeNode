#react 新增文档

###测试

ReactTestUtils 可以模拟事件，比如点击事件

####Simulate


 引入
 
```

var ReactTestUtil = require('react-addons-test-utils');

```

模拟点击事件 获取dom

```
var node = this.refs.button;

ReactTestUtil.Simulate.click(node);

```

input 输入事件 change

```
var node = this.refs.input;

// 改变input输入框的值
node.value = 'newValue';
ReactTestUtils.Simulate.change(node);
```

键盘事件

```

ReactTestUtil.Simulate.keyDown(node, {key:'Enter', keyCode:13, which:13})


```


####jest-react
[react-jest](https://facebook.github.io/jest/docs/tutorial-react.html)

####others
后面介绍了很多函数，比如

`renderIntoDocument` 是将一个component渲染到document中

 接口：ReactComponent  renderIntoDocument(reactElement instance)
 
   参数是react component的实例， 返回的是一个react Component。
 
 用法：
 
 ```
 var mybox = ReactTestUtil.renderIntoDocument(<myComponent name = 'xuru'/>)
 
 ```
 
 。。。。
 

####demo

测试框架：jest

测试component: myComponent

 myComponent.js
 
```
// MyComponent

default export class MyComponent extends Component {
	construct(props, context){
		super(props);
		this.state = {content:0}
	}
	
	hanleChange(e) {
		this.setState({contennt: this.state.content+1});		
	}

	render () {
		var count = this.state.conent;
		return (
			<div>
				<lable>个数：</lable> count
				<button onClick = this.handleChange>点击增加</button>
			</div>
		
		);

	}


}


``` 

test.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const MyCount = require('./MyComponent');

describe('myCount', ()=> {
	var buttonClick = TestUtils.renderIntoDocument(<My Count/>);
	
	var buttonNode = ReactDOM.findDOMNode(buttonClick);
	// 检查value
	expect(buttonNode.value).toEqual('点击个数')
	
	// 检查事件
	var value = TestUtils.findRenderedDOMComponentWithTag(buttonClick, 'lable').value 
	Testutils.Simulate.click(buttonNode);
    var value1 = TestUtils.findRenderedDOMComponentWithTag(buttonClick, 'lable').value !
	expect(value !== vaule);

})



```

















