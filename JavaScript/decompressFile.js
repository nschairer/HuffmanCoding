const fs = require('fs');
const os = require('os');
const path = require('path');


function readFile(name) {
	const readStream = fs.createReadStream(path.join(__dirname, name));
	readStream.on('data', function(chunk) {
		console.log(new Uint8Array(chunk));
		let myString = '';
		let holder = '00000000'
		for (let i=0; i<chunk.byteLength; i++) {
            let bString = chunk[i].toString(2);
            bString = holder.substr(bString.length) + bString;
            myString += bString;
        }
		console.log(myString);
	});
}

readFile('binaryfile');