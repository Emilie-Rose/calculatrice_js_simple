// script.js

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let resetNext = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (button.id === "clear") {
      currentInput = "";
      display.textContent = "0";
      return;
    }

    if (button.id === "equal") {
      try {
        const result = eval(currentInput);
        display.textContent = result;
        currentInput = result.toString();
        resetNext = true;
      } catch (error) {
        display.textContent = "Erreur";
        currentInput = "";
      }
      return;
    }

    if (resetNext) {
      if (!isNaN(value)) {
        currentInput = value;
      } else {
        currentInput += value;
      }
      resetNext = false;
    } else {
      currentInput += value;
    }

    display.textContent = currentInput;
  });
});
