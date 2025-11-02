from Crypto.Cipher import AES

open('flag.png.enc', 'wb').write(
    AES.new(b'sup3rrr s3cr3ttt', AES.MODE_CTR).encrypt(open('flag.png', 'rb').read())
)
