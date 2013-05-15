class Gamepads

	init: (callback) ->

		if utils.isFunction(callback)
			this.callback = callback

		this.getPlayers()
		this.prevTimestamps = []
		this.playerInputData = []

		this.buttonsIndex =
			a: 1
			b: 2
			x: 0
			y: 3
			l: 4
			r: 5
			start:  9
			select: 8

		@

	getInputDataForUpdatedGamepads: ->

		this.getPlayers()

		for player, i in this.players
			if player.timestamp && player.timestamp == this.prevTimestamps[i]
				this.playerInputData[i].updated = false
			else
				this.prevTimestamps[i] = player.timestamp
				this.playerInputData[i] = this.getSanitisedGamepadInputData(player)

		if this.callback?
			this.callback.call(this, this.playerInputData)

		@

	getPlayers: ->

		this.players = []

		for player in navigator.webkitGetGamepads()
			this.players.push(player) if player?

		@

	getSanitisedGamepadInputData: (player) ->

		axes    = player.axes
		buttons = player.buttons

		axisX = Math.round(axes[0])
		axisY = Math.round(axes[1])

		axisValues =
			up:    +(axisY == -1)
			down:  +(axisY == 1)
			left:  +(axisX == -1)
			right: +(axisX == 1)

		axisValues.upLeft    = +(axisValues.up    and axisValues.left)
		axisValues.upRight   = +(axisValues.up    and axisValues.right)
		axisValues.downLeft  = +(axisValues.down  and axisValues.left)
		axisValues.downRight = +(axisValues.down  and axisValues.right)
		axisValues.leftUp    = +(axisValues.left  and axisValues.up)
		axisValues.leftDown  = +(axisValues.left  and axisValues.down)
		axisValues.rightUp   = +(axisValues.right and axisValues.up)
		axisValues.rightDown = +(axisValues.right and axisValues.down)

		buttonValues =
			a:      Math.round(buttons[this.buttonsIndex.a])
			b:      Math.round(buttons[this.buttonsIndex.b])
			x:      Math.round(buttons[this.buttonsIndex.x])
			y:      Math.round(buttons[this.buttonsIndex.y])
			l:      Math.round(buttons[this.buttonsIndex.l])
			r:      Math.round(buttons[this.buttonsIndex.r])
			start:  Math.round(buttons[this.buttonsIndex.start])
			select: Math.round(buttons[this.buttonsIndex.select])

		return {
			axisValues: axisValues
			buttonValues: buttonValues
			updated: true
		}