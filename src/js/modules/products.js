const btn = document.querySelector(".section-addProducts__btn");
const closeBtn = document.querySelector(".slide-menu__closeModal");
const modal = document.querySelector(".slide-menu");
const menuSlider = document.querySelector(".product-counter");
const list = document.querySelector(".slide-menu__list"); //ul
const arrow = document.querySelector(".product-counter__arrow-back");
const range = document.querySelector(".product-counter__input");
const btnAddProduct = document.querySelector(".product-counter__btn");
const ulList = document.querySelector(".added-product__list");
const editModalWindow = document.querySelector(".edit-product");
const deleteProductBtn = document.querySelector(".added-product__close");

// events
btn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
list.addEventListener("click", openProduct);
arrow.addEventListener("click", closeMenuSlider);
document.addEventListener("input", rangeAndCountCalories);
document.addEventListener("input", rangeAndCountCalories2);
document.addEventListener("click", addProductToCart);
ulList.addEventListener("click", editProduct);
document.addEventListener("click", addEditedProduct);
document.addEventListener("click", deleteProduct);

// перед началом работы рендерим на страинцу те продукты, которые лежат в БД
window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/my-products")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        // разметка
        const markUp = `<li class="added-product__item" data-productName =${product.name} data-id = ${product.id} data-caloriesInBD=${product.caloriesInBD} >
        <div class="added-product__content"> 
    
        <div class="added-product__left">
      <div class="added-product__img">
        <img src="./img/img products/${product.src}.png" alt="">
      </div>
      <div class="added-product__title">${product.name}</div>
    </div>
    <div class="added-product__right">
      <div class="added-product__calories">${product.calories} калорий </div>
      <div class="added-product__quantity">${product.quantity} грамм</div>
     
    </div>
        </div>
        <div class="added-product__close"></div>
  </li>`;

        const ulList = document.querySelector(".added-product__list");
        // рендерим на страницу
        ulList.insertAdjacentHTML("beforeend", markUp);
        countCalories();
      });
    });
});

//logic
function openModal() {
  modal.classList.add("slide-menu_active");
  list.innerHTML = "";
  //render
  getData().then((products) => {
    products.forEach((product) => {
      // console.log(product);
      const markup = `<li class="slide-menu__item product-card" data-productName =${product.name} ">
    <div class="product-card__body" data-name="${product.src}" data-calories="${product.calories}" data-id="${product.id}">
      <div class="product-card__img">
        <img src="./img/img products/${product.src}.png" alt="" />
      </div>
      <h2 class="product-card__title">${product.name}</h2>
    </div>
  </li>`;
      list.insertAdjacentHTML("beforeend", markup);
    });

    // console.log(products);
  });
}

function closeModal() {
  modal.classList.remove("slide-menu_active");
  menuSlider.classList.remove("product-counter_active");
}

function closeMenuSlider() {
  menuSlider.classList.remove("product-counter_active");
}

// open product and show counter
function openProduct(e) {
  console.log(e.target); //product-card__body
  const out = document.querySelector(".product-counter__out");
  out.innerHTML = "";
  menuSlider.classList.add("product-counter_active");
  console.log(e.target.dataset);
  const infoAboutProduct = {
    id: e.target.dataset.id,
    name: e.target.querySelector(".product-card__title").innerHTML,
    src: e.target.dataset.name,
    calories: e.target.dataset.calories,
  };

  console.log(infoAboutProduct);

  const markUp = `<div class="product-counter__card" data-id ="${infoAboutProduct.id}">
  <div class="product-counter__wrapper1">
    <div class="product-counter__img">
      <img
        src="./img/img products/img big size products/${infoAboutProduct.src}-xl-size.png"
        alt=""
      />
    </div>
    <h2 class="product-counter__title">
      <span> Имя продукта: </span> ${infoAboutProduct.name}
    </h2>
  </div>
  <div class="product-counter__wrapper2">
    <div class="product-counter__info-card">

      <div class="product-counter__portion">Порция</div>
      <div class="product-counter__range">
        <input
          type="range"
          class="product-counter__input"
          min="0"
          max="300"
          value="0"
        />
        <div class="product-counter__num">
          <span class="product-counter__quantity-gramm">
            0</span
          >
          <span class="product-counter__span"> грамм</span>
        </div>
      </div>
      <ul class="product-counter__portions" data-calories="${infoAboutProduct.calories}" data-product="${infoAboutProduct.src}" data-id ="${infoAboutProduct.id}">
      <li class="product-counter__one-portion">
      <div class="product-counter__gramm">
        В 100 граммах ${infoAboutProduct.name} <span> ${infoAboutProduct.calories} </span> каллорий
      </div>
    </li>
    <li class="product-counter__one-portion">
      <div class="product-counter__gramm">
        Одна порция ${infoAboutProduct.name} - это 150 грамм
      </div>
    </li>
    <li class="product-counter__one-portion">
      <div class="product-counter__gramm" >
        Вы съели <span data-summonFood="all-food"> 0 </span>  каллорий
      </div>
    </li>
      </ul>
      <button class="product-counter__btn button-addProduct">
        Добавить продукт
      </button>
    </div>
  </div>
</div>`;

  out.insertAdjacentHTML("beforeend", markUp);
}

//range and count calories
function rangeAndCountCalories(e) {
  if (e.target.classList.contains("product-counter__input")) {
    const out = document.querySelector(".product-counter__quantity-gramm");
    out.innerHTML = e.target.value;
    const inputBox = e.target.closest(".product-counter__range");
    const card = inputBox.closest(".product-counter__info-card");
    const nameOfCurrentCard = card.querySelector("[data-product]");
    const caloriesOfProduct = nameOfCurrentCard.dataset.calories;
    const haveEaten = document.querySelector('[data-summonFood="all-food"]');
    const amountOfCalories =
      (parseInt(e.target.value) * parseInt(caloriesOfProduct)) / 100;
    haveEaten.innerText = amountOfCalories;
  }
}

// add product to your daily ration
function addProductToCart(e) {
  let k = false;
  const card = e.target.closest(".product-counter__info-card");
  if (e.target.classList.contains("button-addProduct")) {
    if (card.querySelector(".product-counter__input").value > 0) {
      const name = card.querySelector("[data-product]").dataset.product;
      const id = e.target
        .closest(".product-counter__info-card")
        .querySelector(".product-counter__portions").dataset.id;
      const quantity = card.querySelector(".product-counter__input").value;
      const calories = card.querySelector(
        '[data-summonfood="all-food"]'
      ).innerText;

      const caloriesInBD = parseInt(
        card.querySelector(".product-counter__gramm").querySelector("span")
          .innerText
      );

      const dataAboutProduct = {
        id,
        name,
        quantity: parseInt(quantity),
        calories: parseInt(calories),
        src: name,
        caloriesInBD,
      };

      console.log(dataAboutProduct);
      // закрываем открытые окна
      modal.classList.remove("slide-menu_active");
      menuSlider.classList.remove("product-counter_active");

      // если продукт уже есть, мы не должны опять  его отрисовывать и добавлять в БДБ надо в существующем просто изменить количество и калории
      const HTMLCollectionOfProducts = ulList.children;
      const arrOfProducts = Array.from(HTMLCollectionOfProducts); // делаем с HTMLCollection массив

      // мы запускаем эту часть кода несколько раз для каждого ли в списке. В этом ошибка\
      // изменил foreach на some
      arrOfProducts.some((el) => {
        if (el.innerText.includes(name)) {
          console.log("ebat");

          // находим в списке продуктов нужный нам, и меняем у него калории и грамы
          const alreadyExistedProduct = ulList.querySelector(
            `[data-productname=${name}]`
          );
          console.log(alreadyExistedProduct);
          let caloriesOfAlreadyExistedProduct = +alreadyExistedProduct
            .querySelector(".added-product__calories")
            .innerText.replace(/\D+\.?\D+/g, ""); // калории
          // console.log(caloriesOfAlreadyExistedProduct);

          let quantityOfAlreadyExistedProduct = +alreadyExistedProduct
            .querySelector(".added-product__quantity")
            .innerText.replace(/\D+\.?\D+/g, ""); // граммы
          // console.log(quantityOfAlreadyExistedProduct);

          // добавляем калории и граммы уже к существующим продуктам
          caloriesOfAlreadyExistedProduct =
            parseInt(caloriesOfAlreadyExistedProduct) + parseInt(calories);
          quantityOfAlreadyExistedProduct =
            parseInt(quantityOfAlreadyExistedProduct) + parseInt(quantity);

          // console.log(caloriesOfAlreadyExistedProduct);
          alreadyExistedProduct.querySelector(
            ".added-product__calories"
          ).innerText = caloriesOfAlreadyExistedProduct + " калорий";

          alreadyExistedProduct.querySelector(
            ".added-product__quantity"
          ).innerText = quantityOfAlreadyExistedProduct + " грамм";

          // добавляем калории и граммы уже к существующим продуктам в БД

          //надо заменить калории и количество на quantityOfAlreadyExistedProduct и caloriesOfAlreadyExistedProduct
          const updatedProduct = {
            id,
            name,
            quantity: parseInt(quantityOfAlreadyExistedProduct),
            calories: parseInt(caloriesOfAlreadyExistedProduct),
            src: name,
            caloriesInBD,
          };

          fetch(`http://localhost:3000/my-products/${updatedProduct.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          })
            .then((res) => res.json())
            .then((json) => countCalories());

          k = true;
        }
      });
      if (k == false) {
        console.log("cats");
        // // записываем новые продукты в массив в бд
        fetch("http://localhost:3000/my-products", {
          method: "POST",
          body: JSON.stringify(dataAboutProduct),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            countCalories();
          });

        // // разметка
        const markUp = `<li class="added-product__item" data-id =${dataAboutProduct.id} data-productName =${dataAboutProduct.name} data-caloriesInBD=${dataAboutProduct.caloriesInBD}>
        <div class="added-product__content"> 
        <div class="added-product__left">
      <div class="added-product__img">
        <img src="./img/img products/${dataAboutProduct.name}.png" alt="">
      </div>
      <div class="added-product__title">${dataAboutProduct.name}</div>
    </div>
    <div class="added-product__right">
      <div class="added-product__calories">${dataAboutProduct.calories} калорий </div>
      <div class="added-product__quantity">${dataAboutProduct.quantity} грамм</div>
     
    </div>
        </div>
        <div class="added-product__close"></div>
</li>`;

        // рендерим на страницу
        ulList.insertAdjacentHTML("beforeend", markUp);

        k = true;
      }
    }
  }
}

function editProduct(e) {
  if (e.target.classList.contains("added-product__content")) {
    console.log(e.target); // <div class="added-product__content"></div>
    const liProduct = e.target.closest(".added-product__item"); // <li class="added-product__item"/>
    editModalWindow.classList.add("edit-product_active");

    const data = {
      id: liProduct.dataset.id,
      name: liProduct.dataset.productname,
      quantity: parseInt(
        liProduct
          .querySelector(".added-product__quantity")
          .innerText.replace(/\D+\.?\D+/g, "")
      ),
      calories: parseInt(
        liProduct
          .querySelector(".added-product__calories")
          .innerText.replace(/\D+\.?\D+/g, "")
      ),
      caloriesInBD: liProduct.dataset.caloriesinbd,
    };

    console.log(data);
    const out = document.querySelector(".edit-product__content");
    const markUp = `<div class="product-counter__card" data-id ="${data.id}" >
  <div class="product-counter__wrapper1">
    <div class="product-counter__img">
      <img
        src="./img/img products/img big size products/${data.name}-xl-size.png"
        alt=""
      />
    </div>
    <h2 class="product-counter__title">
      <span> Имя продукта: </span> ${data.name}
    </h2>
  </div>
  <div class="product-counter__wrapper2">
    <div class="product-counter__info-card" data-name ="${data.name}">

      <div class="product-counter__portion">Порция</div>
      <div class="product-counter__range">
        <input
          type="range"
          class="product-counter__input2"
          min="0"
          max="300"
          value="${data.quantity}"
        />
        <div class="product-counter__num">
          <span class="product-counter__quantity-gramm">
          ${data.quantity}</span
          >
          <span class="product-counter__span"> грамм</span>
        </div>
      </div>
      <ul class="product-counter__portions" data-calories="${data.calories}" data-product="${data.name}" data-id ="${data.id}" data-caloriesInBD="${data.caloriesInBD}">
      <li class="product-counter__one-portion">
      <div class="product-counter__gramm">
        В 100 граммах ${data.name} ${data.caloriesInBD} каллорий
      </div>
    </li>
    <li class="product-counter__one-portion">
      <div class="product-counter__gramm">
        Одна порция ${data.name} - это 150 грамм
      </div>
    </li>
    <li class="product-counter__one-portion">
      <div class="product-counter__gramm" >
        Вы съели <span data-summonFood="all-food"> ${data.calories} </span>  каллорий
      </div>
    </li>
      </ul>
      <button class="product-counter__btn button-edit">
       Редактировать
      </button>
    </div>
  </div>
</div>`;

    out.insertAdjacentHTML("beforeend", markUp);

    out
      .closest(".edit-product")
      .querySelector(".edit-product__close")
      .addEventListener("click", () => {
        editModalWindow.classList.remove("edit-product_active");
        out.innerHTML = "";
      });
  }
}
//
function rangeAndCountCalories2(e) {
  if (e.target.classList.contains("product-counter__input2")) {
    console.log("gavno");
    const input = e.target;
    const card = input.closest(".product-counter__info-card");
    console.log(card);
    const outGram = card.querySelector(".product-counter__quantity-gramm");
    outGram.innerHTML = e.target.value;
    const outCalories = card.querySelector('[data-summonfood="all-food"]');

    const nameOfCurrentCard = card.querySelector("[data-product]");
    const caloriesOfProduct = nameOfCurrentCard.dataset.caloriesinbd;
    const amountOfCalories =
      (parseInt(e.target.value) * parseInt(caloriesOfProduct)) / 100;
    outCalories.innerText = amountOfCalories;
  }
}

function addEditedProduct(e) {
  if (e.target.classList.contains("button-edit")) {
    console.log("sesichka suchka");
    const card = e.target.closest(".product-counter__info-card");
    const name = card.dataset.name;
    const id = card.querySelector(".product-counter__portions").dataset.id;
    const quantity = card.querySelector(
      ".product-counter__quantity-gramm"
    ).innerText;
    const calories = card.querySelector(
      '[data-summonfood="all-food"]'
    ).innerText;

    const dataAboutProduct = {
      id,
      name,
      quantity: parseInt(quantity),
      calories: parseInt(calories),
    };

    console.log(dataAboutProduct);

    // закрываем открытые окна
    editModalWindow.classList.remove("edit-product_active");
    const out = document.querySelector(".edit-product__content");
    out.innerHTML = "";

    // перезаписываем значение калорий и вес
    const productToChange = ulList.querySelector(
      `[data-productname = ${dataAboutProduct.name}]`
    );
    console.log(productToChange); // li
    productToChange.querySelector(".added-product__quantity").innerText =
      dataAboutProduct.quantity + " грамм";
    productToChange.querySelector(".added-product__calories").innerText =
      dataAboutProduct.calories + " калорий";

    // Записываем обновленные данные в БД

    fetch(`http://localhost:3000/my-products/${dataAboutProduct.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataAboutProduct),
    })
      .then((res) => res.json())
      .then((json) => countCalories());
  }
}

function deleteProduct(e) {
  if (e.target.classList.contains("added-product__close")) {
    console.log("kotiki");
    const productWeWantToDelete = e.target.closest("li");
    console.log(productWeWantToDelete);
    const id = productWeWantToDelete.dataset.id;
    console.log(id);
    // удаляем продукт с разметки
    productWeWantToDelete.remove();

    // удаляем с БД
    fetch(`http://localhost:3000/my-products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => countCalories());
  }
}

//get data
async function getData() {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  return data;
}

// считать сколько всего калорий
function countCalories() {
  const allCalories = document.querySelector(".section-addProducts__num");
  fetch("http://localhost:3000/my-products")
    .then((response) => response.json())
    .then((data) => {
      let sumOfCalories = 0;
      data.forEach((product) => {
        sumOfCalories += parseInt(product.calories);
      });
      allCalories.innerText = sumOfCalories;
    });
}
