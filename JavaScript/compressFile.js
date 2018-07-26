const encode = require('./huffmanEncoder');
const fs = require('fs');
const os = require('os');
const path = require('path');

const huffObj = encode('Data compression using Huffman Coding, currently completed an encoder in JavaScript. Capable of compressing small strings, not optimized for paragraphs or files yet. I would like to continue to grow this repository to support many languages and to be able to compress large text files and more.');
//console.log(huffObj.huffmanString);

function mapTree(arr, root) {
	if (!root.left && !root.right) {
		arr.push('1' + root.data[0]);
	} else {
		arr.push('0')
		mapTree(arr, root.left);
		mapTree(arr, root.right);
	}
}

function encodeTree(tree) {
	const result = [];
	mapTree(result, tree);
	let string = result.join('');
	let binaryArr = [];
	let padding = '00000000';
	for(let char of string) {
		if (char !== '0' && char !== '1') {
			char = char.charCodeAt(0).toString(2);
		}
		char = padding.substr(char.length) +  char;
		binaryArr.push(char);
	}
	let index = 0;
	const byteArray = new Uint8Array(binaryArr.length);
	for(let byte of binaryArr) {
		byteArray[index] = parseInt(byte,2);
		index++;
	}
	console.log(byteArray);
	return byteArray;
}

function compress(string) {
	const size = 8;
	const byteArray = new Uint8Array(Math.ceil(string.length/8));
	let index = 0;
	let byte = 0;
	while(index < string.length) {
		//need to account for slices that are less than 8 in length and EOF marker and including the tree
		byteArray[byte] = parseInt(string.slice(index, index + size), 2);
		index+=size;
		byte++;
	}
	console.log(byteArray)
	fs.writeFile(path.join(__dirname,'binaryfile'),new Buffer(byteArray), function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log('File compressed: Writing Key');
			const huffmanTree = encodeTree(huffObj.key);
			fs.writeFile(path.join(__dirname,'fileKey'), new Buffer(huffmanTree), function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log('Key compressed: Ready for decoding');
				}
			});
		}
	});
}



compress(huffObj.huffmanString);
