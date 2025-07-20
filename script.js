// script.js

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentNumber = "";
let previousNumber = "";
let operator = "";
let resultDisplayed = false;

function updateDisplay(value) {
  display.textContent = value || "0";
}

buttons.forEach(button => {
  const value = button.dataset.value;

  button.addEventListener("click", () => {
    if (button.id === "clear") {
      currentNumber = "";
      previousNumber = "";
      operator = "";
      resultDisplayed = false;
      updateDisplay("0");
      return;
    }
    if (button.id === "delete") {
  if (resultDisplayed) {
    currentNumber = "";
    resultDisplayed = false;
  } else {
    currentNumber = currentNumber.slice(0, -1);
  }
  updateDisplay(currentNumber);
  return;
}


    if (button.id === "equal") {
      if (currentNumber && previousNumber && operator) {
        const result = calculate(Number(previousNumber), Number(currentNumber), operator);
        updateDisplay(result);
        previousNumber = result.toString();
        currentNumber = "";
        operator = "";
        resultDisplayed = true;
      }
      return;
    }

    if (button.classList.contains("operator")) {
      if (currentNumber) {
        if (previousNumber && operator) {
          previousNumber = calculate(Number(previousNumber), Number(currentNumber), operator).toString();
          updateDisplay(previousNumber);
        } else {
          previousNumber = currentNumber;
        }
        currentNumber = "";
        operator = value;
      }
      return;
    }

    // Si on clique sur un chiffre ou un point
    if (resultDisplayed) {
      currentNumber = value;
      resultDisplayed = false;
    } else {
      if (value === "." && currentNumber.includes(".")) return;
      currentNumber += value;
    }

    updateDisplay(currentNumber);
  });
});

function calculate(num1, num2, op) {
  switch (op) {
    case "+": return num1 + num2;
    case "-": return num1 - num2;
    case "*": return num1 * num2;
    case "/": return num2 === 0 ? "Erreur" : num1 / num2;
    default: return num2;
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    document.querySelector(`.btn[data-value="${key}"]`)?.click();
  }

  if (["+", "-", "*", "/"].includes(key)) {
    document.querySelector(`.btn[data-value="${key}"]`)?.click();
  }

  if (key === "Enter") {
    document.getElementById("equal").click();
  }

  if (key === "Backspace") {
    document.getElementById("delete")?.click();
  }

  if (key.toLowerCase() === "c") {
    document.getElementById("clear")?.click();
  }
});
// Toggle du thème clair/sombre
const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️ Mode clair" : "🌙 Mode sombre";
});
