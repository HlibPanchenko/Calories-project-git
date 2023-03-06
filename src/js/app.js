// Проверяем поддерживает ли браузер картинки WEBp

// import * as flsFunctions from "./modules/functions.js";

// flsFunctions.isWebp();

testWebP(document.documentElement);

function testWebP(elem) {
  const webP = new Image();
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  webP.onload = webP.onerror = function () {
    webP.height === 2
      ? elem.classList.add("webp")
      : elem.classList.add("no-webp");
  };
}

// Подключаем другие файлы которые нам нужны
// Чтобы использовать модули, в папке modules создаем js файл, который нам нужен, а потом подключаем его в этот файл как указано ниже - import "./modules/burger.js";
// burger menu
import "./modules/burger.js";
// import "./modules/registrationLogic.js";
import "./modules/products.js";
