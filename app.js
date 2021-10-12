//Selecting the DOM elements
const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  const currencyValue_one = currencyEl_one.value;
  const currencyValue_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyValue_one}`)
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      const rate = data.rates[currencyValue_two];
      //console.log(rate);
      rateEl.innerText = `1 ${currencyValue_one} = ${rate} ${currencyValue_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });

  //console.log(currencyValue_one, currencyValue_two);
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

//Swap button event listener
swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
