#模型矩阵和投影矩阵

###模型矩阵

就是可以将原来的点（抽象成矩阵A），经过一系列变化，比如平移，旋转，变成矩阵 A‘ 。 这个变化的过程可以通过

A * B = A ’  （B 矩阵就是模型矩阵，B矩阵一般是一个齐次矩阵，每次变化都左乘一个变化矩阵 ） 

###视图矩阵


###投影矩阵

就是讲三维矩阵经过投影 到 二维平面上。有两种情况，正投影和透视投影。

相机空间： 就是你都是透过一个窗口看世界的，这个窗口就是相机空间。相机空间的上下左右都是受限于屏幕边缘，也设置前后边界。 在正设投影中，相机空间是一个正方形，而透视投影钟，是方台体，梯形类似。

定义个贵方的视图区： x,y 是定义边界的大小，[1,3] 3*3 的立方体。 z值是指投影的深度。
 透视投影有角度问题，也是进行其次变化，转换为两个点。
 
###矩阵模型在webGL 中的应用
webGL 中的视图模型和投影矩阵的操作是依赖于第三方库的。比如 glMatrix。

```
// 新建空投影矩阵
var pMatrix = mat4.create();

// 初始化投影矩阵
mat.perspective(45, 400/500, 0.1, 100, pMatrix)
// 45度仰角， 视口的宽高比，0.1 100是前后边界。

// 设置着色器程序 
 var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  // 将模型视图矩阵和投影矩阵传入着色器 
 gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

 var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
 gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));

```