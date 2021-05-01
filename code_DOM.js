//Created by Aurange

var can = document.getElementById("canvas");
var ctx = can.getContext("2d");

document.getElementById("in").onchange = function(){
	var file = new FileReader;
	file.onload = function(){
		var input = new Image;
		input.onload = function(){
			can.width = input.width;
			can.height = input.height;

			ctx.drawImage(input, 0, 0);

			var colors = ctx.getImageData(0, 0, can.width, can.height).data;

			document.getElementById("in").style.display = "none";
			document.getElementById("message").style.display = "block";

			worker = new Worker("code_Worker.js");
			worker.postMessage(colors);
			worker.onmessage = function(e){
				document.getElementById("in").style.display = "block";
				document.getElementById("canvas").style.display = "block";
				document.getElementById("message").style.display = "none";

				var len = e.data.length;
				var unit = Math.ceil(Math.sqrt(len));
				can.width = unit;
				can.height = unit;
				var cur;

				for(var i = 0; i < unit; i++){
					for(var j = 0; j < unit; j++){
						cur = (i * unit) + j;

						if(cur < len){
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
