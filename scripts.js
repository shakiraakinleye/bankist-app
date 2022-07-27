// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// MOVEMENTS HTML CREATION AND DISPLAY
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  
  movs.forEach(function (mov, i) {
    const type = mov > 1 ? "deposit" : "withdrawal";
    const html = `<div class="movements__row">
         <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
         <div class="movements__value">${mov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// CALC AND DISPLAY BALANCE
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((sum, mov, i) => sum + mov, 0);
  labelBalance.textContent = `${acc.balance} ₤`;
};

// CALC AND DISPLAY SUMMARY
const calcDisplaySummary = function (acc) {
  const sumIn = acc.movements.reduce(
    (sum, mov, i) => (mov > 0 ? sum + mov : sum),
    0
  );
  const sumOut = acc.movements.reduce(
    (sum, mov, i) => (mov < 0 ? sum + mov : sum),
    0
  );
  const depositInterest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => deposit * acc.interestRate /100)
    .reduce((sum, int) => (sum = int >= 1 ? sum + int : sum), 0);

  labelSumIn.textContent = `${sumIn} ₤`;
  labelSumOut.textContent = `${Math.abs(sumOut)} ₤`;
  labelSumInterest.textContent = `${depositInterest} ₤`;
};

// SAME FUNCTION AS ABOVE USING CHAINING
// const calcDisplaySummary = function (movement) {
//   const sumIn = movement.reduce(
//     (sum, mov, i) => (mov > 0 ? sum + mov : sum),
//     0
//   );
//   const sumOut = movement.reduce(
//     (sum, mov, i) => (mov < 0 ? sum + mov : sum),
//     0
//   );
//   const depositInterest = movement
//     .filter((mov) => mov > 0)
//     .map((deposit) => deposit * 0.012)
//     .filter((int) => int >= 1)
//     .reduce((sum, int) => sum + int, 0);

//   labelSumIn.textContent = `${sumIn} ₤`;
//   labelSumOut.textContent = `${Math.abs(sumOut)} ₤`;
//   labelSumInterest.textContent = `${depositInterest} ₤`;
// };


const updateUI = function (acc) {
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
}


// USERNAME CREATION AND ADDITION TO THE ACCOUNTS
function createUsername(accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
}
createUsername(accounts);

let currentAccount;




// // FAKE ALWATS LOGGED IN 
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);;
// const month = `${now.getMonth()}`.padStart(2, '0'); 
// const year = now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();

// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`





// LOGIN
btnLogin.addEventListener("click", function (e) {
  // Prevents the form from reloading when btn is clicked
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // To display the welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner
      .split(" ")
      .at(0)}`;

    // To display the UI
    containerApp.style.opacity = 1;

    // Empty the login input fields
    inputLoginUsername.value = inputLoginPin.value = "";

    // Remove focus from inputPin field
    inputLoginPin.blur();

    // To display movements, balance and summary 
    updateUI(currentAccount);
  }
});

// TRANSFER 
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = inputTransferAmount.value;
  const receiverAcct = accounts.find(acc => acc.username === inputTransferTo.value);

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcct &&
    currentAccount.username !== receiverAcct?.username
  ) {
    receiverAcct.movements.push(+amount);
    currentAccount.movements.push(-amount);
    updateUI(currentAccount);
    console.log(currentAccount.balance, receiverAcct.balance);
  }
    // Empty the transfer input fields
    inputTransferAmount.value = inputTransferTo.value = "";

    // Remove focus from inputTransferAmount field
    inputTransferAmount.blur();
  });
;

// REQUEST LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  loanAmount = Number(inputLoanAmount.value);
  if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= (loanAmount * 0.1))) {
    // Add loan to account movements
    currentAccount.movements.push(+loanAmount);
    updateUI(currentAccount);
    // Empty the loan input field
    inputLoanAmount.value = "";

    // Remove focus from loan input field
    inputLoanAmount.blur();
  }
})


// CLOSE ACCOUNT

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const closeUser = inputCloseUsername.value;
  const closePin = Number(inputClosePin.value);
  if (
    currentAccount.username === closeUser &&
    currentAccount.pin === closePin
  ) {
    // find account's index in accounts array
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
  // Empty the close account input fields
  inputCloseUsername.value = inputClosePin.value = "";

  // Remove focus from inputClosePin field
  inputClosePin.blur();
})

//  Create a state variable
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  // To flip the state variable so we a go back and forth between the states 
  sorted = !sorted;
});


