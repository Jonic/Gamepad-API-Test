// Generated by CoffeeScript 1.6.1
'use strict';
/* --------------------------------------------
     Begin Character.coffee
--------------------------------------------
*/

var CONST, Character, Constants, Game, Gamepads, Utils, World, animationLoop, animationLoopId, canvas, character, context, game, gamepads, updateTestData, utils, world;

Character = (function() {

  function Character() {}

  Character.prototype.init = function() {
    this.colors = {
      a: '#cc0000',
      b: '#ffff00',
      x: '#0066cc',
      y: '#77cc33'
    };
    this.color = this.colors.a;
    this.width = CONST.spriteSize;
    this.height = CONST.spriteSize * 2;
    this.position = {
      x: (canvas.width / 2) - (this.width / 2),
      y: (canvas.height / 2) - (this.height / 2)
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.maxVelocity = {
      x: 150,
      y: 150
    };
    this.acceleration = {
      x: 1,
      y: 0.8
    };
    this.deceleration = {
      x: 1,
      y: 0.8
    };
    return this;
  };

  Character.prototype.draw = function() {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
    return this;
  };

  Character.prototype.update = function() {
    this.updateValuesFromGamepadInput();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.draw();
    return this;
  };

  Character.prototype.updateValuesFromGamepadInput = function() {
    var axisValues, buttonValues, gamepadValues;
    gamepadValues = gamepads.playerInputData[0];
    if (!gamepadValues) {
      return;
    }
    axisValues = gamepadValues.axisValues;
    buttonValues = gamepadValues.buttonValues;
    if (buttonValues.start) {
      this.paused = !this.paused;
    }
    if (!this.paused) {
      if (axisValues.up || axisValues.down) {
        if (axisValues.up && this.velocity.y > -this.maxVelocity.y) {
          this.velocity.y -= this.acceleration.y;
        } else if (axisValues.down && this.velocity.y < this.maxVelocity.y) {
          this.velocity.y += this.acceleration.y;
        }
      } else {
        this.velocity.y *= this.deceleration.y;
      }
      if (axisValues.left || axisValues.right) {
        if (axisValues.left && this.velocity.x > -this.maxVelocity.x) {
          this.velocity.x -= this.acceleration.x;
        } else if (axisValues.right && this.velocity.x < this.maxVelocity.x) {
          this.velocity.x += this.acceleration.x;
        }
      } else {
        this.velocity.x *= this.deceleration.y;
      }
      if (buttonValues.a) {
        this.color = this.colors.a;
      }
      if (buttonValues.b) {
        this.color = this.colors.b;
      }
      if (buttonValues.x) {
        this.color = this.colors.x;
      }
      if (buttonValues.y) {
        this.color = this.colors.y;
      }
      if (buttonValues.l) {
        this.position.x -= 10;
      }
      if (buttonValues.r) {
        this.position.x += 10;
      }
      if (buttonValues.select) {
        this.init();
      }
    }
    return this;
  };

  return Character;

})();

/* --------------------------------------------
     Begin Constants.coffee
--------------------------------------------
*/


Constants = (function() {

  function Constants() {}

  Constants.prototype.init = function() {
    this.landscape = canvas.width > canvas.height;
    this.portrait = !this.landscape;
    this.spriteSizeBasis = this.landscape ? canvas.height : canvas.width;
    this.spriteSize = Math.round(this.spriteSizeBasis / 60);
    return this;
  };

  return Constants;

})();

/* --------------------------------------------
     Begin Game.coffee
--------------------------------------------
*/


Game = (function() {

  function Game() {}

  Game.prototype.init = function() {
    var animationLoopId;
    CONST.init();
    world.init();
    character.init();
    gamepads.init(updateTestData);
    animationLoopId = window.requestAnimationFrame(animationLoop);
    return this;
  };

  Game.prototype.update = function() {
    gamepads.getInputDataForUpdatedGamepads();
    character.update();
    world.update();
    return this;
  };

  return Game;

})();

/* --------------------------------------------
     Begin Gamepads.coffee
--------------------------------------------
*/


Gamepads = (function() {

  function Gamepads() {}

  Gamepads.prototype.init = function(callback) {
    if (utils.isFunction(callback)) {
      this.callback = callback;
    }
    this.getPlayers();
    this.prevTimestamps = [];
    this.playerInputData = [];
    this.buttonsIndex = {
      a: 1,
      b: 2,
      x: 0,
      y: 3,
      l: 4,
      r: 5,
      start: 9,
      select: 8
    };
    return this;
  };

  Gamepads.prototype.getInputDataForUpdatedGamepads = function() {
    var i, player, _i, _len, _ref;
    this.getPlayers();
    _ref = this.players;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      player = _ref[i];
      if (player.timestamp && player.timestamp === this.prevTimestamps[i]) {
        this.playerInputData[i].updated = false;
      } else {
        this.prevTimestamps[i] = player.timestamp;
        this.playerInputData[i] = this.getSanitisedGamepadInputData(player);
      }
    }
    if (this.callback != null) {
      this.callback.call(this, this.playerInputData);
    }
    return this;
  };

  Gamepads.prototype.getPlayers = function() {
    var player, _i, _len, _ref;
    this.players = [];
    _ref = navigator.webkitGetGamepads();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      player = _ref[_i];
      if (player != null) {
        this.players.push(player);
      }
    }
    return this;
  };

  Gamepads.prototype.getSanitisedGamepadInputData = function(player) {
    var axes, axisValues, axisX, axisY, buttonValues, buttons;
    axes = player.axes;
    buttons = player.buttons;
    axisX = Math.round(axes[0]);
    axisY = Math.round(axes[1]);
    axisValues = {
      up: axisY === -1,
      down: axisY === 1,
      left: axisX === -1,
      right: axisX === 1
    };
    axisValues.upLeft = axisValues.up && axisValues.left;
    axisValues.upRight = axisValues.up && axisValues.right;
    axisValues.downLeft = axisValues.down && axisValues.left;
    axisValues.downRight = axisValues.down && axisValues.right;
    axisValues.leftUp = axisValues.left && axisValues.up;
    axisValues.leftDown = axisValues.left && axisValues.down;
    axisValues.rightUp = axisValues.right && axisValues.up;
    axisValues.rightDown = axisValues.right && axisValues.down;
    buttonValues = {
      a: Math.round(buttons[this.buttonsIndex.a]) === 1,
      b: Math.round(buttons[this.buttonsIndex.b]) === 1,
      x: Math.round(buttons[this.buttonsIndex.x]) === 1,
      y: Math.round(buttons[this.buttonsIndex.y]) === 1,
      l: Math.round(buttons[this.buttonsIndex.l]) === 1,
      r: Math.round(buttons[this.buttonsIndex.r]) === 1,
      start: Math.round(buttons[this.buttonsIndex.start]) === 1,
      select: Math.round(buttons[this.buttonsIndex.select]) === 1
    };
    return {
      axisValues: axisValues,
      buttonValues: buttonValues,
      updated: true
    };
  };

  return Gamepads;

})();

/* --------------------------------------------
     Begin World.coffee
--------------------------------------------
*/


World = (function() {

  function World() {}

  World.prototype.init = function() {
    this.color = 'rgb(240, 240, 240)';
    return this;
  };

  World.prototype.draw = function() {
    return this;
  };

  World.prototype.update = function() {
    this.draw();
    return this;
  };

  return World;

})();

/* --------------------------------------------
     Begin _utils.coffee
--------------------------------------------
*/


Utils = (function() {

  function Utils() {}

  Utils.prototype.isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  };

  return Utils;

})();

/* --------------------------------------------
     Begin _bootstrap.coffee
--------------------------------------------
*/


animationLoopId = null;

animationLoop = function(now) {
  canvas.width = canvas.width;
  game.update();
  window.requestAnimationFrame(animationLoop);
};

updateTestData = function(playerInputData) {
  var player, _i, _len;
  for (_i = 0, _len = playerInputData.length; _i < _len; _i++) {
    player = playerInputData[_i];
    if (player.updated) {
      document.querySelector('.value-up').innerHTML = player.axisValues.up;
      document.querySelector('.value-down').innerHTML = player.axisValues.down;
      document.querySelector('.value-left').innerHTML = player.axisValues.left;
      document.querySelector('.value-right').innerHTML = player.axisValues.right;
      document.querySelector('.value-a').innerHTML = player.buttonValues.a;
      document.querySelector('.value-b').innerHTML = player.buttonValues.b;
      document.querySelector('.value-x').innerHTML = player.buttonValues.x;
      document.querySelector('.value-y').innerHTML = player.buttonValues.y;
      document.querySelector('.value-l').innerHTML = player.buttonValues.l;
      document.querySelector('.value-r').innerHTML = player.buttonValues.r;
      document.querySelector('.value-select').innerHTML = player.buttonValues.select;
      document.querySelector('.value-start').innerHTML = player.buttonValues.start;
    }
  }
};

canvas = document.createElement('canvas');

canvas.width = document.body.clientWidth;

canvas.height = document.body.clientHeight;

context = canvas.getContext('2d');

document.body.appendChild(canvas);

CONST = new Constants();

game = new Game();

gamepads = new Gamepads();

utils = new Utils();

world = new World();

character = new Character();

game.init();
