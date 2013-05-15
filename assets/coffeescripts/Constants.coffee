class Constants

	init: ->

		this.landscape  = canvas.width > canvas.height
		this.portrait   = !this.landscape
		this.spriteSizeBasis = if this.landscape then canvas.height else canvas.width
		this.spriteSize = Math.round(this.spriteSizeBasis / 60)

		@
