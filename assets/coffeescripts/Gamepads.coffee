class Gamepads

	init: ->

		this.getPlayers()
		this.prevTimestamps = []

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

	getInputValue: (input) ->

		return Math.round(input)

	getPlayers: ->

		rawGamepads = navigator.webkitGetGamepads()
		this.players = []
		gamepadsChanged = false

		for player in rawGamepads
			this.players.push(player) if player?

		@

	pollGamepads: ->

		this.getPlayers()

		for player, i in this.players
			if player.timestamp && player.timestamp == this.prevTimestamps[i]
				continue

			this.prevTimestamps[i] = player.timestamp
			this.updateDisplay(player)

		@

	updateDisplay: (player) ->

		axes    = player.axes
		buttons = player.buttons

		axisValues =
			x: this.getInputValue(axes[0])
			y: this.getInputValue(axes[1])

		buttonValues =
			a:      this.getInputValue(buttons[this.buttonsIndex.a])
			b:      this.getInputValue(buttons[this.buttonsIndex.b])
			x:      this.getInputValue(buttons[this.buttonsIndex.x])
			y:      this.getInputValue(buttons[this.buttonsIndex.y])
			l:      this.getInputValue(buttons[this.buttonsIndex.l])
			r:      this.getInputValue(buttons[this.buttonsIndex.r])
			start:  this.getInputValue(buttons[this.buttonsIndex.start])
			select: this.getInputValue(buttons[this.buttonsIndex.select])

		console.log(axisValues, buttonValues)

		@