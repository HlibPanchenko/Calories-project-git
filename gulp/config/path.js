// Получаем имя папки проекта
// import { src } from "gulp";
// import { src } from "gulp";
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve()); // Basename получает (извлекает) имя файла из пути, а метод path.resolve() генерирует путь
// rootFolder  в нашем случае gulp-2022

const buildFolder = `./dist`; // папка с результатом  будет создаватся автоматически, так же можно использовать название текущего проекта - rootFolder
const srcFolder = `./src`; // папка с исходниками

// папка с результатом  будет создаватся автоматически. Файлы из src (исходник) будут обрабатоваться и переносится в папку dist (папка с результатом)
// именно поэтому у нас будет обьект путей к исходным файлам (path.src) и обьект путей к папке с результатом (path.build)
// Обьект path.watch - мы отдельно укажем пути к файлам и папкам, за которыми должен следить наш gulp, и при любых изменениях выполнять определенные действия

// Хранится вся информация о пути к тому или иному файлу или папке
export const path = {
  // в Build и SRC настроим пути, а именно перенос (копирование) файлов из файла с исходников, в файл с результатом
  // все файлы с src перенесем в папку dist.
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: `test`, // сможем указывать папку на удаленном ftp сервере
};
