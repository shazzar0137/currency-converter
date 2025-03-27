const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertButton = document.getElementById('convert-button');
const resultDiv = document.getElementById('result');
const currencyList =    document.getElementById('currency-list');

// Populate dropdowns
fetch(`https://v6.exchangerate-api.com/v6/45c808c7763da48b9294f3b8/latest/USD`)
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.conversion_rates);
        currencies.forEach(currency => {
            fromCurrency.add(new Option(currency, currency));
            toCurrency.add(new Option(currency, currency));
        });
    });

    // Convert currency and update history
convertButton.addEventListener('click', () => {
    const amountValue = parseFloat(amount.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amountValue) || amountValue <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/45c808c7763da48b9294f3b8/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rates[to];
            const convertedAmount = (amountValue * rate).toFixed(2);
            resultDiv.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;

            const li = document.createElement('li');
            li.innerHTML = `
                <span>${amountValue} ${from} = ${convertedAmount} ${to} <br></span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;
            currencyList.appendChild(li);
        })
        .catch(error => console.error('Error fetching data:', error));
        
});
amount.textContent= " "

// Real-time validation using `input` event listener
amount.addEventListener('input', () => {
    const amountValue = parseFloat(amount.value);
    if (isNaN(amountValue) || amountValue <= 0) {
        resultDiv.textContent = 'Enter a valid positive number.';
        resultDiv.style.color = 'gray';
    } else {
        resultDiv.textContent = '';
    }
});

// Event delegation for Edit and Delete buttons
currencyList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        // Remove the list item
        event.target.parentElement.remove();
    } else if (event.target.classList.contains('edit')) {
        // Extract data from the entry
        const listItem = event.target.parentElement;
        const entryText = listItem.querySelector('span').textContent;
        const [amountValue, fromCurrencyText, , toCurrencyText] = entryText.split(' ');

        // Pre-fill the input fields
        amount.value = parseFloat(amountValue);
        fromCurrency.value = fromCurrencyText;
        toCurrency.value = toCurrencyText;

        // Remove the list item
        listItem.remove();
    }
});
