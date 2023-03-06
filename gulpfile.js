//основной модуль
import gulp from "gulp";
// импорт путей
import { path } from "./gulp/config/path.js";

// импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// теперь мы можем рабоатть с этими обьктами: gulp и path

// у нас кроме файла gulpfile.js, у нас будет множество других файлов, в этих файлах будут использоваться одни и те же сущности, например пути, поэтому для удобства создадим глобальный обьект, в котором будем хранить общие сущности.
// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes("--build"), // если переменнаю хранит флаг build, значит это режим продакшн
  isDev: !process.argv.includes("--build"), // если переменнаю не хранит флаг build, значит это режим разработчика
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Создадим отдельный файл для конкретной задачи, а именно копирование файлов
// Переходим в папку tasks и создаемм файл copy.js

//импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// Наблюдатель за изминениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy); // •	Путь к файлам, за которыми нужно следить; •	Действие которое нужно выполнить
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { svgSprive };

// Последовательная  обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Основные задачи
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценариев
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

// Выполнения сценария по умолчанию
gulp.task("default", dev);

// // Для того чтобы выполнить нашу задачу copy, нам необходимо указать ее временно, как задачу по умолчанию
// // Выполнения сценария по умолчанию
// // Регистрируем функцию copy как задачу
// //"default" - задача выполняется по умолчанию
// gulp.task("default", copy);

// Пришло время создать папку files в папке src
