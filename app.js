const BASE_URL =
  "https://v6.exchangerate-api.com/v6/69d562e48c19c5e85dc371ee/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const exchangeBtn = document.querySelector("form button");
const fromCurr = document.querySelector("form select");
const toCurr = document.querySelector(".to select");
const finalMsg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currencyCode in countryList) {
    // both these for loops are to add all countries in the dropdown
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencyCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let enteredAmount = document.querySelector(".amount input");
  let amtVal = enteredAmount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    enteredAmount.value = "1";
  }

  //    console.log(fromCurr.value, toCurr.value);
  const URL = `${BASE_URL}/${fromCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let conversion_rates = data["conversion_rates"];
  let exchangeRate = conversion_rates[toCurr.value];

  let finalAmount = amtVal * exchangeRate;

  finalMsg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  // here the element is select tag
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

exchangeBtn.addEventListener("click", (evt) => {
  evt.preventDefault(); // removes the unnecessary URL whenever the page refreshes
  updateExchangeRate();
});

window.addEventListener("load", () => {         
  updateExchangeRate();
});
// when the window loads for the first time, we give the finalAmount immediately for the default value of 100(enteredAmount)