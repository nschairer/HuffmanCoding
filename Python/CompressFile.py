from HuffmanEncoder import encodeString
import os

directory = os.getcwd()


with open('file.txt', 'r') as mFile:
	data = mFile.read()
	huffData = encodeString(data)
	f = open('binaryFile', 'wb')
	h = open('header', 'w')
	f.write(huffData['byteArr'])
	h.write(huffData['header'])
	f.close()