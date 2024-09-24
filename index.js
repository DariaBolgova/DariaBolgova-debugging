// References to various elements in the DOM
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

// Stores the number the user has to guess
let targetNumber;

// Counter for number of attempts
let attempts = 0;

// Maximum number of attempts allowed
const maxNumberOfAttempts = 5;

// Function to generate a random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function to handle guess submission
function checkGuess() {

  // Convert guess input value to an integer
  const guess = parseInt(guessInput.value, 10);

  // Check if the guess is a valid number
  if (isNaN(guess)) {
    alert('Please enter a valid number between 2 and 98');
    return;
  }
  
  // Check if the guess is a number from 2 to 98
  if (guess <= 1 || guess >= 99) {
    alert('Please enter a valid number between 2 and 98');
    return;
  }

  // Increment attempts counter
  attempts = attempts + 1;

  // Hide all messages before displaying new one
  hideAllMessages();

  // If the guess is correct
  if (guess === targetNumber) {

    // Show number of guesses message
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    // Show correct guess message
    correctMessage.style.display = '';

    // Disable submit button and input field after correct guess
    submitButton.disabled = true;
    guessInput.disabled = true;

    // If the guess is incorrect
  } else {

    if (guess < targetNumber) {
      // Show too low message
      tooLowMessage.style.display = ''; // Show too low message
    } else {
      // Fixed bug: Correct message should show "too high", not "too low"
      tooHighMessage.style.display = '';
    }

    // Calculate remaining attempts
    const remainingAttempts = maxNumberOfAttempts - attempts;

    // Display message with remaining guesses
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;

    // If max attempts reached, disable buttons and show message
    if (attempts === maxNumberOfAttempts) { // Fixed bug: '===' instead of '===='
      submitButton.disabled = true;
      guessInput.disabled = true;

      // Show max guesses reached message
      maxGuessesMessage.style.display = '';
    }
  }

  // Clear input field
  guessInput.value = '';

  // Show reset button
  resetButton.style.display = '';

}

// Function to hide all messages
function hideAllMessages() {

  // Loop through messages and hide them all
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) { // Fixed bug: changed '<=' to '<' for valid index range
    messages[elementIndex].style.display = 'none';
  }
}

// Function to initialize or reset the game
function setup() {

  // Generate a new target number
  targetNumber = getRandomNumber(1, 99); // Correct range 1 to 99, not 1 to 100
  // Log target number
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; // Fixed bug: reset attempts variable instead of maxNumberOfAttempts

  // Enable the input and submit button
  submitButton.disabled = false; // Fixed typo: 'disabeld' to 'disabled'
  guessInput.disabled = false;

  // Hide all messages at the start
  hideAllMessages();
  // Hide reset button at the start
  resetButton.style.display = 'none';
}

// Event listeners for the submit and reset buttons
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

// Initialize the game
setup();
