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
// fetch("https://openexchangerates.org/api/currencies.json")
// .then(response => response.json())
// .then(data => {
//   const select = document.getElementById("receiveCurrency");
//   for (const currencyCode in data) {
//     const option = document.createElement("option");
//     option.value = currencyCode;
//     option.textContent = `${currencyCode} - ${data[currencyCode]}`;
//     select.appendChild(option);
//   }
// });
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

  // Get user's location using OpenCage Geocoder API
  const apiKey = "e1cbe367b96f477fb85d1f352c31afbf";
  const geocoder = new OpenCageApi({ key: apiKey });
  geocoder.geocode({ q: "auto" }).then(response => {
    const result = response.results[0];
    const userCurrency = getCurrencyFromLocation(result.components.country_code);
    select.value = userCurrency;
  }).catch(error => {
    console.error(error);
  });
});




function getCurrencyFromLocation(countryCode) {
  // You can modify this function to return the appropriate currency based on the user's country code
  // For the sake of this example, let's assume the user's currency is USD if they're in the US, and EUR otherwise
  if (countryCode === "US") {
    return "USD";
  } else {
    return "EUR";
  }
}



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
