const imgC1 = document.getElementById("left-img");
const imgArrow = document.getElementById("mid-img");
const imgC2 = document.getElementById("right-img");
const c1Box = document.getElementById("Currency1Input");
const c2Box = document.getElementById("Currency2Input");
const submit = document.getElementById("submit");
const c1List = document.getElementById("Currency-dropdown-1");
const c2List = document.getElementById("Currency-dropdown-2");

const req = (url, cb) => {
  fetch(url)
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => error);
};

initList();

function initList() {
  req(`/listOfCurrencies`, data => {
    data.forEach(element => {
      const option = document.createElement("option");
      const option2 = document.createElement("option");
      option.innerText = element;
      option2.innerText = element;
      c1List.appendChild(option);
      c2List.appendChild(option2);
    });
    c2List.value = "JOD";
    c1List.value = "USD";
  });
}

c1List.addEventListener("change", () => {
  const lowerC1 = c1List.value.toLowerCase();
  imgC1.src = `https://www.xe.com/themes/xe/images/flags/svg/${lowerC1}.svg`;
});

c2List.addEventListener("change", () => {
  const lowerC2 = c2List.value.toLowerCase();
  imgC2.src = `https://www.xe.com/themes/xe/images/flags/svg/${lowerC2}.svg`;
});

submit.addEventListener("click", event => {
  event.preventDefault();
  const c1 = c1Box.value;
  const c2 = c2Box.value;
  const list1Value = c1List.value;
  const list2Value = c2List.value;
  if (c1 == c2 && c1 == "") alert("Please write an Amount");
  else if (c1 == "") {
    req(`/cal?c1=${list2Value}&c2=${list1Value}&amount=${c2}`, data => {
      c1Box.value = data;
      imgArrow.src = "images/left.png";
    });
  } else {
    req(`/cal?c1=${list1Value}&c2=${list2Value}&amount=${c1}`, data => {
      c2Box.value = data;
      imgArrow.src = "images/right.png";
    });
  }

});
