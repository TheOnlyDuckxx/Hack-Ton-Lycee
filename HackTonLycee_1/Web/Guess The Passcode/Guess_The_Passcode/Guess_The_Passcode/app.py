from flask import Flask, request, jsonify, render_template
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_password', methods=['POST'])
def check_password():
    data = request.json  
    guess = data.get('guess')  
    random.seed(guess)
    generated_random = random.randint(0, 9999)
    return jsonify({'status': 'success', 'generated_random': generated_random, 'guess': guess})

@app.route('/check_guess', methods=['POST'])
def check_guess():
    data = request.get_json()
    guess = data.get('guess')

    n = ["6", "k", "8", "t", "d", "r", "c", "4", "7", "q", "w", "m", "x", "3"]
    random.shuffle(n)
    
    if guess == ''.join(n):
        print("This is your flag: HackTonLycee{Fake_Flag}")
        return jsonify({"message": "Flag obtained", "flag": "HackTonLycee{Fake_Flag}"}), 200
    else:
        return jsonify({"message": "Guess does not match the flag."}), 400

if __name__ == '__main__':
    app.run()
