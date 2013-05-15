animationLoop = (now) ->

	canvas.width = canvas.width

	gamepads.pollGamepads()

	window.requestAnimationFrame(animationLoop)

	return

canvas = document.createElement('canvas')
context = canvas.getContext('2d')

document.body.appendChild(canvas)

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

gamepads = new Gamepads()
gamepads.init()

animationLoopId = window.requestAnimationFrame(animationLoop)