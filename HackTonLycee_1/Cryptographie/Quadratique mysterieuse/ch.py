import random

a = random.randint(1, 25)  
b = random.randint(1, 25)  

def func(x):
    return a * x**2 + b

flag = "HackTonLycee{Fake_Flag}"
cipher = [func(ord(c)) for c in flag]


with open("out.txt", "w") as f:
    f.write(f"Encoded cipher = {cipher}\n") 
f.close()

