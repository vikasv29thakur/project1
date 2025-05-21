const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];       // Array to hold the game pattern
let userPattern = [];       // Array to hold the user's input
let level = 0;             // Current level of the game
let started = false;      // Flag to check if the game has started
let score = 0;                // Score of the player
  // Function to start the game
function nextSequence() {     // Function to generate the next sequence
  userPattern = [];            // Reset user pattern for the new level
  level++;                     // Increment level
  document.getElementById("level-title").textContent = "Level " + level;   // Update level title
  const randomNumber = Math.floor(Math.random() * 4); // Generate a random number between 0 and 3

  const randomColor = buttonColors[Math.floor(Math.random() * 4)];   // Get a random color from the buttonColors array
  gamePattern.push(randomColor);                                    // Add the random color to the game pattern
  flashButton(randomColor);                                         // Flash the button
}

function flashButton(color) {                                     // Function to flash the button
  const btn = document.getElementById(color);                    // Get the button element by color
  btn.classList.add("active");                                   // Add active class to the button
  setTimeout(() => btn.classList.remove("active"), 300);         // Remove active class after 300ms
}

function playSound(color) {
  // Optional: Add sound logic here, e.g., play a sound based on the color
}

function checkAnswer(currentLevel) {       // Function to check the user's answer
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {  // Check if the user's answer is correct
    if (userPattern.length === gamePattern.length) {             // Check if the user has completed the sequence
      score++;                                                  // Increment score
     document.getElementById("score").textContent = "Score: " + score; // Update score display
      setTimeout(nextSequence, 1000);                                  // Wait for 1 second before generating the next sequence

    }
  } else {                                                            // If the user's answer is incorrect
    document.getElementById("level-title").textContent = "Game Over! Press Start to Play";  // Update title to indicate game over

    document.getElementById("score").textContent = "Final Score: " + score;                 // Display final score
    started = false;                                                        // Reset the game state
    gamePattern = [];                                                       // Clear the game pattern
    userPattern = [];                                                       // Clear the user pattern
    document.querySelectorAll(".game-button").forEach(btn => {               // Reset all buttons
      btn.classList.remove("active");                               // Remove active class from all buttons                                               
    }); 
    level = 0;                                                // Reset level  
    score = 0;                                        // Reset score  
  }   
}

document.getElementById("start-btn").addEventListener("click", function() {  // Start button event listener
  if (!started) {                                                             // Check if the game has not started  
    started = true;                                                           // Set started flag to true
    score = 0;                                      // Reset score                                                                                          
    gamePattern = [];                      // Clear the game pattern
    level = 0;                     // Reset level
    document.getElementById("score").textContent = "";   // Clear score display
    nextSequence();                               // Start the game by generating the first sequence
  }
});

document.querySelectorAll(".game-button").forEach(btn => {   // Add event listeners to all game buttons
  btn.addEventListener("click", function() {               // Button click event listener
    if (!started) return;                                // Check if the game has started
    const userChosenColor = this.id;                     // Get the color of the clicked button
    userPattern.push(userChosenColor);                  // Add the chosen color to the user pattern
    flashButton(userChosenColor);                       // Flash the button
    playSound(userChosenColor);                        // Play sound for the chosen color
    checkAnswer(userPattern.length - 1);              // Check the user's answer
  });
});
  
