// Constants Module for handling constants like π, e
const CONSTANTS = {
  PI: Math.PI,
  E: Math.E,
};

// Function to append constants to the input
function appendConstant(constant) {
  let result;
  const inputNumber = currentInput ? parseFloat(currentInput) : 1; // Default to 1 if no current input

  if (constant === "pi") {
    result = inputNumber * CONSTANTS.PI;
  } else if (constant === "e") {
    result = inputNumber * CONSTANTS.E;
  }

  displayResult(result);
}
