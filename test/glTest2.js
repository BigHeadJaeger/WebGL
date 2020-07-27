// 直接二维坐标上画点
function main() {
    var canvas = document.getElementById('webgl')

    var gl = getWebGLContext(canvas)

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    var vs = document.getElementById('VS').innerText
    var fs = document.getElementById('FS').innerText

    if (!initShaders(gl, vs, fs)) {
        console.log('shader error')
        return
    }

    var posLocation = gl.getAttribLocation(gl.program, 'a_pos')
    canvas.onmousedown = function (event) {
        click(event, gl, canvas, posLocation)
    }

    // gl.vertexAttrib3f(posLocation, 0.5, 0.5, 0)

    // gl.drawArrays(gl.GL_POINTS, 0, 1)
}

var g_points = [];
function click(event, gl, canvas, posLocation) {
    var x = event.clientX
    var y = event.clientY
    var rect = event.target.getBoundingClientRect()
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    g_points.push(x);
    g_points.push(y);
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (var i = 0; i < g_points.length; i += 2){
        gl.vertexAttrib3f(posLocation, g_points[i], g_points[i + 1], 0);
        gl.drawArrays(gl.GL_POINTS, 0, 1)
    }

}