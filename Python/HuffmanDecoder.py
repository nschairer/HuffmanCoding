from HuffmanEncoder import encodeString

obj = encodeString('My name is noah schairer')

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
	print(result)

traversal(obj['string'], obj['tree'])