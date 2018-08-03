from HuffmanDecoder import traversal
from HuffmanEncoder import minHeap
from node import Node


def sortAndCreateNodes(text):
	arr = text.split('_')
	arr.sort(key=lambda x: int(x[1:]))
	nodes = []
	for obj in arr:
		nodes.append(Node([obj[0], int(obj[1:])]))
	return nodes

with open('header', 'r') as rFile:
	data = rFile.read()
	tree = minHeap(sortAndCreateNodes(data))
	bString = ''
	holder = '00000000'
	with open('binaryFile', 'rb') as bFile:
		bData = bytearray(bFile.read())
		for byte in bData:
			bString += format(byte, '08b')
	traversal(bString, tree)