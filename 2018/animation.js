// Copyright (c) 2018 by Sarah Higley (https://codepen.io/smhigley/pen/gwYPvR)
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var DollarScene = function(el) {
  this.viewport = el;
  this.world = document.createElement('div');
  this.dollars = [];

  this.options = {
    numDollars: 20,
    wind: {
      magnitude: 1.2,
      maxSpeed: 12,
      duration: 300,
      start: 0,
      speed: 0
    },
  };

  this.width = this.viewport.offsetWidth;
  this.height = this.viewport.offsetHeight;

  // animation helper
  this.timer = 0;

  this._resetDollar = function(dollar) {

    // place dollar towards the top left
    dollar.x = this.width * 2 - Math.random()*this.width*1.75;
    dollar.y = -10;
    dollar.z = Math.random()*200;
    if (dollar.x > this.width) {
      dollar.x = this.width + 10;
      dollar.y = Math.random()*this.height/2;
    }
    // at the start, the dollar can be anywhere
    if (this.timer == 0) {
      dollar.y = Math.random()*this.height;
    }

    // Choose axis of rotation.
    // If axis is not X, chose a random static x-rotation for greater variability
    dollar.rotation.speed = Math.random()*10;
    var randomAxis = Math.random();
    if (randomAxis > 0.5) {
      dollar.rotation.axis = 'X';
    } else if (randomAxis > 0.25) {
      dollar.rotation.axis = 'Y';
      dollar.rotation.x = Math.random()*180 + 90;
    } else {
      dollar.rotation.axis = 'Z';
      dollar.rotation.x = Math.random()*360 - 180;
      // looks weird if the rotation is too fast around this axis
      dollar.rotation.speed = Math.random()*3;
    }

    // random speed
    dollar.xSpeedVariation = Math.random() * 0.8 - 0.4;
    dollar.ySpeed = Math.random() + 1.5;

    return dollar;
  }

  this._updateDollar = function(dollar) {
    var dollarWindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, dollar.y);

    var xSpeed = dollarWindSpeed + dollar.xSpeedVariation;
    dollar.x -= xSpeed;
    dollar.y += dollar.ySpeed;
    dollar.rotation.value += dollar.rotation.speed;

    var t = 'translateX( ' + dollar.x + 'px ) translateY( ' + dollar.y + 'px ) translateZ( ' + dollar.z + 'px )  rotate' + dollar.rotation.axis + '( ' + dollar.rotation.value + 'deg )';
    if (dollar.rotation.axis !== 'X') {
      t += ' rotateX(' + dollar.rotation.x + 'deg)';
    }
    dollar.el.style.webkitTransform = t;
    dollar.el.style.MozTransform = t;
    dollar.el.style.oTransform = t;
    dollar.el.style.transform = t;
    dollar.el.setAttribute("id", "testID");

    // reset if out of view
    if (dollar.x < -10 || dollar.y > this.height + 10) {
      this._resetDollar(dollar);
    }
  }

  this._updateWind = function() {
    // wind follows a sine curve: asin(b*time + c) + a
    // where a = wind magnitude as a function of dollar position, b = wind.duration, c = offset
    // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

    if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

      this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
      this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
      this.options.wind.start = this.timer;

      var screenHeight = this.height;

      this.options.wind.speed = function(t, y) {
        // should go from full wind speed at the top, to 1/2 speed at the bottom, using dollar Y
        var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
        return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
      }
    }
  }
}

DollarScene.prototype.init = function() {

  for (var i = 0; i < this.options.numDollars; i++) {
    var dollar = {
      el: document.createElement('div'),
      x: 0,
      y: 0,
      z: 0,
      rotation: {
        axis: 'X',
        value: 0,
        speed: 0,
        x: 0
      },
      xSpeedVariation: 0,
      ySpeed: 0,
      path: {
        type: 1,
        start: 0,

      },
      image: 1
    };
    this._resetDollar(dollar);
    this.dollars.push(dollar);
    this.world.appendChild(dollar.el);
  }

  this.world.className = 'dollar-scene';
  this.viewport.appendChild(this.world);

  // set perspective
  this.world.style.webkitPerspective = "400px";
  this.world.style.MozPerspective = "400px";
  this.world.style.oPerspective = "400px";
  this.world.style.perspective = "400px";
  
  // reset window height/width on resize
  var self = this;
  window.onresize = function(event) {
    self.width = self.viewport.offsetWidth;
    self.height = self.viewport.offsetHeight;
  };
}

DollarScene.prototype.render = function() {
  this._updateWind();
  for (var i = 0; i < this.dollars.length; i++) {
    this._updateDollar(this.dollars[i]);
  }

  this.timer++;

  requestAnimationFrame(this.render.bind(this));
}

// start up dollar scene
var dollarContainer = document.querySelector('.falling-dollars'),
    dollars = new DollarScene(dollarContainer);

function removeFirstChildElement(parentID) {
  var parentElem = document.getElementById(parentID);
  parentElem.removeChild(parentElem.childNodes[0]);
}

// *** REMOVING PARENT OF DIVS NOT ENOUGH. 
//WHEN PARENT IS CREATED AGAIN, PREV DIVS ARE STILL THERE
// Need to loop through all indiv divs (dollars) and remove each of them

function stopAnimation() {
  removeFirstChildElement("falling-dollars-wrapper");
}

function startAnimation() {
  dollars.init();
  dollars.render();
}




