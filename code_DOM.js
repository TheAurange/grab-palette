//Created by Aurange

"use strict";

document.getElementById("in").onchange = function(){
  let can = document.getElementById("canvas"), ctx = can.getContext("2d"), file = new FileReader();

  file.onload = function(){
    let input = new Image();

    input.onload = function(){
      can.width = input.width;
      can.height = input.height;

      ctx.drawImage(input, 0, 0);

      let colors = ctx.getImageData(0, 0, can.width, can.height).data, worker = new Worker("code_Worker.js");

      document.getElementById("in").style.display = "none";
      document.getElementById("message").style.display = "block";

      worker.postMessage(colors);

      worker.onmessage = function(e){
        let len = e.data.length, unit = Math.ceil(Math.sqrt(len)), cur, file = new Blob([e.data.join("\n")], {type: "plain/text"});

        document.getElementById("in").style.display = "block";
        document.getElementById("canvas").style.display = "block";
        document.getElementById("message").style.display = "none";
        document.getElementById("download").style.display = "block";

        can.width = unit;
        can.height = unit;

        for(let i = 0; i < unit; i++){
          for(let j = 0; j < unit; j++){
            cur = (i * unit) + j;

            if(cur < len){
              ctx.fillStyle = "rgba(" + e.data[cur] + ")";
              ctx.fillRect(j, i, 1, 1);
            }
          }
        }

        document.getElementById("download").href = URL.createObjectURL(file);

        document.getElementById("count").innerText = "Total Colors: " + Number(len).toLocaleString();

        worker.terminate();
      };
    }

    input.src = file.result;
  }

  file.readAsDataURL(this.files[0]);
  
  this.value = null;
  this.blur();

  document.getElementById("canvas").style.display = "none";
  document.getElementById("download").style.display = "none";
  document.getElementById("count").innerText = "";
};
