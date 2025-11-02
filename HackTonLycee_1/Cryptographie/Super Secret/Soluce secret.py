from Crypto.Cipher import AES
from pwn import xor
import os

def decrypt_aes_ctr(ciphertext, key, nonce):
    cipher = AES.new(key, AES.MODE_CTR, nonce=nonce)
    plaintext = cipher.decrypt(ciphertext)
    return plaintext

def main():
    key = b'sup3rrr s3cr3ttt'
    ciphertext_file = 'flag.png.enc'
    output_file = 'recovered_flag.png'

    # Étape 1: Lire le fichier chiffré
    with open(ciphertext_file, 'rb') as f:
        ciphertext = f.read()

    # Étape 2: Définir le plaintext connu (en-tête PNG + premier chunk 'IHDR')
    known_plaintext_header = b'\x89PNG\r\n\x1a\n'
    known_plaintext_chunk_length = b'\x00\x00\x00\x0d'
    known_plaintext_chunk_type = b'IHDR'
    known_plaintext = known_plaintext_header + known_plaintext_chunk_length + known_plaintext_chunk_type

    # Étape 3: Récupérer le keystream initial (16 octets) en XORant le ciphertext avec le plaintext connu
    ciphertext_initial = ciphertext[:16]
    keystream_initial = xor(ciphertext_initial, known_plaintext)

    # Étape 4: Utiliser AES-ECB pour déchiffrer le keystream et obtenir le nonce + compteur
    cipher_ecb = AES.new(key, AES.MODE_ECB)
    nonce_plus_counter = cipher_ecb.decrypt(keystream_initial)

    # Étape 5: Supposer que le compteur initial est 0, donc le nonce est nonce_plus_counter
    nonce = nonce_plus_counter

    # Étape 6: Initialiser le cipher AES-CTR avec le nonce récupéré
    cipher_ctr = AES.new(key, AES.MODE_CTR, nonce=nonce[:8], initial_value=int.from_bytes(nonce[8:], byteorder='big'))

    # Étape 7: Déchiffrer l'intégralité du ciphertext
    plaintext = cipher_ctr.decrypt(ciphertext)

    # Étape 8: Enregistrer le plaintext déchiffré en tant qu'image PNG
    with open(output_file, 'wb') as f:
        f.write(plaintext)

if __name__ == "__main__":
    main()