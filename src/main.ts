import './style.css';

// Calculator functionality
const display = document.getElementById('display') as HTMLInputElement;
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator: string | null = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
      currentInput = '';
      previousInput = '';
      operator = null;
      display.value = '';
    } else if (value === '=') {
      if (operator && previousInput && currentInput) {
        currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
        operator = null;
        previousInput = '';
        display.value = currentInput;
      }
    } else if (['+', '-', '*', '/'].includes(value!)) {
      if (currentInput) {
        previousInput = currentInput;
        operator = value!;
        currentInput = '';
      }
    } else {
      currentInput += value;
    }
    display.value = currentInput || previousInput;
  });
});

function calculate(a: number, b: number, op: string): number {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return 0;
  }
}
