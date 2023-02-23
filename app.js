const showButton = document.querySelector('.show-button');
const resetButton = document.querySelector('.reset-button');
const resultButton = document.querySelector('.result-button');
const words = document.querySelector('.words');
const input = document.querySelector('input');

let textArray = [];
let currentIndex = 0;
let errors = 0;
let started = false;
let startTime = 0;
let endTime = 0;

// Function to load a random text for the test
function loadText() {
  const texts = [
    "The quick brown fox jumps over the lazy dog",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
    "In hac habitasse platea dictumst. Morbi ac erat sit amet mauris ullamcorper dignissim",
    "Fusce ac massa vel tortor consequat dignissim ac in velit",
  ];
  const randomIndex = Math.floor(Math.random() * texts.length);
  textArray = texts[randomIndex].split(" ");
  currentIndex = 0;
  errors = 0;
  started = false;
  startTime = 0;
  endTime = 0;
  words.textContent = textArray.join(" ");
  input.value = "";
  input.focus();
}

// Function to start the test
function startTest() {
  if (!started) {
    started = true;
    startTime = new Date().getTime();
  }
}

// Function to check the input for errors and update the test display
function checkInput() {
  if (input.value === textArray[currentIndex]) {
    currentIndex++;
    input.value = "";
    if (currentIndex === textArray.length) {
      endTime = new Date().getTime();
      const timeInSeconds = (endTime - startTime) / 1000;
      const wordsPerMinute = Math.round(textArray.length / (timeInSeconds / 60));
      alert(`You typed at a speed of ${wordsPerMinute} words per minute with ${errors} errors.`);
      started = false;
    }
  } else {
    errors++;
  }
}

// Add event listeners to buttons and input
showButton.addEventListener('click', loadText);
input.addEventListener('keydown', startTest);
input.addEventListener('input', checkInput);
resetButton.addEventListener('click', loadText);
resultButton.addEventListener('click', () => {
  if (started) {
    alert("Please finish the test first.");
  } else {
    const timeInSeconds = (endTime - startTime) / 1000;
    const wordsPerMinute = Math.round(textArray.length / (timeInSeconds / 60));
    alert(`You typed at a speed of ${wordsPerMinute} words per minute with ${errors} errors.`);
  }
});
