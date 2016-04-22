
var gl;

var cubeVerticesBuffer;
var cubeVerticesTextureCoordBuffer;
var cubeVerticesIndexBuffer;
var cubeVerticesNormalBuffer

var mvMatrix;
var shaderProgram;
var perspectiveMatrix;

var vertexPositionAttribute;
var textureCoordAttribute;
var vertexNormalAttribute;

var cubeTexture;
var cubeImage

var squareRotation = 0.0;
var lastSquareUpdateTime = 0;


function start() {
	var canvas = document.getElementById('glcanvas');

	// 初始化
	gl = initWebGL(canvas);

	// 开始画图
	if(gl) {
		gl.clearColor(0,0,0,1);
		gl.clearDepth(1);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);  

        // 初始化纹理
    initTextures();
		// 初始化着色器
		initShaders();

		// 初始化缓存
		initBuffer();


		setInterval(drawScene, 15);
	}


}
// 初始化纹理
function initTextures() {
  cubeTexture = gl.createTexture();
  cubeImage = new Image();
  cubeImage.onload = function() {
    handleTextureLoaded(cubeTexture, cubeImage)
  }
  cubeImage.src="cubeimage.png";
}


function handleTextureLoaded(texture, image){
  // 设置为当前纹理
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // 在纹理中注入图片
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  // 对不同的大小，图片缩放
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null)
}
function drawScene() {
	// 清场
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	// 创建透视视角45度，640 480的屏，0.1,100是前后视角
	perspectiveMatrix = makePerspective(45, 480/480, 0.1, 100);
	// 矩阵单位化。就是什么都没做，准备工作。
	loadIdentity();

	// 平移 x,y 是平面， z是深景
	  mvTranslate([0, 0, -9]);
	// push当前的矩阵
	  mvPushMatrix();
	// 旋转，squareRotation 是角度。 [0,1,0]是围绕y轴旋转。
	  mvRotate(squareRotation, [1,0,1]);



	// 绑定立方体顶点
	  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);
    // 指定顶点 位置属性 3 是因为每个点的position(xyz)
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  // 绑定法线
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0)

  // 绑定纹理坐标
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesTextureCoordBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  
  // 运用纹理
    // 激活纹理
    gl.activeTexture(gl.TEXTURE0);
     // 将创建的纹理绑定到gl中纹理单元
    gl.bindTexture(gl.TEXTURE_2D, cubeTexture);
      // 获取属性位置，然后。 uniform1i告知着色器 0单元将会被赋值到uSample属性中。
    gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

  // 根据坐标化立方体
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
    setMatrixUniforms();
    // 绘制， gl.TRIANGLES 是绘制多个不相邻的三角形，36表示有36点 一个面 2个三角形 6个点，6个面。
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);



  	// 设置当前矩阵的值。
  	mvPopMatrix();

  	// 控制
  	var currentTime = Date.now();
  	if(lastSquareUpdateTime) {
  		var delta = currentTime - lastSquareUpdateTime;
  		squareRotation += (30 * delta) / 1000.0;
  	}

  	lastSquareUpdateTime = currentTime;

}
function initBuffer() {

// 创建点坐标buffer
  cubeVerticesBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);

  var vertices = [
  // Front face
  -1.0, -1.0,  1.0,
   1.0, -1.0,  1.0,
   1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,
  
  // Back face
  -1.0, -1.0, -1.0,
  -1.0,  1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0, -1.0, -1.0,
  
  // Top face
  -1.0,  1.0, -1.0,
  -1.0,  1.0,  1.0,
   1.0,  1.0,  1.0,
   1.0,  1.0, -1.0,
  
  // Bottom face
  -1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0, -1.0,  1.0,
  -1.0, -1.0,  1.0,
  
  // Right face
   1.0, -1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0,  1.0,  1.0,
   1.0, -1.0,  1.0,
  
  // Left face
  -1.0, -1.0, -1.0,
  -1.0, -1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0,  1.0, -1.0
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


// 关于法线的。
cubeVerticesNormalBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesNormalBuffer);
var vertexNormals = [
  // Front
   0.0,  0.0,  1.0,
   0.0,  0.0,  1.0,
   0.0,  0.0,  1.0,
   0.0,  0.0,  1.0,
  
  // Back
   0.0,  0.0, -1.0,
   0.0,  0.0, -1.0,
   0.0,  0.0, -1.0,
   0.0,  0.0, -1.0,
  
  // Top
   0.0,  1.0,  0.0,
   0.0,  1.0,  0.0,
   0.0,  1.0,  0.0,
   0.0,  1.0,  0.0,
  
  // Bottom
   0.0, -1.0,  0.0,
   0.0, -1.0,  0.0,
   0.0, -1.0,  0.0,
   0.0, -1.0,  0.0,
  
  // Right
   1.0,  0.0,  0.0,
   1.0,  0.0,  0.0,
   1.0,  0.0,  0.0,
   1.0,  0.0,  0.0,
  
  // Left
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0
];
// 关于颜色
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
var textureCoordinates = [
  // Front
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Back
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Top
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Bottom
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Right
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Left
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0
];
  cubeVerticesTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesTextureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

  // 关于元素下标，创建buffer

  cubeVerticesIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);

 var cubeVertexIndices = [
  0,  1,  2,      0,  2,  3,    // front
  4,  5,  6,      4,  6,  7,    // back
  8,  9,  10,     8,  10, 11,   // top
  12, 13, 14,     12, 14, 15,   // bottom
  16, 17, 18,     16, 18, 19,   // right
  20, 21, 22,     20, 22, 23    // left
];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);


}
function initWebGL(canvas) {
	try{
		gl = canvas.getContext('webgl') || canvas.getContext('experience-webgl');
	} catch(e) {

	}

	if(!gl) {
		console.log('此流浪器不支持webgl');
	}

	return gl;

}

function initShaders() {
	var fragmentShader = getShade(gl, 'shader-fs');
	var VertorShader = getShade(gl, 'shader-vs');

	//创建着色器 片段代码
    shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, fragmentShader);
	gl.attachShader(shaderProgram, VertorShader);
	gl.linkProgram(shaderProgram);

	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.log('创建着色器失败');
	}
	gl.useProgram(shaderProgram);

	textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
  gl.enableVertexAttribArray(textureCoordAttribute);

  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(vertexPositionAttribute);


  vertexNormalAttribute = gl.getUniformLocation(shaderProgram, 'aVertexNormal');
  gl.enableVertexAttribArray(vertexNormalAttribute);
}

function getShade(gl, id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }

  var theSource = "";
  var currentChild = shaderScript.firstChild;
	// 获取script中的内容。
  while(currentChild) {
    if (currentChild.nodeType == 3) {
      theSource += currentChild.textContent;
    }

    currentChild = currentChild.nextSibling;
  }

  var shader;

  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;  // Unknown shader type
  }

  gl.shaderSource(shader, theSource);


  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;

}

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
	// 设置着色器程序 
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  // 将模型视图矩阵和投影矩阵传入着色器 
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}
var mvMatrixStack = [];

function mvPushMatrix(m) {
  if (m) {
    mvMatrixStack.push(m.dup());
    mvMatrix = m.dup();
  } else {
    mvMatrixStack.push(mvMatrix.dup());
  }
}

function mvPopMatrix() {
  if (!mvMatrixStack.length) {
    throw("Can't pop from an empty matrix stack.");
  }

  mvMatrix = mvMatrixStack.pop();
  return mvMatrix;
}

function mvRotate(angle, v) {
  var inRadians = angle * Math.PI / 180.0;

  var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
  multMatrix(m);
}