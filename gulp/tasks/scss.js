// плагины для компиляторов
import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; //сжатие CSS файла
import webpcss from "gulp-webpcss"; // вывод WEBP изображений
import autoprefixer from "gulp-autoprefixer"; // добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Группировка медиа запросов

const sass = gulpSass(dartSass); // передаем компилятор

export const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: app.isDev }) // получаем доступ к файлу style.scss. Sourcemaps: true - мы хотим видеть в каком именно файле написан стиль
      // обработка ошибок
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(app.plugins.replace(/@img\//g, "../img/")) // @img => img
      .pipe(
        sass({
          outputStyle: "expanded",
        })
      )
      // После того как мы скомпилировали наш файл с помощью плагина sass, займемся его прокачкой.
      .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          webpcss({
            webpClass: ".webp",
            noWebpClass: ".no-webp",
          })
        )
      )
      .pipe(
        app.plugins.if(
          app.isBuild,
          autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: true,
          })
        )
      )
      // вдруг нам будет нужно посмотреть на не сжаттый файл со стилями
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.if(app.isBuild, cleanCss())) // сжатие нашего файла стилей
      .pipe(
        rename({
          extname: ".min.css", // переименовать файл чтобы он назывался style.min.css.
        })
      )
      .pipe(app.gulp.dest(app.path.build.css)) // вигружаем все в папку с результатом
      .pipe(app.plugins.browsersync.stream())
  ); // обновляем браузер
};
