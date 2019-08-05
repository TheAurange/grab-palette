//Created by Auragar

var iC = document.getElementById("inCanvas");
var iCtx = iC.getContext("2d");
var oC = document.getElementById("outCanvas");
var oCtx = oC.getContext("2d");

document.getElementById("in").onchange = function(){
	var fR = new FileReader;
	fR.onload = function(){
		var input = new Image;
		input.onload = function(){
			iC.width = input.width;
			iC.height = input.height;

			iCtx.drawImage(input, 0, 0);

			var iID = iCtx.getImageData(0, 0, iC.width, iC.height).data;
			var len = iID.length;
			var iPRGBAA = [];

			for(var i = 0; i < len; i += 4){
				iPRGBAA.push(iID[i] + "," + iID[i + 1] + "," + iID[i + 2] + "," + iID[i + 3]);
			}

			iPRGBAA = Array.from(new Set(iPRGBAA));
			var iPRGBAAL = iPRGBAA.length;
			oCU = Math.ceil(Math.sqrt(iPRGBAAL));
			oC.width = oCU;
			oC.height = oCU;
			var cur;

			for(var i = 0; i < oCU; i++){
				for(var j = 0; j < oCU; j++){
					cur = (i * oCU) + j;

					if(cur < iPRGBAAL){
						oCtx.fillStyle = "rgba(" + iPRGBAA[cur] + ")";
						oCtx.fillRect(j, i, 1, 1);
					}
				}
			}
		}

		input.src = fR.result;
	}

	fR.readAsDataURL(this.files[0]);
	this.value = null;
	this.blur();
};
