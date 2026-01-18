let calculator = {
  term1: NaN,
  term2: NaN,
  operator: "",

  displayText: document.querySelector(".display-text"),

  operate: function() {
    switch (this.operator) {
      case "+":
        return this.term1 + this.term2;
      case "-":
        return this.term1 - this.term2;
      case "/":
        if (0 === this.term2) {
          return NaN;
        } else {
          return this.term1 / this.term2;
        }
      case "*":
        return this.term1 * this.term2;
      default:
        console.log(`unknown operator: ${this.operator}`);
        return undefined;
    }
  },

  clearDisplay: function() {
    this.displayText.textContent = 0;
    term1 = 0;
    term2 = 0;
  },

  updateNumberOnDisplay(digit) {
    if ("0" != this.displayText.textContent) {
      this.displayText.textContent = this.displayText.textContent.concat(digit);
    } else {
      this.displayText.textContent = digit;
    }
  }
}

let numpad = document.querySelector(".numpad");

numpad.addEventListener('click', (event) => {
  switch(event.target.dataset.type) {
    case "clear":
      calculator.clearDisplay();
      break;
    case "number":
      calculator.updateNumberOnDisplay(event.target.dataset.value);
      break;
    case "operator":
      console.log(`${event.target.dataset.value} operator selected`);
      break;
    case "equals":
      console.log(`equals received`);
      break;
  }
});
