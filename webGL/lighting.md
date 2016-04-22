#lighting in webGL 
The first thing to understand about WebGL is that unlike the broader OpenGL standard, WebGL does not have inherent support for lighting. You have to do it yourself. Fortunately, it's not all that hard to do, and this article will cover some of the basics.

首先要了解的是，webGL 不像openGL 内部支持 光。 你需要自己去写程序，但是并不是很难，这篇文章就涵盖了基本需要的知识。

###在3D上模拟光线和阴影

光模型的理论不是本文研究的重点，但是还是需要看下，在wiki上有

有三种基础光
环境光：这种光是散布在整个环境中，他是非直射的并且均匀的影响每个面，不管是不是直射。

平行光：是冲某个特定的方向设过来的，这种光是从很远的地方射过来的，并且光线之间是平行的。太阳光就是平行光。

点光：是由某个点发出的，而且每个方向都有，这种光是真实世界比较常见的。

我们只考虑比较简单的光模型，简单的平行光和点光，不考了特殊的强光，或者在场景中的点光。在前面demo的基础上加入环境光和简单的平行光。

当你理解了 点源，和镜面光，有两个信息是我们需要的

1. 我们需要个关联每个点的正常的面，在这个面上的法线。
2. 我们需要知道，光线的方向，这个是由 向量表示的。

我们将会更新着色器代码，调整每个点的颜色， 考虑环境光以及光的方向角度对颜色的影响。具体代码在着色器代码中。

###为点绑定正常值

首先要为每个面生成一个法线数组，立方体的法线很简单，如果图形复杂，计算法线也很复杂。

在initBuffer()函数中加入下列代码，初始化法线缓冲。

```
 cubeVerticesNormalBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER， cubeVerticesNormalBuffer);
 
 var vertexNormals = [
   // front, 一个面上的四个点法线都是一样的。
   0,0,1,
   0,0,1
   0,0,1
   0,0,1
   
   // back, bottom , right, left
 
 ]
 gl.bufferData(gl.ARRAY_BUFFER, new WebGLFloatArray(vertexNormals), gl.STATIC_DRAW)；
 
```
接着，我们在drawScene() 将法线数组绑定到着色器属性中，

```
 gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesNormalBuffer);
 // vertexNormalAttribute 这个是在初始化着色器时定义的。属性
 gl.vertexArrtribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0)
 
```
最后，我们需要更新代码，建立
























