const encode = require('./huffmanEncoder');
const fs = require('fs');
const path = require('path');

const huffObj = encode('Data compression using Huffman Coding, currently completed an encoder in JavaScript. Capable of compressing small strings, not optimized for paragraphs or files yet. I would like to continue to grow this repository to support many languages and to be able to compress large text files and more.');
function writeFile() {
	fs.writeFile(path.join(__dirname,'binaryfile'),new Buffer(huffObj.byteArray), function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log('File compressed: Writing Key');
			fs.writeFile(path.join(__dirname,'fileKey'), new Buffer(huffObj.encodedTree), function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log('Key compressed: Ready for decoding');
				}
			});
		}
	});
}

writeFile();