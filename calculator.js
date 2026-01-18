let calculator = {
  term1: 0,
  term2: 0,
  operator: "",
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
    let displayText = document.querySelector(".display-text");
    displayText.textContent = 0;
    term1 = 0;
    term2 = 0;
  }
}

let numpad = document.querySelector(".numpad");

numpad.addEventListener('click', (event) => {
  switch(event.target.dataset.type) {
    case "clear":
      calculator.clearDisplay();
      break;
    case "number":
      console.log(`${event.target.dataset.value} button pressed`);
      break;
    case "operator":
      console.log(`${event.target.dataset.value} operator selected`);
      break;
    case "equals":
      console.log(`equals received`);
      break;
  }
});
