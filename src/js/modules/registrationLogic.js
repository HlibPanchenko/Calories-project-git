const form = document.querySelector(".form-registration");
const btnSignIn = document.querySelector(".card-registr__sign-in-btn");
const card = document.querySelector(".card-registr");
const cardRegistration = document.querySelector('[data-block="registration"]');
const cardSignIn = document.querySelector('[data-block="sign-in"]');
console.log(cardSignIn);
cardRegistration.addEventListener("submit", getDataFromRegistration);
cardSignIn.addEventListener("submit", getDataFromSignIn);
document.addEventListener("click", showSignInForm);

function getDataFromRegistration(e) {
  e.preventDefault();

  const regForm = document.querySelector("#form-1");
  // get data from form
  const inputName = regForm.querySelector(".form-registration__name");
  const inputEmail = regForm.querySelector(".form-registration__email");
  const inputPassword = regForm.querySelector(".form-registration__password");

  const dataObj = {
    name: inputName.value,
    email: inputEmail.value,
    password: inputPassword.value,
  };

  // отправка данных на бек
  const url = ""; // вставь суда ссылку на бек

  (async () => {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });
    const content = await rawResponse.json();

    console.log(content);
  })();

  // fetch(url,
  // {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     method: "POST",
  //     body: JSON.stringify(dataObj)
  // })
  // .then(res => console.log(res))
  // .catch(err => console.log('Error', err))

  console.log(dataObj);
  // очистка формы
  inputName.value = "";
  inputEmail.value = "";
  inputPassword.value = "";
}

function getDataFromSignIn(e) {
  e.preventDefault();

  // get data from form
  const signForm = document.querySelector("#form-2");
  const inputName = signForm.querySelector(".form-registration__name");
  const inputEmail = signForm.querySelector(".form-registration__email");
  const inputPassword = signForm.querySelector(".form-registration__password");

  const dataObj = {
    name: inputName.value,
    email: inputEmail.value,
    password: inputPassword.value,
  };

  console.log(dataObj);

  // отправка данных на бек
  const url = ""; // вставь суда ссылку на бек

  (async () => {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });
    const content = await rawResponse.json();

    console.log(content);
  })();
  // очистка формы
  inputName.value = "";
  inputEmail.value = "";
  inputPassword.value = "";
}

function showSignInForm(e) {
  if (e.target.dataset.id == "sign-in") {
    console.log("pizda");
    cardRegistration.classList.add("hide");
    cardSignIn.classList.remove("hide");
  }

  if (e.target.dataset.id == "create-account") {
    console.log("xuy");
    cardRegistration.classList.remove("hide");
    cardSignIn.classList.add("hide");
  }
}
