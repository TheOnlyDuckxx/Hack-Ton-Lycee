import math

# Chiffre obtenu du fichier out.txt
cipher = [108874, 197599, 205831, 240439, 148186, 258751, 254110, 121306, 
          307471, 205831, 214231, 214231, 317719, 50431, 205831, 218494, 
          205831, 68239, 56794, 63535, 52510, 65866, 58999, 197599, 
          214231, 201694, 65866, 68239, 214231, 52510, 205831, 214231, 
          218494, 54631, 52510, 48394, 48394, 54631, 63535, 48394, 
          58999, 201694, 205831, 201694, 52510, 52510, 201694, 65866, 328135]

# Essayer toutes les combinaisons possibles pour a et b
for a in range(1, 26):
    for b in range(1, 26):
        decoded_chars = []
        for y in cipher:
            if y - b >= 0 and (y - b) % a == 0:  # Vérifie que l'on peut trouver x
                x_squared = (y - b) // a
                x = math.isqrt(x_squared)  # Utilise la racine carrée entière
                if x * x * a + b == y:  # Vérifie que c'est un carré parfait
                    decoded_chars.append(chr(x))
                else:
                    decoded_chars.append('?')  # Si ce n'est pas un bon résultat
            else:
                decoded_chars.append('?')
        
        decoded_flag = ''.join(decoded_chars)
        if "HackTonLycee" in decoded_flag:  # Recherche d'une indication dans le flag
            print(f"Test avec a={a}, b={b}: {decoded_flag}")