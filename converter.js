const sendAmount = document.getElementById("sendAmount");
const sendCurrency = document.getElementById("sendCurrency");
const receiveAmount = document.getElementById("receiveAmount");
const receiveCurrency = document.getElementById("receiveCurrency");

const apiKey = "1658075bb13b437b5a5bcfe1"; // Get a free API key from exchangerate-api.com

// Convert currency based on API rates
function convertCurrency() {
  const sendCurrencyCode = sendCurrency.value;
  const receiveCurrencyCode = receiveCurrency.value;
  const amount = sendAmount.value;

  // Make API request to get exchange rates
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${sendCurrencyCode}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.conversion_rates[receiveCurrencyCode];
      receiveAmount.value = (amount * rate).toFixed(2);
    })
    .catch((error) => console.error(error));
}

// fetch currencies automatically
fetch("https://openexchangerates.org/api/currencies.json")
  .then(response => response.json())
  .then(data => {
    const select = document.getElementById("sendCurrency");
    for (const currencyCode in data) {
      const option = document.createElement("option");
      option.value = currencyCode;
      option.textContent = `${currencyCode} - ${data[currencyCode]}`;
      select.appendChild(option);
    }
  });
  // fetch currencies automatically
fetch("https://openexchangerates.org/api/currencies.json")
.then(response => response.json())
.then(data => {
  const select = document.getElementById("receiveCurrency");
  for (const currencyCode in data) {
    const option = document.createElement("option");
    option.value = currencyCode;
    option.textContent = `${currencyCode} - ${data[currencyCode]}`;
    select.appendChild(option);
  }
});


// Add event listeners to input fields
sendAmount.addEventListener("input", convertCurrency);
sendCurrency.addEventListener("change", convertCurrency);
receiveCurrency.addEventListener("change", convertCurrency);

function switchCurrencies() {
  const tempCurrency = sendCurrency.value;
  sendCurrency.value = receiveCurrency.value;
  receiveCurrency.value = tempCurrency;

  const tempAmount = sendAmount.value;
  sendAmount.value = receiveAmount.value;
  receiveAmount.value = tempAmount;

  convertCurrency();
}
