const encode = require('./huffmanEncoder');
const fs = require('fs');
const path = require('path');

const huffObj = encode('Noah Schairer');
console.log(huffObj.huffmanString);
function writeFile() {
	fs.writeFile(path.join(__dirname,'binaryfile'),new Buffer(huffObj.byteArray), function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log('File compressed: Writing Key');
			fs.writeFile(path.join(__dirname, 'fileKey'),writeHeader(huffObj.header), function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log('Key compressed: Ready for decoding');
				}
			});
		}
	});
}
function writeHeader(map) {
	let keyString = '';
	for(let char in map) {
		keyString += (char + map[char] + '_');
	}
	keyString = keyString.slice(0, keyString.length - 1);
	return keyString;
}

writeFile();