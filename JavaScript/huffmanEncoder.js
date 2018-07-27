const Node = require('./Node').Node;

function frequencyMap(text) {
	let obj = {};
	for (let char of text) {
		obj[char] = obj[char] + 1 || 1
	}
	return obj;
}

function mapAndSort(text) {
	let map = frequencyMap(text);
	//have to make the tree after the map
	const sortable = [];
	for(let obj in map) {
		sortable.push([obj, map[obj]]);
	}
	sortable.sort((x,y) => x[1] - y[1]);
	const nodes = sortable.map((x) => new Node(x))
	return nodes;
	
}

function minHeap(nodes) {
	while(nodes.length >= 2) {
		let one = nodes.shift();
		let two = nodes.shift();
		let sum = one.data[1] + two.data[1];
		if (one.data[1] <= two.data[1]) {
			nodes.push(new Node(['',sum], one, two));
		} else {
			nodes.push(new Node(['',sum], two, one));
		}
		nodes.sort((x,y) => x.data[1] - y.data[1]);
	}
	return nodes[0];
}

function mapPrefixes(map, root, path='') {
	if (!root.left && !root.right) {
		map[root.data[0]] = path;
	} else {
		mapPrefixes(map, root.left, path+'0');
		mapPrefixes(map, root.right, path+'1');
	}
}

function generatePrefixes(text, tree) {
	const prefixes = {}
	mapPrefixes(prefixes,tree);
	//console.log(prefixes);
	return prefixes;
}

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
	//console.log(byteArray);
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
	return byteArray;
}


function encodeString(text) {
	let result = ''
	const tree = minHeap(mapAndSort(text));
	const prefixes = generatePrefixes(text, tree);
	for(let char of text) {
		for(let code in prefixes) {
			if (char === code) {
				result += prefixes[code];
			}
		}
	}
	const encodedTree = encodeTree(tree);
	const byteArray = compress(result);
	//console.log(result);
	return {huffmanString: result, key: tree, byteArray: byteArray, encodedTree: encodedTree};
}

module.exports = encodeString;








