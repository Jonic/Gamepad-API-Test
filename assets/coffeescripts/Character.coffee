class Character

	init: ->

		this.colors =
			a: '#cc0000'
			b: '#ffff00'
			x: '#0066cc'
			y: '#77cc33'

		this.color  = this.colors.a
		this.width  = CONST.spriteSize
		this.height = CONST.spriteSize * 2

		this.position =
			x: (canvas.width  / 2) - (this.width  / 2)
			y: (canvas.height / 2) - (this.height / 2)

		this.velocity =
			x: 0
			y: 0

		this.maxVelocity =
			x: 150
			y: 150

		this.acceleration =
			x: 1
			y: 0.8

		this.deceleration =
			x: 1
			y: 0.8

		@

	draw: ->

		context.fillStyle = this.color
		context.fillRect(this.position.x, this.position.y, this.width, this.height)

		@

	update: ->

		this.updateValuesFromGamepadInput()

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		this.draw()

		@

	updateValuesFromGamepadInput: ->

		gamepadValues = gamepads.playerInputData[0]
		axisValues    = gamepadValues.axisValues
		buttonValues  = gamepadValues.buttonValues

		if buttonValues.start
			this.paused = !this.paused

		if !this.paused
			if axisValues.up or axisValues.down
				if axisValues.up and this.velocity.y > -this.maxVelocity.y
					this.velocity.y -= this.acceleration.y
				else if axisValues.down and this.velocity.y < this.maxVelocity.y
					this.velocity.y += this.acceleration.y
			else
				this.velocity.y *= this.deceleration.y

			if axisValues.left or axisValues.right
				if axisValues.left and this.velocity.x > -this.maxVelocity.x
					this.velocity.x -= this.acceleration.x
				else if axisValues.right and this.velocity.x < this.maxVelocity.x
					this.velocity.x += this.acceleration.x
			else
				this.velocity.x *= this.deceleration.y

			this.color = this.colors.a if buttonValues.a
			this.color = this.colors.b if buttonValues.b
			this.color = this.colors.x if buttonValues.x
			this.color = this.colors.y if buttonValues.y

			this.position.x -= 10 if buttonValues.l
			this.position.x += 10 if buttonValues.r

		@