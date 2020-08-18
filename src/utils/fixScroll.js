export default function(layer, layerChildren) {
  let targetY;
  let layerChildAddEventListener = (layerChild) => {
    layerChild.addEventListener("touchstart", function(e) {
      targetY = Math.floor(e.targetTouches[0].clientY);
    });

    layerChild.addEventListener(
      "touchmove",
      function(e) {
        var newTargetY = Math.floor(e.targetTouches[0].clientY),
          sTop = layerChild.scrollTop,
          sH = layerChild.scrollHeight,
          lyBoxH = layerChild.clientHeight;

        if (sTop <= 0 && newTargetY - targetY > 0) {
          e.preventDefault();
        } else if (sTop >= sH - lyBoxH && newTargetY - targetY < 0) {
          e.preventDefault();
        }
      },
      false
    );
  };

  layer.style.display = "block";

  layer.addEventListener(
    "touchmove",
    function(e) {
      e.stopPropagation();
      if (e.target == layer) e.preventDefault();
    },
    false
  );

  layerChildren.forEach((child) => {
    layerChildAddEventListener(child);
  });
}
