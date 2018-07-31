const encodeString = require('./huffmanEncoder');

//const huffmanObj = encodeString('AAAAABBBCC');

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
	console.log(result);
}

function decode(obj) {
	const tree = obj.key;
	const data = obj.huffmanString;
	traversal(data, tree);
}

//decode(huffmanObj);
module.exports = traversal;