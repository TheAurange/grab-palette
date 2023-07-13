//Created by Aurange

"use strict";

self.onmessage = function(e){
  let uniqueColors = new Set(), len = e.length;

  console.log(`The length of the array of colors is: ${len}.`);

  for(let i = 0; i < len; i += 4){
    uniqueColors.add(`${e[i]}, ${e[i + 1]}, ${e[i + 2]}, ${e[i + 3]}`);
  }

  postMessage(Array.from(uniqueColors).sort());
}
