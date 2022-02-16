var canvas = document.getElementById('canvas')
var ctx = canvas.getContext("2d")

// translate to center of canvas
ctx.translate(canvas.width / 2, canvas.height *4/ 4)

// initialize a koch curve L-System that uses final functions
// to draw the fractal onto a Canvas element.
// F: draw a line with length relative to the current iteration (half the previous length for each step)
//    and translates the current position to the end of the line
// +: rotates the canvas 60 degree
// -: rotates the canvas -60 degree

var koch = new LSystem({
    axiom: 'X',
    productions: {
        'X': {
            successors: [
                {weight: 50, successor: 'F-[[-X]+X]+F[+FX]-X'},
                {weight: 50, successor: 'F+[[+X]-X]-F[-FX]+X[X]'}
            ]
        },
        'F': {
            successors: [
                {weight: 33, successor: 'F[FF]F'},
                {weight: 33, successor: 'F[F]F'},
                {weight: 33, successor: 'F[+]F'}
            ]
        }
    },
    finals: {
    '+': () => { ctx.rotate((Math.PI / 180) * 12.5) },
    '-': () => { ctx.rotate((Math.PI / 180) * -12.5) },
    '[': () => { ctx.save() },
    ']': () => { ctx.restore() },
    'F': () => {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -70 / (koch.iterations + 1))
        ctx.stroke()
        ctx.translate(0, -70 / (koch.iterations + 1))
    },
    'X': () => {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -70 / (koch.iterations + 1))
        ctx.stroke()
        ctx.translate(0, -70 / (koch.iterations + 1))
    }
}
})

koch.iterate(4)
koch.final()
