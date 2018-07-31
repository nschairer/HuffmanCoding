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
	return prefixes;
}

function compress(string) {
	const size = 8;
	const byteArray = new Uint8Array(Math.ceil(string.length/8));
	let index = 0;
	let byte = 0;
	let holder = '00000000'
	while(index < string.length) {
		let slice = string.slice(index, index + size);
		if(slice.length < 8) {
			slice = slice + holder.substr(slice.length);
		}
		byteArray[byte] = parseInt(slice, 2);
		index+=size;
		byte++;
	}
	return byteArray;
}


function encodeString(text) {
	let result = ''
	const tree = minHeap(mapAndSort(text + '■'));
	const prefixes = generatePrefixes(text, tree);
	console.log(prefixes);
	const freqMap = frequencyMap(text + '■');
	for(let char of text) {
		for(let code in prefixes) {
			if (char === code) {
				result += prefixes[code];
			}
		}
	}
	const byteArray = compress(result);
	return {huffmanString: result, key: tree, byteArray: byteArray, header: freqMap};
}

module.exports = encodeString;








