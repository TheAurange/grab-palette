//Created by Aurange

"use strict";

document.querySelector("#in").onchange = function(){
  let can = document.querySelector("#canvas"),
      download = document.querySelector("#download"),
      count = document.querySelector("#count"),
      ctx = can.getContext("2d"),
      file = new FileReader();

  file.onload = function(){
    let input = new Image();

    input.onload = function(){
      let input = document.querySelector("#in"),
          br = document.querySelector("br"),
          message = document.querySelector("#message"),
          colors,
          worker = new Worker("code_Worker.js");

      can.width = input.width;
      can.height = input.height;

      ctx.drawImage(input, 0, 0);

      colors = ctx.getImageData(0, 0, can.width, can.height).data;

      input.style.display = "none";
      br.style.display = "none";
      message.style.display = "block";

      worker.postMessage(colors);

      worker.onmessage = function(e){
        let len = e.data.length,
            unit = Math.ceil(Math.sqrt(len)),
            cur,
            file = new Blob([
              e.data.join("\n")
            ], {
              type: "plain/text"
            });

        input.style.display = "block";
        br.style.display = "inline";
        message.style.display = "none";
        can.style.display = "block";
        download.style.display = "block";

        can.width = unit;
        can.height = Math.ceil(len / unit);

        for(let i = 0; i < unit; i++){
          for(let j = 0; j < unit; j++){
            cur = (i * unit) + j;

            if(cur < len){
              ctx.fillStyle = "rgba(" + e.data[cur] + ")";
              ctx.fillRect(j, i, 1, 1);
            }
          }
        }

        download.href = URL.createObjectURL(file);

        count.innerText = "Total Colors: " + Number(len).toLocaleString();

        worker.terminate();
      };
    }

    input.src = file.result;
  }

  file.readAsDataURL(this.files[0]);
  
  this.value = null;
  this.blur();

  can.style.display = "none";
  download.style.display = "none";

  count.innerText = "";
};
