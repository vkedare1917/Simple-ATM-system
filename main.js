const wrapper = document.querySelector(".wrapper");
const setPinDiv = document.querySelector(".set-pin-div");
const inputPin = document.getElementById("input-pin");
const checkBalanceBtn = document.getElementById("check-balance-btn");
const withdrawCashBtn = document.getElementById("withdraw-cash-btn");
const displayMessage = document.getElementById('display-message');
const amountInput = document.querySelector('.amount-input');
const cashOut = document.querySelector('.cash-out');
const setPin = document.querySelector(".set-pin");
const confirmPin = document.querySelector(".confirm-pin");
const setPinBtn = document.querySelector(".set-pin-btn");
let pin;
let bankBalance = 85000;
let correctPin = false;


// To only get number input as input pin
// function onlyNumbers(inputOne, inputTwo) {
//     if(isNaN(inputPin.value)|| isNaN(amountInput.value)) {
//         alert('Please enter numbers only!');
//         inputPin.value = '';
//         amountInput.value = '';
//     }
// }

function onlyNumbers(input) {
    if(isNaN(input.value)) {
        alert('Please enter numbers only!');
        input.value = '';
    }
}

inputPin.addEventListener("keyup", () => {
    onlyNumbers(inputPin);
});

amountInput.addEventListener("keyup", () => {
    onlyNumbers(amountInput);
});

setPin.addEventListener("keyup", () => {
    onlyNumbers(setPin);
});

confirmPin.addEventListener("keyup", () => {
    onlyNumbers(confirmPin);
});


setPinBtn.addEventListener("click", () => {
    if(setPin.value == confirmPin.value && (setPin.value.length === 4) && (confirmPin.value.length === 4)) {
        pin = confirmPin.value;
        setPin.value = confirmPin.value = '';
        wrapper.style.display = "flex";
        setPinDiv.style.display = "none";
        alert("Pin set succesfully!");
    }
    else if(setPin.value != confirmPin.value || setPin.value.length < 4 || confirmPin.value.length < 4) {
        alert("Please enter pin correctly");
        setPin.value = confirmPin.value = '';
    }
});


// To check balance
checkBalanceBtn.addEventListener('click', () => {

    // Fetching the pin from user
    let userPin = parseInt(inputPin.value);

    // Checking if pin is correct or not
    function pinCheck() {
        if(userPin === parseInt(pin)) {
            correctPin = true;
        }
        else {
            correctPin = false;
        }
        return correctPin;
    }

    correctPin = pinCheck();

    // Displaying bank balance if the pin is correct
    function bankBalanceAmount() {
        if(correctPin) {

            inputPin.value = '';

            // Displaying your current balance
            displayMessage.innerHTML = `Your current balance is <span style="color:black;">Rs.${bankBalance}/-</span>`;
            
            // Creating a button to clear all the values displayed
            const btn = document.createElement('button');
            btn.textContent = 'Done';
            btn.classList.add('btn-style');
            displayMessage.appendChild(btn);
            btn.addEventListener('click', () => {
                displayMessage.textContent = '';
                inputPin.value = '';
                btn.style.display = 'none';
            });
        }

        else {
            displayMessage.textContent = 'Invalid pin';
            inputPin.value = '';
            setTimeout(()=> {
                displayMessage.textContent = '';
            },2000);
        }
    }

    bankBalanceAmount();
});


// To withdraw cash
withdrawCashBtn.addEventListener('click', () => {
    
    let userPin = inputPin.value;

    // Checking if pin is correct or not
    if(parseInt(userPin) === parseInt(pin)) {
        inputPin.value = '';
        amountInput.classList.add('show-amount');
        cashOut.classList.add('cashout-btn');

        // Taking out cash
        cashOut.addEventListener('click', function() {
            if(parseInt(amountInput.value) > bankBalance) {
                alert(`Please enter amount less than or equal to ${bankBalance}`);
            }
            else {
                alert(`Rs. ${amountInput.value} has been debited from your account and your current balance is Rs. ${bankBalance - parseInt(amountInput.value)}/-`);
                
                alert("Don't Forget to take your cash");

                amountInput.classList.remove('show-amount');
                cashOut.classList.remove('cashout-btn');
            }
        });
    }

    else {
        displayMessage.textContent = "Invalid Pin"; 
        inputPin.value = '';
        setTimeout(()=> {
            displayMessage.textContent = '';
        }, 2000);
    }
});