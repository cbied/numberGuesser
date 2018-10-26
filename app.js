/*
Game rules
-Player must guess a number between a min and max
-Player gets a certain amount of guesses
-Notify player of guesses remaining
-Notify the player of the correct answer if they lose
-Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = Math.floor(Math.random() * (max-min+1) + min),
    guessesLeft = 3;


// UI elements
const UIgame = document.querySelector('#game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');


// Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// listen for guess
UIguessBtn.addEventListener('click', function() {
  let guess = parseInt(UIguessInput.value)

  // validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    return false
  }

  // check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct! You win!`);
  } else {

    // guess wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(false, `Game over, You lose!. The winning number was ${winningNum}.`)
    } else {
      //game continues - answer wrong message
      setMessage(`${guess} was not correct, ${guessesLeft} guesses left. Try again`, 'orange');
      //clear input
      UIguessInput.value = '';
    }
  }
});

// Game over function
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // disable input
  UIguessInput.disabled = true;
  // text color
  UImessage.style.color = color;
  // change border color
  UIguessInput.style.borderColor = color;
  // winning message
  setMessage(msg);

  // play again?
  UIguessBtn.value = 'Play again?'
  UIguessBtn.className += 'play-again';
}

// setMessage function
function setMessage(msg, color) {
  UImessage.style.color = color;
  UImessage.textContent = msg;
}
