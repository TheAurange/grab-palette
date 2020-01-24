//Created by Auragar

self.onmessage = function(e){
	var uniqueColors = [];

	for(var i = 0, len = e.data.length; i < len; i += 4){
		uniqueColors.push(e.data[i] + "," + e.data[i + 1] + "," + e.data[i + 2] + "," + e.data[i + 3]);
	}

	postMessage(Array.from(new Set(uniqueColors)).sort());
}