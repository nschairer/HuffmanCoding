from HuffmanDecoder import traversal, decodeFromPrefixTable
from HuffmanEncoder import minHeap
from node import Node
import time

start_time = time.time()


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
	
	decodeFromPrefixTable(tree, bString)

print("\n--- %s seconds ---" % (time.time() - start_time))
