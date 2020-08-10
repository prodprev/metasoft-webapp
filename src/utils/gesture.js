let startPoint;

function touchstart(event) {
  let e = event || window.event;
  startPoint = e.touches[0];
}

// function touchmove(event) {
//   let e = event || window.event;
//   e.preventDefault();
// }

function touchend(callback) {
  return function(event) {
    let e = event || window.event;
    let endPoint = e.changedTouches[0];
    let x = endPoint.clientX - startPoint.clientX;
    let y = endPoint.clientY - startPoint.clientY;
    let d = 20;

    if (Math.abs(x) > d) {
      if (x > 0) {
        if (Math.abs(x) > Math.abs(y)) {
          callback && callback("to-right");
          return;
        }
      } else {
        if (Math.abs(x) > Math.abs(y)) {
          callback && callback("to-left");
          return;
        }
      }
    }

    if (Math.abs(y) > d) {
      if (y > 0) {
        callback && callback("to-down");
      } else {
        callback && callback("to-up");
      }
    }
  };
}

export default {
  on: function(callback) {
    document.addEventListener("touchstart", touchstart);
    // document.addEventListener("touchmove", touchmove, { passive: false });
    document.addEventListener("touchend", touchend(callback));
  },
  off: function() {
    document.removeEventListener("touchstart", touchstart);
    // document.removeEventListener("touchmove", touchmove, { passive: false });
    document.removeEventListener("touchend", touchend());
  },
};
