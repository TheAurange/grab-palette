//Created by Aurange

"use strict";

self.onmessage = function(e){
  let uniqueColors = [], len = e.data.length;

  for(let i = 0; i < len; i += 4){
    uniqueColors.push(e.data[i] + "," + e.data[i + 1] + "," + e.data[i + 2] + "," + e.data[i + 3]);
  }

  postMessage(Array.from(new Set(uniqueColors)).sort());
}
