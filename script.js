// Function to calculate the breakup score based on the form inputs
function calculateScore() {
  // Get the values from the form fields
  const cheated = document.getElementById('cheated').value; // "Have You Cheated?"
  const relationshipDuration = document.getElementById('duration').value; // "How Old is Your Relationship?"
  const maleFemaleFriends = document.getElementById('friends').value; // "Have Many Male/Female Friends?"

  let score = 0;

  // Calculate score based on "Have You Cheated?"
  if (cheated === "yes") {
    score += 40; // If yes, add 40 to the score
  } else {
    score += 10; // If no, add 10 to the score
  }

  // Calculate score based on "How Old is Your Relationship?"
  if (relationshipDuration === "0to1") {
    score += 10; // If relationship is 0-1 year, add 10 to score
  } else if (relationshipDuration === "1to2") {
    score += 30; // If relationship is 1-2 years, add 30 to score
  } else if (relationshipDuration === "2to3") {
    score += 50; // If relationship is 2-3 years, add 50 to score
  } else if (relationshipDuration === "3andAbove") {
    score += 70; // If relationship is 3+ years, add 70 to score
  }

  // Calculate score based on "Have Many Male/Female Friends?"
  if (maleFemaleFriends === "yes") {
    score += 20; // If yes, add 20 to score
  } else {
    score += 5; // If no, add 5 to score
  }

  // Additional weight to ensure the score can go up to 130
  score += 30; // Additional max possible value for higher scores

  // Call the displayResult function and pass the score
  displayResult(score);
}

// Function to display the result in the popup
function displayResult(score) {
  // Show the popup by adding the 'show' class
  const resultPopup = document.getElementById('resultPopup');
  resultPopup.classList.add('show'); // Adding 'show' class to make it visible

  // Get the result elements
  const resultText = document.getElementById('resultText');
  const emoji = document.getElementById('emoji');
  const scorePercentage = document.getElementById('scorePercentage');
  const speedometer = document.getElementById('speedometer').getElementsByClassName('speedometer-bar')[0];
  const whatsappShare = document.getElementById('whatsappShare');

  // Set the result text and emoji based on score
  let resultMessage = '';
  let emojiIcon = '';
  let speedometerColor = '';

  // Calculate percentage for the speedometer (scale to 100)
  const percentage = Math.min(score / 1.3, 100);

  if (percentage >= 80) {
    resultMessage = "Your relationship is in a critical condition!";
    emojiIcon = "💔";
    speedometerColor = 'red';
  } else if (percentage >= 50) {
    resultMessage = "Your relationship is at risk!";
    emojiIcon = "😟";
    speedometerColor = 'yellow';
  } else {
    resultMessage = "Your relationship is safe!";
    emojiIcon = "😊";
    speedometerColor = 'green';
  }

  // Update the result in the popup
  resultText.textContent = resultMessage;
  emoji.textContent = emojiIcon;

  // Set the speedometer's background color
  speedometer.style.backgroundColor = speedometerColor;
  speedometer.style.width = `${percentage}%`; // Update the speedometer's width based on the score

  // Update the score percentage text
  scorePercentage.textContent = `Your Score: ${percentage.toFixed(1)}%`;

  // Set WhatsApp Share URL with score and page link
  const shareURL = `https://wa.me/?text=My%20relationship%20score%20is%20${percentage}%25.%20Check%20your%20own%20relationship%20score%20at%20${window.location.href}`;
  whatsappShare.setAttribute('href', shareURL);
}

// Function to close the result popup
function closePopup() {
  const resultPopup = document.getElementById('resultPopup');
  resultPopup.classList.remove('show'); // Removing 'show' class to hide the popup
}

// Function to recheck the score
function checkAgain() {
  const resultPopup = document.getElementById('resultPopup');
  resultPopup.classList.remove('show'); // Close the popup
  // Reset the form (optional)
  document.getElementById('cheated').value = 'no';
  document.getElementById('duration').value = '0to1';
  document.getElementById('friends').value = 'no';
}

// Adding event listener for the button
document.getElementById('checkScoreButton').addEventListener('click', calculateScore);
