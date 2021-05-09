//Created by Aurange

"use strict";

document.getElementById("in").onchange = function() {
  let can = document.getElementById("canvas");
  let ctx = can.getContext("2d");
  let file = new FileReader();
  file.onload = function() {
    let input = new Image();
    input.onload = function() {
      can.width = input.width;
      can.height = input.height;

      ctx.drawImage(input, 0, 0);

      let colors = ctx.getImageData(0, 0, can.width, can.height).data;

      document.getElementById("in").style.display = "none";
      document.getElementById("message").style.display = "block";

      let worker = new Worker("code_Worker.js");
      worker.postMessage(colors);
      worker.onmessage = function(e) {
        document.getElementById("in").style.display = "block";
        document.getElementById("canvas").style.display = "block";
        document.getElementById("message").style.display = "none";

        let len = e.data.length;
        let unit = Math.ceil(Math.sqrt(len));
        can.width = unit;
        can.height = unit;
        let cur;

        for (let i = 0; i < unit; i++) {
          for (let j = 0; j < unit; j++) {
            cur = (i * unit) + j;

            if (cur < len) {
              ctx.fillStyle = "rgba(" + e.data[cur] + ")";
              ctx.fillRect(j, i, 1, 1);
            }
          }
        }

        worker.terminate();
        worker = undefined;
      };
    }

    input.src = file.result;
  }

  file.readAsDataURL(this.files[0]);
  this.value = null;
  this.blur();
  document.getElementById("canvas").style.display = "none";
};
