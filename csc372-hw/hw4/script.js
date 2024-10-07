/*
    Author: Kennedy Page
    Date: 10.08.2024
    CSC 372-01

    This JavaScript file contains the logic for the Rock, Paper, Scissors game.
*/


// Global Variables
let playerSelection = "";
let computerSelection = "";
let wins = 0;
let losses = 0;
let ties = 0;
let shuffleInterval;
let shuffleCount = 0;
let canSelectChoice = true; 

// Elements
const choices = document.querySelectorAll(".choice");
const computerChoiceImg = document.getElementById("computer-choice");
const resultText = document.getElementById("result");
const winsText = document.getElementById("wins");
const lossesText = document.getElementById("losses");
const tiesText = document.getElementById("ties");
const resetButton = document.getElementById("reset-button");
const playAgainButton = document.getElementById("play-again-button");

// Function to Handle Player Choice
function handlePlayerChoice(event) {
  if (!canSelectChoice) {
    return; // Do nothing if the player cannot select a choice
  }

  resetSelections();
  playerSelection = event.currentTarget.id;
  event.currentTarget.classList.add("selected");
  startComputerShuffle();
}

// Attach Event Listeners to Player Choices
choices.forEach((choice) => {
  choice.addEventListener("click", handlePlayerChoice);
});

// Reset Selections
function resetSelections() {
  choices.forEach((choice) => {
    choice.classList.remove("selected");
  });
  computerChoiceImg.src = "images/question-mark.PNG";
  computerChoiceImg.classList.remove("computer-selected");
  resultText.textContent = "Make your move!";
  shuffleCount = 0;
  clearInterval(shuffleInterval);
  playerSelection = "";
  computerSelection = "";
}

// Start Computer Shuffle
function startComputerShuffle() {
  // Disable player choices
  canSelectChoice = false;
  choices.forEach((choice) => {
    choice.style.pointerEvents = "none";
    choice.classList.add("disabled");
  });

  shuffleInterval = setInterval(shuffleComputerChoice, 500);
  setTimeout(() => {
    clearInterval(shuffleInterval);
    decideComputerChoice();
    decideWinner();
  }, 3000);
}

// Shuffle Computer Choice Images
function shuffleComputerChoice() {
  const images = ["rock.PNG", "paper.PNG", "scissors.PNG"];
  computerChoiceImg.src = `images/${images[shuffleCount % 3]}`;
  shuffleCount++;
}

// Decide Computer's Final Choice
function decideComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  computerSelection = options[Math.floor(Math.random() * 3)];
  computerChoiceImg.src = `images/${computerSelection}.PNG`;
  computerChoiceImg.classList.add("computer-selected");
}

// Decide Winner
function decideWinner() {
  if (playerSelection === computerSelection) {
    resultText.textContent = "It's a tie!";
    ties++;
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    resultText.textContent = "You win!";
    wins++;
  } else {
    resultText.textContent = "You lose!";
    losses++;
  }
  updateScore();
  playAgainButton.style.display = "inline-block"; 
}

// Update Score Display
function updateScore() {
  winsText.textContent = wins;
  lossesText.textContent = losses;
  tiesText.textContent = ties;
}


playAgainButton.addEventListener("click", () => {
  resetForNextRound();
});

//Reset for Next Round
function resetForNextRound() {
  resetSelections();
  playAgainButton.style.display = "none";
  canSelectChoice = true;
  choices.forEach((choice) => {
    choice.style.pointerEvents = "auto";
    choice.classList.remove("disabled");
  });
}

// Reset Button Functionality
resetButton.addEventListener("click", () => {
  wins = 0;
  losses = 0;
  ties = 0;
  updateScore();
  resetSelections();
  playAgainButton.style.display = "none";
  canSelectChoice = true;
  choices.forEach((choice) => {
    choice.style.pointerEvents = "auto";
    choice.classList.remove("disabled");
  });
});
