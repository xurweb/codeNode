#Creating 3D objects using WebGL


Let's take our square into three dimensions by adding five more faces to create a cube. To do this efficiently, we're going to switch from drawing using the vertices directly by calling the gl.drawArrays() method to using the vertex array as a table, and referencing individual vertices in that table to define the positions of each face's vertices, by calling gl.drawElements().

通过增加另外五个面建立一个小立方体，让我们的正方形变成三维立方体。 为了实现这个效果，直接用点画图的方法gl.drangArray方法将不太适用，我们将这个方法替换为， 将点数字替换成表格，表中的每个独立的点定义为每个面中点的位置，并运用gl.drawElements()方法。

Consider: each face requires four vertices to define it, but each vertex is shared by three faces. We can pass a lot less data around by building a list of all 24 vertices, then referring to each vertex by its index into that list instead of passing entire sets of coordinates around. If you wonder why we need 24 vertices, and not just 8, it is because each corner belongs to three faces of different colors, and a single vertex needs to have a single specific color - therefore we will create 3 copies of each vertex in three different colors, one for each face.

注意： 每个面需要由4个点定义，但是每个点由三个面共享。 通过建立24个点来实现，为了减少很多数据信息，通过建立包含24个点的数组，并且根据点在前面定义的数组中的下标来表明点坐标，而不是直接通过直接获取全部下标。这样节省了些数组信息。 如果你疑惑为什么需要24个点，而不是8个。 是因为每个角包含三个面，个面都有可能有自己的颜色，而且每个点都必须仅有自己唯一的颜色信息。因此我们需要3种情况来表现每个在不同面上的颜色。

### 定义立方体点的位置
首先，建立立方体点位置的缓冲，通过更新initBuffer()中的代码。 这个和原来定义正方形的时候很像，只是有24个点了。

```
var vertices = [

  // Front face
  -1.0, -1.0,  1.0,
   1.0, -1.0,  1.0,
   1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,
  
  // Back face
...

  // Top face
    
...
  // Bottom face
    
...

  // Right face    
...

  // Left face

];



```

###定义点的颜色

我们也需要为24个点建立颜色。 首先为每个面定义一个颜色， 然后通过循环，为每个点定义颜色。这个也是在initBuffer()中更新。

```
var colors = [
  [1.0,  1.0,  1.0,  1.0],    // Front face: white
  [1.0,  0.0,  0.0,  1.0],    // Back face: red
  [0.0,  1.0,  0.0,  1.0],    // Top face: green
  [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
  [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
  [1.0,  0.0,  1.0,  1.0]     // Left face: purple


]

// 一个立体6个面。
var generatedColors = [];

// 通过循环，为每个点，设置一个颜色，变成二维数组。
for(j=0; j<6; j++) {
	var c = colors[j];
	for(var i = 0; i< 4; i++) {
		...
	}
}
// 为颜色定义缓冲，设置为当前缓冲后，填入数据。
var cubeVerticesColorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesColorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

```


###定义元素数组

当顶点数组产生了， 我们需要建立元素数组。

```
var cubeVerticesIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);

//这个数组定义了立方体的所有顶点。 定义6个面， 两个三角形作为一个面。 一个三角形有三个点，这个点 是运用点数组中下标来引用具体的点。

var cubeVertexIndices = [
  0,  1,  2,      0,  2,  3,    // front
  4,  5,  6,      4,  6,  7,    // back
  8,  9,  10,     8,  10, 11,   // top
  12, 13, 14,     12, 14, 15,   // bottom
  16, 17, 18,     16, 18, 19,   // right
  20, 21, 22,     20, 22, 23    // left
];

// Now send the element array to GL

gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);

```
cubeVertexIndices 数组 定义 每个面为一对三角形， 并且指定每个三角形中的点是立方体点数组的坐标。 因此，这个立方体是由12各三角形组成的。

###画立方体

我们需要在 drawScene()方法中增加代码，通过立方体的下标缓冲画图，增加新的gl.bindBuffer() 和gl.drawElements()。

```
//  绑定 顶点位置，是由下标完成的。
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);

// 矩形的投影和视图。
setMatrixUniforms();

// 画图，36维
gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
```


由于 在立方体中，每个面都是由两个三角形组成的。每个面有6个点（2个三角形），一个立方体中有36个点，尽管一些事重复的。 然而，因为我们的下标数组是由简单的整数组成的， 所以对应个片段动画来说并不会多余。

因此，我们现在可以实现一个六面体旋转的。
















































