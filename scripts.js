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
const displayMovements = function (movements) {
  containerMovements.innerHTML = "";

  movements.forEach(function (mov, i) {
    const type = mov > 1 ? "deposit" : "withdrawal";
    const html = `<div class="movements__row">
         <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
         <div class="movements__value">${mov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}


// CALC AND DISPLAY BALANCE
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((sum, mov, i) => sum + mov, 0);
  labelBalance.textContent = `${balance} ₤`;
};
  


// CALC AND DISPLAY SUMMARY
const calcDisplaySummary = function (movement) {
  const sumIn = movement.reduce(
    (sum, mov, i) => (mov > 0 ? sum + mov : sum),
    0
  );
  const sumOut = movement.reduce(
    (sum, mov, i) => (mov < 0 ? sum + mov : sum),
    0
  );
  const depositInterest = movement
    .filter((mov) => mov > 0)
    .map((deposit) => deposit * 0.012)
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



// USERNAME CREATION AND ADDITION TO THE ACCOUNTS
function createUsername(accs) {
  accs.forEach(function(acc) {
  acc.username = acc.owner
    .toLowerCase()
    .split(" ")
    .map(function (name) {
      return name[0];
    })
    .join("");
})
};
createUsername(accounts);


let currentAccount;

btnLogin.addEventListener('click', function (e) {
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

    // To display movements
    displayMovements(currentAccount.movements);
  }

  // To display balance
  calcDisplayBalance(currentAccount.movements);

  // To display summary
  calcDisplaySummary(currentAccount.movements);


  console.log("LOGIN");
})