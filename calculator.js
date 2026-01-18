let calculator = {
  term1: 0,
  term2: null,
  operator: "",

  startNewNumber: true,

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
    this.term1 = 0;
    this.term2 = null;
    this.startNewNumber = true;
  },

  writeNumberToDisplay: function (number) {
    this.displayText.textContent = number;
  },

  updateNumberOnDisplay(digit) {
    if (this.startNewNumber) {
      this.startNewNumber = false;
      this.displayText.textContent = digit;
    } else {
      this.writeNumberToDisplay(this.displayText.textContent.concat(digit));
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
      calculator.term1 = Number(calculator.displayText.textContent);
      calculator.startNewNumber = true;
      calculator.operator = event.target.dataset.value;
      break;
    case "equals":
      console.log(`equals received`);
      if (calculator.term2 === null) {
        calculator.term2 = Number(calculator.displayText.textContent);
      }
      let results = calculator.operate();
      calculator.writeNumberToDisplay(results);
      calculator.startNewNumber = true;
      calculator.term1 = results;
      break;
  }
});
