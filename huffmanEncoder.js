class Node {
	constructor(data, left=null, right=null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

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

function generatePrefixes(text) {
	const tree = minHeap(mapAndSort(text));
	const prefixes = {}
	mapPrefixes(prefixes,tree);
	console.log(prefixes);
	return prefixes;
}


function encodeString(text) {
	let result = ''
	const prefixes = generatePrefixes(text);
	for(let char of text) {
		for(let code in prefixes) {
			if (char === code) {
				result += prefixes[code];
			}
		}
	}
	console.log(result);
	return result;
}
encodeString('noah');










