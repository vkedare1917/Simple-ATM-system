const setPin = 4096; //user pin is set to 4096

const inputPin = document.getElementById("input-pin");
const checkBalanceBtn = document.getElementById("check-balance-btn");
const withdrawCashBtn = document.getElementById("withdraw-cash-btn");
const displayMessage = document.getElementById('display-message');
const amountInput = document.querySelector('.amount-input');
const cashOut = document.querySelector('.cash-out');

let bankBalance = 85000;
let correctPin = false;


// To only get number input as input pin
function onlyNumbers() {
    if(isNaN(inputPin.value)|| isNaN(amountInput.value)) {
        alert('Please enter numbers only!');
        inputPin.value = '';
        amountInput.value = '';
    }
}

// To check balance
checkBalanceBtn.addEventListener('click', () => {

    // Fetching the pin from user
    let userPin = parseInt(inputPin.value);

    // Checking if pin is correct or not
    function pinCheck() {
        if(userPin === setPin) {
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
    if(parseInt(userPin) === setPin) {
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