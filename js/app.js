// Main Calculator Logic

let currentInput = ""; // Track the current input (number being typed)
let previousValue = ""; // Track the previous number entered before an operator
let operator = ""; // Track the last operator pressed
let isResultDisplayed = false; // Flag to check if a result is currently displayed

// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Attach event listeners to all buttons
  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  // Attach event listener to the theme toggle button
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);
});

// Function to handle button clicks
function handleButtonClick(event) {
  const btnValue = event.target.innerText.toLowerCase(); // Convert to lowercase for consistency

  // Check if the button is a number or dot
  if (!isNaN(btnValue) || btnValue === ".") {
    appendNumber(btnValue);
  }
  // Check if the button is an operator
  else if (["+", "-", "*", "/", "^"].includes(btnValue)) {
    appendOperator(btnValue);
  }
  // Handle equals
  else if (btnValue === "=") {
    calculate(); // Perform the calculation
  }
  // Handle clear (AC)
  else if (btnValue === "ac") {
    clearDisplay();
  }
  // Handle delete (DEL)
  else if (btnValue === "del") {
    deleteLast();
  }
  // Handle scientific functions
  else if (
    ["sin", "cos", "tan", "√", "log", "ln", "exp", "π", "e", "x^y"].includes(
      btnValue
    )
  ) {
    scientificFunction(btnValue); // Call the scientific function
  }
}

// Function to append numbers to the display
function appendNumber(number) {
  // If a result is currently displayed, clear the display for a new number input
  if (isResultDisplayed) {
    clearDisplay(); // Clear the display if a result was already displayed
    isResultDisplayed = false; // Reset the flag
  }
  currentInput += number; // Append the number to the current input
  updateDisplay(currentInput);
}

// Function to append operators to the display
function appendOperator(op) {
  // If no number is entered yet, treat the first operand as 0
  if (currentInput === "" && previousValue === "") {
    previousValue = "0";
  }

  // If a result is displayed, use that result as the first operand
  if (isResultDisplayed) {
    previousValue = currentInput || previousValue; // If currentInput is empty, use previousValue
    isResultDisplayed = false; // Reset the flag
  }

  if (currentInput !== "" || previousValue !== "") {
    // Allow operator even if result is shown
    if (previousValue === "") {
      previousValue = currentInput; // Set previous value to the first number
    } else if (operator) {
      calculate(); // Perform the calculation if there was a previous operator
    }
    operator = op; // Set the operator
    currentInput = ""; // Clear the current input to start entering the next number
    updateDisplay(operator);
  }
}

// Function to calculate the result
function calculate() {
  if (previousValue !== "" && (currentInput !== "" || operator)) {
    let result;
    const firstOperand = parseFloat(previousValue);
    const secondOperand = parseFloat(currentInput) || 0; // Default to 0 if no second operand is provided

    switch (operator) {
      case "+":
        result = firstOperand + secondOperand;
        break;
      case "-":
        result = firstOperand - secondOperand;
        break;
      case "*":
        result = firstOperand * secondOperand;
        break;
      case "/":
        result = firstOperand / secondOperand;
        break;
      case "^":
        result = Math.pow(firstOperand, secondOperand);
        break;
      default:
        return;
    }

    // Format result as an integer if possible, otherwise show decimal
    displayResult(result % 1 === 0 ? result : result.toFixed(5));

    previousValue = result.toString(); // Store the result for further operations
    currentInput = "";
    operator = "";
    isResultDisplayed = true; // Mark the result as displayed
  }
}

// Function to update the display
function updateDisplay(value) {
  document.getElementById("display").value = value;
}

// Function to display the result
function displayResult(result) {
  updateDisplay(result);
  previousValue = result.toString(); // Store the result for further operations
  currentInput = ""; // Reset the current input
  isResultDisplayed = true; // Mark that a result is being displayed
}

// Function to clear the display
function clearDisplay() {
  currentInput = "";
  previousValue = "";
  operator = "";
  isResultDisplayed = false;
  updateDisplay("");
}

// Function to delete the last character
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
}

// Function to toggle the theme
function toggleTheme() {
  const calculatorContainer = document.getElementById("calculator");
  calculatorContainer.classList.toggle("dark-mode");
  const themeButton = document.getElementById("theme-toggle");
  themeButton.textContent = calculatorContainer.classList.contains("dark-mode")
    ? "🌙"
    : "☀️";
}
