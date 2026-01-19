let calculator = {
  displayTextElement: null,
  displayedNumber: null,
  lastNumberSeen: null,
  lastOperator: null,
  startNewNumber: true,

  init: function() {
    this.displayTextElement = document.querySelector(".display-text");
    this.displayedNumber = Number(this.displayTextElement.textContent);
  },

  clearAll: function() {
    this.displayTextElement.textContent = 0;
    this.displayedNumber = Number(this.displayTextElement.textContent);
    this.lastNumberSeen = null;
    this.lastOperator = null;
    this.startNewNumber = true;
  },

  processNumberKeyPress: function(digit) {
    if (this.startNewNumber) {
      this.displayTextElement.textContent = digit;
      this.startNewNumber = false;
    } else {
      this.displayTextElement.textContent = this.displayTextElement.textContent.concat(digit);
    }
    this.displayedNumber = Number(this.displayTextElement.textContent);
  }
}

calculator.init();

let numpad = document.querySelector(".numpad");

numpad.addEventListener('click', (event) => {
  switch(event.target.dataset.type) {
    case "clear":
      console.log(`AC`);
      calculator.clearAll();
      break;
    case "number":
      console.log(`number key: ${event.target.dataset.value}`);
      calculator.processNumberKeyPress(event.target.dataset.value);
      break;
    case "operator":
      console.log(`${event.target.dataset.value} operator selected`);
      break;
    case "equals":
      console.log(`equals`);
      break;
  }
});
