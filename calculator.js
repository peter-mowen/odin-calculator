const MAX_DIGITS = 15;

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

  updateDisplayedNumber: function(newNumber) {
    // Save this as a number with full precision
    this.displayedNumber = Number(newNumber);

    // Write this to the display, rounding it if it doesn't fit.
    if (newNumber.toString().length > MAX_DIGITS) {
      if (newNumber < 1 && newNumber > 0) {
        // the leading zero isn't counted in toPrecision's calculation for the 
        // number of digits, so numbers between 0 and 1 will show 17 characters
        // instead of 16 (the 0, the decimal point, and the number of digits)
        this.displayTextElement.textContent =
          Number(newNumber).toPrecision(MAX_DIGITS-1);
      } else {
        // since there is no leading zero, all numbers count towards the
        // precision. This means the number of characters that will be displayed
        // is 16 (15 digits and the decimal point)
        this.displayTextElement.textContent =
          Number(newNumber).toPrecision(MAX_DIGITS);
      }
    } else {
      this.displayTextElement.textContent = newNumber;
    }
  },

  clearAll: function() {
    this.updateDisplayedNumber(0);
    this.lastNumberSeen = null;
    this.lastOperator = null;
    this.currentOperator = null;
    this.startNewNumber = true;
  },

  processNumberKeyPress: function(digit) {
    if (this.startNewNumber) {
      this.updateDisplayedNumber(digit);
      this.startNewNumber = false;
    } else {
      if (this.displayedNumber != 0) {
        this.updateDisplayedNumber(this.displayTextElement.textContent.concat(digit));
      }
    }
  },

  processOperatorKeyPress: function(operator) {
    // user is trying to do a new operation, so forget about last one
    this.lastOperator = null;

    // There is a pending current operator. Go ahead and perform it
    if (this.currentOperator && !this.startNewNumber) {
      let result = this.performOperation(this.lastNumberSeen, this.displayedNumber, this.currentOperator);
      this.updateDisplayedNumber(result);
    }

    // save the last number seen
    this.lastNumberSeen = this.displayedNumber;

    // now go ahead and setup for the new operation
    this.currentOperator = operator;
    this.startNewNumber = true;
  },
  
  processEqualKeyPress: function() {
    let result = null;

    // If there is a current operator, then the user just pressed an operator
    // button
    if (this.currentOperator) {
      result = this.performOperation(this.lastNumberSeen, this.displayedNumber, this.currentOperator);

      // save the last number that was on the screen and the last operator that
      // was pressed in case the user presses equal again.
      this.lastNumberSeen = Number(this.displayTextElement.textContent);
      this.lastOperator = this.currentOperator;
      this.currentOperator = null;
    } else if (this.lastOperator) {
      // Otherwise, perform operation using the last operator, the last number
      // that was entered, and the current number on the screen
      result = this.performOperation(this.displayedNumber, this.lastNumberSeen, this.lastOperator);
    }

    // update the display if there is a result
    if (result !== null) {
      this.updateDisplayedNumber(result);
    }
    // setup so the user can enter a new number and new operation
    this.startNewNumber = true;
  },

  performOperation: function(term1, term2, operator) {
    let result = null;
    switch (operator) {
      case "+" :
        result = term1 + term2;
        break;
      case "-":
        result = term1 - term2;
        break;
      case "/":
        if (term2) {
          result = term1 / term2;
        } else {
          result = NaN;
        }
        break;
      case "*":
        result = term1 * term2;
        break;
    }
    console.log(`${term1} ${operator} ${term2} = ${result}`);
    return result;
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
      calculator.processOperatorKeyPress(event.target.dataset.value);
      break;
    case "equals":
      console.log(`equals`);
      calculator.processEqualKeyPress();
      break;
  }
});
