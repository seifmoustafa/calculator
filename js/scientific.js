// Scientific Operations Module

function scientificFunction(func) {
  console.log(`scientificFunction called with: ${func}`); // Log when called

  let result;

  if (!currentInput) {
    console.log("No input available for scientific operation"); // Log if no input
    return; // If no input, do nothing
  }

  const inputNumber = parseFloat(currentInput); // Parse the current input as a number

  switch (func) {
    case "sin":
      result = Math.sin(toRadians(inputNumber));
      break;
    case "cos":
      result = Math.cos(toRadians(inputNumber));
      break;
    case "tan":
      result = Math.tan(toRadians(inputNumber));
      break;
    case "√":
      result = Math.sqrt(inputNumber);
      break;
    case "log":
      result = Math.log10(inputNumber);
      break;
    case "ln":
      result = Math.log(inputNumber);
      break;
    case "exp":
      result = Math.exp(inputNumber);
      break;
    case "π":
      result = Math.PI * (inputNumber || 1); // If inputNumber is empty, multiply by 1
      break;
    case "e":
      result = Math.E * (inputNumber || 1); // If inputNumber is empty, multiply by 1
      break;
    case "x^y":
      appendOperator("^");
      return; // Let the second operand come in
  }

  displayResult(result); // Display the result
  calculate(); // Trigger the calculation process
}

// Converts degrees to radians for trigonometric functions
function toRadians(angle) {
  return angle * (Math.PI / 180);
}
