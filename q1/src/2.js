var canvas = document.getElementById('canvas')
var ctx = canvas.getContext("2d")

// translate to center of canvas
ctx.translate(canvas.width / 2, canvas.height * 3/ 4)

// initialize a koch curve L-System that uses final functions
// to draw the fractal onto a Canvas element.
// F: draw a line with length relative to the current iteration (half the previous length for each step)
//    and translates the current position to the end of the line
// +: rotates the canvas 60 degree
// -: rotates the canvas -60 degree

var koch = new LSystem({
  axiom: 'X',
  productions: { 'X': 'F[-X]X[+X][+X]F-[-X]+X[-X]', 'F': 'FF' },
  finals: {
    '+': () => { ctx.rotate((Math.PI / 180) * -11) },
    '-': () => { ctx.rotate((Math.PI / 180) * 11) },
    '[': () => { ctx.save() },
    ']': () => { ctx.restore() },
    'F': () => {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -20 / (koch.iterations + 1))
      ctx.stroke()
      ctx.translate(0, -20 / (koch.iterations + 1))
    },
    'X': () => {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -20 / (koch.iterations + 1))
      ctx.stroke()
      ctx.translate(0, -20 / (koch.iterations + 1))
    }
  }
})

koch.iterate(4)
koch.final()
