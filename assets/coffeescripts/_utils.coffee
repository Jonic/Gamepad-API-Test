class Utils

	isFunction: (obj) ->
  		!!(obj && obj.constructor && obj.call && obj.apply)