// 绑定buffer的用法

// var vertices = [
//     -0.5, 0.5,
//     -0.5, -0.5,
//     0.5, 0.5,
//     0.5, -0.5
// ]

var vertexData = {
}

var gl

function main() {
    var canvas = document.getElementById('webgl')

    gl = getWebGLContext(canvas)
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    var vs = document.getElementById('VS').innerText
    var fs = document.getElementById('FS').innerText
    if (!initShaders(gl, vs, fs)) {
        console.log('shader error')
        return
    }

    

    vertexData.position = new Float32Array([
        -0.5, 0.5,
        -0.5, -0.5,
        0.5, 0.5,
        -0.5, -0.5,
        0.5, 0.5,
        0.5, -0.5,
    ]);
    
    vertexData.color = new Float32Array([
        1,0,0,
        0,1,0,
        0,0,1,
        1,1,0,
        1,0,1,
        0,1,1,
    ])

    var vertexNum = vertexData.position.length / 2


    var vertices = new Float32Array([
        -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5
    ]);

    initVertexBuffer(vertexData);

    gl.clear(gl.COLOR_BUFFER_BIT)
    // TRIANGLE_STRIP
    gl.drawArrays(gl.TRIANGLES, 0, vertexNum);
}

function initVertexBuffer(vertexData) {
    var VBO = gl.createBuffer();
    if (!VBO) {
        console.log('failed vertex buffer');
        return -1;
    }

    // var size = vertexData.position.byteLength + vertexData.color.byteLength

    var FSIZE = Float32Array.BYTES_PER_ELEMENT;

    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.bufferData(gl.ARRAY_BUFFER, 30 * FSIZE, gl.STATIC_DRAW);

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertexData.position);
    var posLocation = gl.getAttribLocation(gl.program, 'a_pos');
    gl.enableVertexAttribArray(posLocation);
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, FSIZE * 2, 0);

    gl.bufferSubData(gl.ARRAY_BUFFER, 12 * FSIZE, vertexData.color);
    var colorLocation = gl.getAttribLocation(gl.program, 'a_color');
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, FSIZE * 3, 12 * FSIZE); 

}