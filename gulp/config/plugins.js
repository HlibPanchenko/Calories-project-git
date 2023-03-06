import replace from "gulp-replace"; // поиск и замена
import plumber from "gulp-plumber"; //обработка ошибок
import notify from "gulp-notify"; // Сообщение (подсказки)
import browsersync from "browser-sync"; // Локальный сервер
import newer from "gulp-newer"; // Проверка обновления
import ifPlugin from "gulp-if"; // Условное ветвление

// Создадим обьект с плагинами, которые будем экспортировать
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  if: ifPlugin,
};
