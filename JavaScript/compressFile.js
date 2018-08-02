const encode = require('./huffmanEncoder');
const fs = require('fs');
const path = require('path');

function writeFile(huffObj) {
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

fs.readFile(path.join(__dirname, 'file'),'utf8', function(err, data) {
		if(err) {
			console.log(err);
			return null;
		} else {
			const huffObj = encode(data);
			writeFile(huffObj);
		}
});