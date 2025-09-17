const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and the amount');
    } else {
        const transaction = {
            id: generateRandomID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

form.addEventListener('submit', addTransaction);

// Generate random ID
function generateRandomID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get the sign
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    // Add class based on the value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
    const expense = Math.abs(amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1);

    balance.innerText = `$${total.toFixed(2)}`;
    money_plus.innerText = `$${income.toFixed(2)}`;
    money_minus.innerText = `$${expense.toFixed(2)}`;
}

updateValues();

// Remove transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();

    updateLocalStorage();
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize the app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);

    updateValues();
}

init();
