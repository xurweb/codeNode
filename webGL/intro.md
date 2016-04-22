#webGL 简介

webGL 能够不用任何插件，使用基于openGL es 2.0 的接口，在浏览器的 canvas元素上渲染 3d效果。webGL程序包含用js写的控制程序，和执行在GPU上的特殊效果代码。webGL 是能够渲染3D效果的 js API.


这篇文章是介绍webGL的基本应用，是默认你已经懂得数学中的3d图形学，也不会教你openGL本身的一些知识。

example是放在 github的库中的。


###准备
首先你得有个canvas 元素用于渲染3d效果。 下面这段代码提供一个canvas, 并且写了一个onloade的事件处理函数，用来初始化我们的webGL 内容。

在html文件中准备一个渲染webGL的canvas
```
<canvas id="glcanvas" ref="glcanvas" width="640px" height="480px">
</canvas>
```

```

init() {
	let canvas = document.getElementById('canvas')
	// 初始化webgl 上下文
	let gl = initWebGl(canvas);
	
	if(gl) {
		// 清除颜色为不透明 黑色
		gl.clearColor(0,0,0,1);
		// 开启深度， z-
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		// 清除颜色 和 深度缓存
		gl.clear(gl.COLOR_BUFFER_BIT)
	}
	
	
}
```

初始化webGL 

```
function initWebGL(canvas) {
	gl = canvas.getContext('webgl') || canvas.getContext("experimental-webgl");
}

```

如果页面上有个黑色的画布，就说明准备好，接收内容啦。



