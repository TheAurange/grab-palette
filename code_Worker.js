//Created by Aurange

"use strict";

self.onmessage = function(e){
  let uniqueColors = new Set(), len = e.data.length;

  for(let i = 0; i < len; i += 4){
    uniqueColors.add(`${e.data[i]}, ${e.data[i + 1]}, ${e.data[i + 2]}, ${e.data[i + 3]}`);
  }

  postMessage(Array.from(uniqueColors).sort((a, b) => {
    let splitA = a.split(", "),
        splitB = b.split(", ");

    if(Number(splitA[0]) > Number(splitB[0])) return 1;
    else if(Number(splitA[0]) < Number(splitB[0])) return -1;

    if(Number(splitA[1]) > Number(splitB[1])) return 1;
    else if(Number(splitA[1]) < Number(splitB[1])) return -1;

    if(Number(splitA[2]) > Number(splitB[2])) return 1;
    else if(Number(splitA[2]) < Number(splitB[2])) return -1;

    if(Number(splitA[3]) > Number(splitB[3])) return 1;
    else if(Number(splitA[3]) < Number(splitB[3])) return -1;

    return 0;
  }));
}
