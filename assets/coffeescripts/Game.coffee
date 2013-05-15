class Game

	init: ->

		CONST.init()

		world.init()
		character.init()

		gamepads.init(updateTestData)

		animationLoopId = window.requestAnimationFrame(animationLoop)

		@

	update: ->

		gamepads.getInputDataForUpdatedGamepads()

		character.update()
		world.update()

		@