let calculator = {
}

let numpad = document.querySelector(".numpad");

numpad.addEventListener('click', (event) => {
  switch(event.target.dataset.type) {
    case "clear":
      console.log(`AC`);
      break;
    case "number":
      console.log(`number key: ${event.target.dataset.value}`);
      break;
    case "operator":
      console.log(`${event.target.dataset.value} operator selected`);
      break;
    case "equals":
      console.log(`equals`);
      break;
  }
});
