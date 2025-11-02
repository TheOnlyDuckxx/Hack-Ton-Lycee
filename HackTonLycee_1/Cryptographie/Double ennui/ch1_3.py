import os
from Crypto.Util.number import bytes_to_long, getStrongPrime

def custom_encrypt(value, secret):
    return value ^ secret

secret = os.urandom(16)  
secret_int = int.from_bytes(secret, 'big') 
flag = "HackTonLycee{This_is_a_fake_flag}".encode()
e = 3
p = getStrongPrime(1024, e=e)
q = getStrongPrime(1024, e=e)
n = p * q
phi = (p - 1) * (q - 1)


enc_phi = custom_encrypt(phi, secret_int)


enc_flag = pow(bytes_to_long(flag), e, n)

# Output
print(f"e = {e}")
print(f"n = {n}")
print(f"enc_phi = {enc_phi}")
print(f"enc_flag = {enc_flag}")
print(f"secret = {secret.hex()}")  
