const decode = require('./huffmanDecoder');
const fs = require('fs');
const path = require('path');
const Node = require('./Node').Node;

function sort(text) {
	const arr = text.split('_');
	console.log(text);
	const sorted = [];
	arr.forEach(function(item) {
		console.log(item);
		sorted.push([item[0], parseInt(item.slice(1))]);
	});
	sorted.sort((x,y) => x[1] - y[1]);
	const nodes = sorted.map((x) => new Node(x))
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

function sortHeader(string) {
	fs.readFile(path.join(__dirname, 'fileKey'),'utf8', function(err, data) {
		if(err) {
			console.log(err);
			return null;
		} else {
			const nodes = sort(data);
			decode(string, minHeap(nodes));
		}
	});
}

function readFile(name) {
	const readStream = fs.createReadStream(path.join(__dirname, name));
	readStream.on('data', function(chunk) {
		let myString = '';
		let holder = '00000000'
		for (let i=0; i<chunk.byteLength; i++) {
            let bString = chunk[i].toString(2);
            bString = holder.substr(bString.length) + bString;
            myString += bString;
        }
        sortHeader(myString);
	});
}

readFile('binaryFile');