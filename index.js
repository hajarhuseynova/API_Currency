const api_key = "29732496400fda6f781225a3";
const url = "https://v6.exchangerate-api.com/v6/" + api_key;

const currencyOne = document.getElementById("currency-one");
const listOne = document.getElementById("list-one");

const currencyTwo = document.getElementById("currency-two");
const listTwo = document.getElementById("list-two");

const amount = document.getElementById("amount");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");

fetch(url + "/codes")
  .then((res) => res.json())
  .then((data) => {
    const items = data.supported_codes;
    let options;
    for (const item of items) {
      options += `
        <option value='${item[0]}'>${item[1]}</option>
        `;
      listOne.innerHTML = options;
      listTwo.innerHTML = options;
    }
  });

calculate.addEventListener("click", function () {
  const from = currencyOne.value;
  const to = currencyTwo.value;
  const amoun = amount.value;
  fetch(url + "/latest/" + from)
    .then((res) => res.json())
    .then((data) => {
      const sonuc = (data.conversion_rates[to] * amoun).toFixed(3);
      result.innerHTML = `
      <div class="card border-primary">
      <div class="card-body text-center" style="font-size: 30px">
      ${amoun} ${from} = ${sonuc} ${to}</div>
    </div>
      `;
    });
});
