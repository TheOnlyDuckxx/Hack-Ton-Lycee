const buttons = document.querySelectorAll('button');
const span = document.getElementsByTagName('span');
const spanContainer = document.querySelector('.spanContainer');
const parent = document.getElementById('parent');
const cancel = document.querySelector('.cancel');
const emergency = document.querySelector('.emergency');
const first = document.querySelector('#first');
const screen = document.querySelector('.screen');
const touch = document.querySelector('.touch');
const subText = document.querySelectorAll('.letters');
const zero = document.querySelector('.zero');
const phone = document.getElementById('phone');
let clicks = 0;
let guess = '';

// Function to send guess to Flask and handle the response
async function GuessTheCode(guess) {
  try {
    const response = await fetch('/check_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ guess: guess })  // Send the guess directly
    });

    // Check if the response is okay (status 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const flaskGeneratedRandom = data.generated_random; // Get generated random number

    console.log(`Flask generated random number: ${flaskGeneratedRandom}`);
    console.log(`Your guess: ${guess}`);

    const guessResponse = await fetch('/check_guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ guess: guess })  // Send the guess directly
    });
    if (guessResponse.ok) {
      const guessData = await guessResponse.json();
      console.log(guessData.message);  // Display the message from the server
      if (guessData.flag) {
        console.log(`Flag: ${guessData.flag}`);
      }
    } else {
      const errorData = await guessResponse.json();
      console.log(errorData.message);  // Display the error message
    }
    // Compare the guess with the generated random number in JS
    if (parseInt(guess) === flaskGeneratedRandom) {
      document.body.style.background = 'radial-gradient(white, #6F6E6E)';
      screen.innerHTML = '<h2>YOU SHALL NOT PASS</h2>';
      screen.style.backgroundColor = 'black';
      screen.style.color = 'white';
      screen.style.textAlign = 'center';
    } else {
      console.log('Your guess does not match the generated random number.');
      // Optional: Reset the input if needed
      changeBgColor('transparent', 0);
      changeBgColor('transparent', 1);
      changeBgColor('transparent', 2);
      changeBgColor('transparent', 3);
      guess = '';  // Clear guess after comparison
      clicks = 0;  // Reset clicks after guess
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to change background color of spans
function changeBgColor(color, number) {
  span[number].style.backgroundColor = color;
}

// Event listener for button clicks
parent.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    changeBgColor('white', clicks);
    guess += e.target.className; // Update guess based on button clicked
    clicks += 1;  // Increment clicks
    console.log(guess);
    cancel.textContent = 'Delete';
  } else if (e.target.className === 'cancel') {
    if (clicks > 0) {
      clicks -= 1;
      changeBgColor('transparent', clicks);
      guess = guess.slice(0, -1);  // Remove the last character from guess
    }
  } else if (e.target.className === 'emergency') {
    emergency.style.display = 'none';
    screen.style.background = 'white';
    touch.style.color = 'red';
    cancel.style.color = 'black';
    phone.style.display = 'inline-flex';
    for (let i = 0; i < 10; i++) {
      buttons[i].style.backgroundColor = '#D8D6D6';
      buttons[i].style.color = 'black';
      subText[i].style.backgroundColor = '#D8D6D6';
      subText[i].style.color = 'black';
    }
  }

  // Send guess to Flask only after 4 button clicks
  if (clicks === 4) {
    console.log(`Final guess before sending: ${guess}`);
    GuessTheCode(guess);  // Send the constructed guess
    changeBgColor('transparent', 0);
    changeBgColor('transparent', 1);
    changeBgColor('transparent', 2);
    changeBgColor('transparent', 3);
    guess = '';  // Clear guess after sending
    clicks = 0;  // Reset clicks after sending
  }
});
