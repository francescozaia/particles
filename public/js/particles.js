import { loadSceneInterface } from './scene';

window.touched = false;
window.touchX = 0;
window.touchY = 0;
let touchID;
let tw;
let th;
let tratio;

let trackTouchStart;
let trackTouchMove;
let trackTouchEnd;

let trackMouseDown;
let trackMouseMove;
let trackMouseUp;

let trackStart;
let trackMove;
let trackEnd;

let trackInit;

/*
 HANDLE TOUCH INPUT
 */

trackTouchStart = function tTS(event) {
  if (!window.touched) {
    const t = event.changedTouches[0];
    touchID = t.identifier;
    trackStart(t.pageX, t.pageY);
  }
  event.preventDefault();
  return true;
};

trackTouchMove = function tTM(event) {
  if (window.touched) {
    const ts = event.changedTouches;
    let n = ts.length;
    let t;
    while (n--) {
      t = ts[n];
      if (t.identifier === touchID) {
        trackMove(t.pageX, t.pageY);
        break;
      }
    }
  }
  event.preventDefault();
  return true;
};

trackTouchEnd = function tTE(event) {
  if (window.touched) {
    const ts = event.changedTouches;
    let n = ts.length;
    let t;
    while (n--) {
      t = ts[n];
      if (t.identifier === touchID) {
        trackEnd();
        break;
      }
    }
  }
  event.preventDefault();
  return true;
};

/*
 HANDLE MOUSE INPUT
 */

trackMouseDown = function tMD(event) {
  if (!window.touched) {
    trackStart(event.pageX, event.pageY);
  }

  event.preventDefault();
  return true;
};

trackMouseMove = function tMM(event) {
  if (window.touched) {
    trackMove(event.pageX, event.pageY);
  }

  event.preventDefault();
  return true;
};

trackMouseUp = function tMU(event) {
  if (window.touched) {
    trackEnd();
  }

  event.preventDefault();
  return true;
};

/*
 ABSTRACT INPUT HANDLING
 */

trackStart = function tS(x, y) {
  window.touched = true;
  trackMove(x, y);
};

trackMove = function tM(x, y) {
  window.touchX = (x / tw - 1) * tratio;
  window.touchY = -(y / th - 1);
};

trackEnd = function tE() {
  window.touched = false;
};


trackInit = function tI() {
  // set-up touch interaction
  document.addEventListener('touchstart', trackTouchStart, false);
  document.addEventListener('touchmove', trackTouchMove, false);
  document.addEventListener('touchend', trackTouchEnd, false);
  // set-up mouse interaction
  document.addEventListener('mousedown', trackMouseDown, false);
  document.addEventListener('mousemove', trackMouseMove, false);
  document.addEventListener('mouseup', trackMouseUp, false);

  tw = window.innerWidth / 2;
  th = window.innerHeight / 2;
  tratio = tw / th;
};

addEventListener('load', trackInit, false);

/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function raf() {
    return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function cb(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  }());
}

window.onload = loadSceneInterface;
