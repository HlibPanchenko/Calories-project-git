import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
  return (
    app.gulp
      .src(app.path.src.images) // получили доступ к файлам
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "Images",
            message: "Error: <%= error.message %>",
          })
        )
      )

      // Проверяем картинки в папке с результатом чтобы обрабатовать только те которые еще не обработаны
      .pipe(app.plugins.newer(app.path.build.images))
      // создадим изображение webp
      .pipe(app.plugins.if(app.isBuild, webp()))
      // после того как изображения созданы, нам надо их выгрузить в папку с результатом
      .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images)))
      // опять получаем доступ к изображениям в папке с исходниками
      .pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images)))
      // и опять проверяем на обновления
      .pipe(
        app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images))
      )
      // создаем задачу, с помощью которой мы будем картинки сжимать
      .pipe(
        app.plugins.if(
          app.isBuild,
          imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3, // 0 to 7 -  на сколько сильно надо сжимать изображение
          })
        )
      )
      // выгружаем оптимизированые картинки в папку с результатом
      .pipe(app.gulp.dest(app.path.build.images)) // отправляем файлы на результат
      .pipe(app.gulp.src(app.path.src.svg)) // подключаем доступ к svg изображениям в папке исходников
      .pipe(app.gulp.dest(app.path.build.images)) // копируем их в изображения в папке с результатом
      .pipe(app.plugins.browsersync.stream())
  );
};
