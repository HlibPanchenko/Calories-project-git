// burger
/** Нам нужно чтобы при нажатии на header__burger
 * добавлялся class "active" для header__burger и
 * header__menu  */

//Jquery
$(document).ready(function () {
  $(".icon-menu").on("click", function (event) {
    $(".menu__body, .icon-menu").toggleClass("_active");
    $("body").toggleClass("lock"); // при открытом бургер меню не скроллится контент
  });
});


//JS
// let header__burger = document.querySelector('.header__burger');
// let header_menu = document.querySelector('.header__menu');
// let back = document.querySelector('body');
// let header__list = document.querySelector('.header__list');

// header__burger.addEventListener('click', addActive)
// header__list.addEventListener('click', addActive)

// function addActive(e) {
// 	// e.target.classList.toggle('active')
// 	// console.log(e.target);
// 	header__burger.classList.toggle('active');
// 	    header_menu.classList.toggle('active');
// }
