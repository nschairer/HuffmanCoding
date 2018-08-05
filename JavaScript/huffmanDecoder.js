const encodeString = require('./huffmanEncoder');

//const huffmanObj = encodeString('Data compression using Huffman Coding, currently completed an encoder in JavaScript. Capable of compressing small strings, not optimized for paragraphs or files yet. I would like to continue to grow this repository to support many languages and to be able to compress large text files and more.');


//Going to switch to searching prefix table instead for optimization when decoding, 
//reference python repo for example
function traversal(string, tree) {
	let refTree = tree;
	let arr = string.split('');
	let result = '';
	let index = 0;
	while(arr.length) {
		if(!refTree.left && !refTree.right) {
			if(refTree.data[0] === '■') {
				break;
			} else {
				result+=refTree.data[0];
				process.stdout.write(refTree.data[0]);
				refTree = tree;
				arr = arr.slice(index);
				index = 0;
			}
		}
		if(arr[index] === '0') {
			refTree = refTree.left;
		} else {
			refTree = refTree.right;
		}
		index++;
	}
	console.log(' ');
}

function decode(obj) {
	const tree = obj.key;
	const data = obj.huffmanString;
	traversal(data, tree);
}

//decode(huffmanObj);
module.exports = traversal;