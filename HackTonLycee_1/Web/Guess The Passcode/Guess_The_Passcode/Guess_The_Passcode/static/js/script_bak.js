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
const password = '3665'; 
let clicks = 0;
let guess = '';

function changeBgColor(color, number) {
  span[number].style.backgroundColor = color;
  span[number].style.backgroundColor = color;
  span[number].style.backgroundColor = color;
  span[number].style.backgroundColor = color;
}

parent.addEventListener('click', (e) => {
  if(e.target.tagName === 'BUTTON') {
    changeBgColor('white', clicks);
    clicks += 1;
    guess += e.target.className;
    console.log(guess);
    cancel.textContent = 'Delete';
  }  else if(e.target.className === 'cancel') {
       clicks -= 1;
       changeBgColor('transparent', clicks);
       guess = guess.slice(0, -1);
  }  else if (e.target.className === 'emergency')  {
       emergency.style.display = 'none';
       screen.style.background = 'white';
       touch.style.color = 'red';
       cancel.style.color = 'black';
       phone.style.display = 'inline-flex';
       for(let i = 0; i<10; i++) {
         buttons[i].style.backgroundColor = '#D8D6D6';
         buttons[i].style.color = 'black';
         subText[i].style.backgroundColor = '#D8D6D6';
         subText[i].style.color = 'black';
       }
    }
  
  
  if(guess === password) {
    document.body.style.background = 'radial-gradient(white, #6F6E6E)';
    screen.innerHTML = '<h2>YOU SHALL NOT PASS</h2>';
    screen.style.backgroundColor = 'black';
    screen.style.color = 'white';
    screen.style.textAlign = 'center';
  }  else if(clicks === 4) {
       changeBgColor('transparent', 0);
       changeBgColor('transparent', 1);
       changeBgColor('transparent', 2);
       changeBgColor('transparent', 3); 
       guess = '';
       clicks = 0;
  } 
});
