#webGL 简介

webGL 能够不用任何插件，使用基于openGL es 2.0 的接口，在浏览器的 canvas元素上渲染 3d效果。webGL程序包含用js写的控制程序，和执行在GPU上的特殊效果代码。webGL 元素能够混合一些元素和页面的背景。


这篇文章是介绍webGL的基本应用，是默认你已经懂得数学中的3d图形学，也不会教你openGL本身的一些知识。

example是放在 github的库中的。


###准备
首先你得有个canvas 元素用于渲染3d效果。 下面这段代码提供一个canvas, 并且写了一个onloade的事件处理函数，用来初始化我们的webGL 内容。

```
<canvas id="glcanvas" ref="glcanvas" width="640px" height="480px">
</canvas>

componentDidMount() {
	init()
}

init() {
	let canvas = this.refs.glcanvas;
	// 初始化webgl 上下文
	let gl = this.initWebGl(canvas);
	
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

###用着色器给webGL着色

在gl中，给正方形的每个顶点着色不同的颜色。宠儿渲染一个梯度的色彩。首先给这些顶点建立颜色。 

第一步： 建立一个缓冲，存储颜色。存储是四个顶点的颜色信息。

第二步：修改顶点着色器，让每个点关联一个颜色，使得着色器可以从颜色缓冲区中正确的取出颜色值。

第三步： 片段着色器，每个片段根据其顶点所在的位置得到一个差值过的颜色，vColor。

第四步： 在initShader（）中，初始化颜色属性。

第五步： 在drawScene() ，使用颜色绘制正方形。绑定缓冲区，使用缓冲区颜色绘图。

#####QA
为什么是差值的颜色，有渐变的效果呢？

是因为，在图元光栅化时候，不仅将三维的点数据变成了多个元素的数组，每个元素表示一个像素的信息。而且对每个顶点的颜色也进行了光栅化话，光栅化的过程是线性插值算来的，算出每个点的坐标和颜色。。颜色的RGBA值全部类似于gl_Position中的z值一样被线形内插过了。


###纹理着色
纹理就是纹理坐标到颜色的映射。顶点着色器就是将 对应的顶点的纹理坐标相映射。

片元着色器，根据纹理坐标读取颜色，作为对应像素显示的颜色。


###


