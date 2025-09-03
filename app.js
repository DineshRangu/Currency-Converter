const BASE_URL = "http://127.0.0.1:5000/currency";

const dr1 = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dr1) {
  for (let k in countries) {
    let newOption = document.createElement("option");
    newOption.innerText = k;
    newOption.value = k;
    if (select.name === "from" && k === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && k === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let k = element.value;
  let kcode = countries[k];
  let newsrc = `https://flagsapi.com/${kcode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amount.value = "1";
  }


  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data["conversion_rates"][toCurr.value.toUpperCase()];
    if (!rate) {
      document.querySelector(".result").innerText = "Invalid currency selected.";
      return;
    }

    let finalAmount = amountVal * rate;

    document.querySelector(".msg").innerText =
      `${amountVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (err) {
    console.error("Error fetching data:", err);
    let resultBox = document.querySelector(".result");
    if (resultBox) {
      resultBox.innerText = "Conversion failed.";
    }
  }
});
