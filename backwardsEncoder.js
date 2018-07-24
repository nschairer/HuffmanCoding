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
	sortable.sort((x,y) => x[1] - y[1]).reverse();
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
		nodes.sort((x,y) => y.data[1] - x.data[1]);
	}
	return nodes[0];
}

function traversal(char,freq,tree) {
	let prefix = ''
	let node = tree;
	//only character nodes have null left and rights
	while(node.left && node.right) {
		if(char === node.data[0]) {
			break;
		}

		if (node.left.data[1] === freq && node.left.data[0] != char) {
			prefix+='1'
			node = node.right;
			continue;
		}

		if (node.left.data[1] >= freq) {
			prefix+='0';
			node = node.left;
			continue;
		} else {
			prefix+='1'
			node = node.right;
			continue;
		}
	}

	return prefix;
}

function generatePrefixes(text) {
	let map = frequencyMap(text);
	let tree = minHeap(mapAndSort(text));
	let prefixes = {}
	for(obj in map) {
		prefixes[obj] = traversal(obj,map[obj], tree);
	}
	console.log(prefixes);
	return prefixes;
}


function encodeString(text) {
	let result = ''
	let prefixes = generatePrefixes(text);
	for(let char of text) {
		for(let code in prefixes) {
			if (char === code) {
				result += prefixes[code];
			}
		}
	}
	return result;
}

console.log(encodeString('aaaaabbccaaa'));












