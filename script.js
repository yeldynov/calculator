const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    // Replace current display value if first value is entered
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  if (awaitingNextValue) return;

  if (!calculatorDisplay.textContent.includes('.'))
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
}

function useOperator(operator) {
  const currentValue = +calculatorDisplay.textContent;

  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  // Assign firstValue if no value
  if (!firstValue) firstValue = currentValue;
  else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }

  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset all values, display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0)
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  else if (inputBtn.classList.contains('operator'))
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  else if (inputBtn.classList.contains('decimal'))
    inputBtn.addEventListener('click', addDecimal);
});

clearBtn.addEventListener('click', resetAll);
