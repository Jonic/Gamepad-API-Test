animationLoopId = null;

animationLoop = (now) ->

	canvas.width = canvas.width

	game.update()

	window.requestAnimationFrame(animationLoop)

	return

updateTestData = (playerInputData) ->

	for player in playerInputData
		if player.updated
			document.querySelector('.value-up').innerHTML    = player.axisValues.up
			document.querySelector('.value-down').innerHTML  = player.axisValues.down
			document.querySelector('.value-left').innerHTML  = player.axisValues.left
			document.querySelector('.value-right').innerHTML = player.axisValues.right

			document.querySelector('.value-a').innerHTML      = player.buttonValues.a
			document.querySelector('.value-b').innerHTML      = player.buttonValues.b
			document.querySelector('.value-x').innerHTML      = player.buttonValues.x
			document.querySelector('.value-y').innerHTML      = player.buttonValues.y
			document.querySelector('.value-l').innerHTML      = player.buttonValues.l
			document.querySelector('.value-r').innerHTML      = player.buttonValues.r
			document.querySelector('.value-select').innerHTML = player.buttonValues.select
			document.querySelector('.value-start').innerHTML  = player.buttonValues.start

	return

canvas = document.createElement('canvas')
canvas.width  = document.body.clientWidth
canvas.height = document.body.clientHeight
context = canvas.getContext('2d')

document.body.appendChild(canvas)

CONST     = new Constants()
game      = new Game()
gamepads  = new Gamepads()
utils     = new Utils()
world     = new World()
character = new Character()

game.init()