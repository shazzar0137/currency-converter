const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertButton = document.getElementById('convert-button');
const resultDiv = document.getElementById('result');
const currencyList =    document.getElementById('currency-list');

// Populate dropdowns
fetch(`https://v6.exchangerate-api.com/v6/3158aa5a0cd960475500cb1e/latest/USD`)
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.conversion_rates);
        currencies.forEach(currency => {
            fromCurrency.add(new Option(currency, currency));
            toCurrency.add(new Option(currency, currency));
        });
    });
