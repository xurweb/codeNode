#Using textures in WebGL

texture 是纹理的意思

我们的程序已经实现了3D立方体旋转， 将实地的颜色换成纹理吧。

###加载纹理

首先，是添加加载纹理的代码。 在我们的项目里，我们将会使用单一的纹理，旋转立方体的4个面都用一样的纹理，任意多个纹理都是用一样的方法添加的。

注意: 必须要注意的是，添加的纹理必须要符合cross-domain 规则。 你只能加载那些你的内容能够被cors接收的，不允许跨域。

加载纹理的代码：

```
 function initTextures() {
  // 创建纹理，存储在cubeTexture
 	cubeTexture = gl.createTexture();
 	// 创建个图片对象
 	cubeImage = new Image();
 	// 当载入图片时，回调函数
 	cubeImage.onload = function() {
 		handleTextuerLoaded(cubeImage, cubeTextuer)
 	}
 	// 异步加载图片，设置图片
 	cubeImage.src = 'aab.png';
 
 }
 
 function handleTextureLoaded(iamge, texture) {
 // 首先，设置当前纹理
 	gl.bindTexture(gl.TEXTURE_2D, texture);
 	// 设置纹理的图片
 	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  gl.UNSIGNED_BYTE, image)
 	// 设置缩放规则，当图形大于图片时缩放，图形小于图片时，纹理缩放。
 	gl.texParameteri();
 	gl.texParameteri();
 	// 不知道什么意思？？？
 	gl.generateMipmap();
 	// 清空，结束
 	gl.bindTexture();
 }

```
initTextures函数中，通过createTexture()创建 GL texture 对象，通过图片文件加载纹理。 创建一
个图像对象，并且加载到我们希望的纹理。 当图片加载的时候，回调handleTextureLoaded函数。

为了正确的创建纹理，明确新的纹理，是我们想绑定他到gl.TEXTURE_2D. 加载的图片通过texImage2D()方法将图片数据加载到纹理中。

注意： 纹理的宽度和高度必须是2倍的像素。

接下来的两行是为纹理场景过滤器， 控制图片在变化时候如何变化。 这里我们使用线性的。 通过generateMipMap()创建mipMap()。 最后告诉webGL, 给gl.TEXTURE 绑定 null。


### NOn power of two textuers
Generally speaking, using textures whose sides are a power of two is ideal. They are efficiently stored in video memory and are not restricted in how they could be used. Artist-created textures should be scaled up or down to a nearby power of two and, really, should have been authored in power-of-two to begin with. Each side should be: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, or 2048 pixels. Many, but not all, devices can support 4096 pixels; some can support 8192 and above.

一般来说，用纹理的面都是2的指数的立方体是比较理想的。 在video存储中效率较高，但是不是必须的。 artist-created的纹理被放到或缩小到二的指数倍， 每个面应该是，1， 2，，4.。2048. 有些机器支持4096或者更多。


Occasionally, it is difficult to use power-of-two textures due to your specific circumstance. If the source is some 3rd party, often the best results come from modifying the images using HTML5 canvas into power-of-two sizes before they are passed to WebGL; UV coordinates may also require adjustment if stretching is apparent.

但是，在现实中很难用到2的指数倍。 如果资源是3的倍数，最好的办法是用htm5 的canvas 在载入webGL 之前修改成2的指数。 UV 坐标也需要这种调整。

But, if you must have a non power-of-two (NPOT) texture, WebGL does include limited native support. NPOT textures are mostly useful if your texture dimensions must be the same resolution as something else, such as your monitor resolution, or if the above suggestions are just not worth the hassle. The catch: these textures cannot be used with mipmapping and they must not "repeat" (tile or wrap).

但是，如果你有个非2的指数倍纹理 webGL有基本的支持， NPOT 纹理 ，在你的纹理大小必须一致时是很优用的。比如显示器问题，或者其他问题。

###Mapping the texture onto the faces

At this point, the texture is loaded and ready to use. But before we can use it, we need to establish the mapping of the texture coordinates to the vertices of the faces of our cube. This replaces all the previously existing code for configuring colors for each of the cube's faces in initBuffers().


在这里，纹理已经被加载准备运用了。 在我们用之前，我们需要建立纹理坐标和我们立方体中每个点的映射表。在initBufers(), 这里将替换掉以前关于配置每个面的颜色的代码。

```
 cubeVerticesTextureCoordBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesTextureCoorBuffer);
 
 var textureCoordinates = [
 	//front ；一个面4个点，每个点的颜色对应纹理的坐标（x,y）
 	0.0, 0.0,
 	
 	1.0, 0.0,
 	
 	1.0, 1.0,
 	
 	0.0, 1.0
   // 。。。 6个面
 
 ]

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates));
```

首先创建个GL buffer, 用来存储每个面对应的纹理坐标， 我们绑定这个数组到buffer中。

这个数组定义了纹理中的坐标和每个面的顶点颜色的对应。 纹理的坐标值范围是从0 -1。 

一旦我们建立了了纹理映射数组， 我们将数组输入到缓冲，webGL 着色器就拥有这个数据，并能运用了。

###updating the shaders
着色器程序，初始化着色器程序的代码也需要更新，让纹理代替实际的颜色。










###总结
用纹理给立方体着色。

第一步： 更新着色器，顶点着色器需要修改，每个点的颜色改为纹理坐标。 片段着色器改为，每个像素的颜色付给的值改为纹理坐标对应的颜色。

第二步： 在主程序中添加 初始化纹理。创建纹理，给纹理添加图片。 图片和纹理结合是在图片异步加载时，并且需要定义放大缩小时候，图片纹理如何适应。

第三步： 修改 初始化buffer的程序。创建一个纹理顶点的缓冲。 在程序中添加立方体中每个顶点的颜色，定义为一个数字。

第四步：修改初始化着色器程序，将处理颜色的程序片段改为处理纹理。

第五步： 修改 画图函数， 在程序中 使用纹理坐标缓冲，并设置给处理纹理的着色器。 然后添加
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, cubeTexture);
gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0); 
// 不懂啥意思。
















