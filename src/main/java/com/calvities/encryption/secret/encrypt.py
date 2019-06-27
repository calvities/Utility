#coding=utf-8
import base64
import json
import rsa
import urllib.request


def Byte( Value ):
	if(type(Value) == type('')):
		return ord(Value[0])
	return Value

def bcd2asc(inBcd):
	b = []
	# tmpAsc2 = [(str(Byte(i))) for i in inBcd ]
	# print(tmpAsc2)

	tmpAsc = [(str((Byte(i)&0xf0)>>4), str((Byte(i)&0x0f))) for i in inBcd ]
	for i in range(len(tmpAsc)):
		for j in range(len(tmpAsc[0])):
			b.append(tmpAsc[i][j])
	
	for i in range(len(b)):
		value = b[i]
		if int(value)==10: b[i] = chr(ord('a'))
		if int(value)==11: b[i] = str('b')
		if int(value)==12: b[i] = str('c')
		if int(value)==13: b[i] = str('d')
		if int(value)==14: b[i] = str('e')
		if int(value)==15: b[i] = str('f')

	rStr = ''
	for i in range(len(b)):
		rStr += b[i]
	
	return rStr


key_url = "http://IP:PORT/IFCSI/public/getPublicKey.xhtml"
login_url = "http://IP:PORT/IFCSI/public/login.xhtml"
user = ""
password = ""

if __name__ == '__main__':
	res_data = urllib.request.urlopen(key_url)
	res = res_data.read()
	key_res = json.loads(res)
	public_key_str = key_res.get("data")

	public_key = rsa.PublicKey.load_pkcs1_openssl_der(base64.b64decode(public_key_str))
	encrypt_password = rsa.encrypt(password.encode("utf-8"), public_key)
	encrypt_password_str = bcd2asc(encrypt_password)
	test_data = '{"data":{"userName":"%s", "passWord":"%s", "publicKey":"%s"}}'% (user, encrypt_password_str, public_key_str)
	req = urllib.request.urlopen(url = login_url, data=test_data.encode('utf-8'))
	res = req.read()
	print(res)

