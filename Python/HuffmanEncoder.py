from node import Node

def frequencyMap(text):
	map = {}
	for char in text:
		if char in map:
			map[char] += 1
		else:
			map[char] = 1
	return map

def sortAndCreateNodes(freqMap):
	sortable = []
	for obj in freqMap:
		sortable.append([obj, freqMap[obj]])
	sortable.sort(key=lambda x: x[1])
	nodes = list(map(Node, sortable))
	return nodes

def minHeap(nodes):
	while len(nodes) >= 2:
		one = nodes.pop(0)
		two = nodes.pop(0)
		total = one.data[1] + two.data[1]
		if one.data[1] <= two.data[1]:
			nodes.append(Node(['',total], one, two))
		else:
			nodes.append(Node(['',total], two, one))
		nodes.sort(key=lambda x: x.data[1])
	return nodes[0]

def mapPrefixes(map, root, path=''):
	if root.left is None and root.right is None:
		map[root.data[0]] = path
	else:
		mapPrefixes(map, root.left, path+'0')
		mapPrefixes(map, root.right, path+'1')

def generatePrefixes(tree):
	prefixes = {}
	mapPrefixes(prefixes, tree)
	return prefixes

def createByteArray(text):
	bArr = bytearray()
	holder = '00000000'
	for x in range(0, len(text), 8):
		chunk = text[x:x+8]
		if len(chunk) < 8:
			chunk = chunk + holder[len(chunk):]
		bArr.append(int(chunk, 2))
	return bArr


def writeFileHeader(freqMap):
	result = ''
	for char in freqMap:
		result += (char + str(freqMap[char]) + '_')
	result = result[:len(result) - 1]
	return result
	
def encodeString(text):
	result = ''
	data = text + '■'
	freqMap = frequencyMap(data)
	tree = minHeap(sortAndCreateNodes(freqMap))
	prefixes = generatePrefixes(tree)
	for char in data:
		result += prefixes[char]
	byteArr = createByteArray(result)
	header = writeFileHeader(freqMap)
	return {'string': result, 'tree': tree, 'byteArr': byteArr, 'header': header}




