from HuffmanEncoder import encodeString, generatePrefixes

#took about 5 seconds with current 16KB file
def traversal(string, tree):
	ref = tree
	arr = list(string)
	result = ''
	index = 0
	while len(arr) > 0:
		if ref.left is None and ref.right is None:
			if ref.data[0] == '■':
				break
			else:
				result += ref.data[0]
				ref = tree
				arr = arr[index:]
				index = 0
		if arr[index] == '0':
			ref = ref.left
		else:
			ref = ref.right
		index += 1
	return(result)

def prefixArray(tree):
	prefixes = generatePrefixes(tree)
	arr = []
	for obj in prefixes:
		arr.append([obj, prefixes[obj]])
	arr.sort(key=lambda x: len(x[1]))
	return arr


#takes 0.3 seconds with current 16KB
#takes 1.64 seconds for 140KB
#takes 16.54 seconds for 1.4MB
def decodeFromArray(tree, string):
	prefixArr = prefixArray(tree)
	result = ''
	temp = ''
	index = 0
	for char in string:
		temp += char
		for obj in prefixArr:
			if temp == obj[1]:
				if obj[0] == '■': break
				result += obj[0]
				temp = ''
				break
	print(result)
