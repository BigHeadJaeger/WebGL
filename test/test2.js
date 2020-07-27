function main() {
    var canvas = document.getElementById('webgl');

    var ctx = canvas.getContext('2d');

    ctx.fillStyle = ('rgba(255, 0, 0, 1)');
    ctx.fillRect(120, 10, 150, 150); 

    var ctx2 = canvas.getContext('2d')

    ctx2.fillStyle = ('rgba(0, 255, 0, 1)');
    ctx2.fillRect(300/*  */, 10, 150, 150); 
}