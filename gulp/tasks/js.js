import webpack from "webpack-stream";

export const js = () => {
  return (
    app.gulp
      .src(app.path.src.js, { sourcemaps: app.isDev }) //карты исходников чтобы видеть в каком файле ошибка
      // обработка ошибок
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(
        webpack({
          mode: app.isBuild ? "production" : "development",
          output: {
            filename: "app.min.js",
          },
        })
      )
      .pipe(app.gulp.dest(app.path.build.js)) // выгружаем файл в папку с результатом
      .pipe(app.plugins.browsersync.stream())
  ); // обновляем страницу
};
