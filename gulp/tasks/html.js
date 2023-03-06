import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
  return app.gulp
    .src(app.path.src.html) // получили доступ к файлам
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fileinclude()) // собираем наш файл нтмл из частей
    .pipe(app.plugins.replace(/@img\//g, 'img/'))//@img => img
    .pipe(
        app.plugins.if(
            app.isBuild,
            webpHtmlNosvg()
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            versionNumber({
                //добавляется текущая дата и время(антикеширование)
                'value': '%DT%',
                'append': {
                    'key': '_v',
                    'cover': 0,
                    'to': [
                        'css',
                        'js',
                    ]
                },
                'output': {
                    'file': 'gulp/version.json'
                }
            })
        )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream())
}


  //   .pipe(app.plugins.replace(/@img\//g, "img/")) //@img => img
  //   .pipe(webpHtmlNosvg())
  //   .pipe(
  //     versionNumber({
  //       value: "%DT%",
  //       append: {
  //         key: "_v",
  //         cover: 0,
  //         to: ["css", "js"],
  //       },
  //       output: {
  //         file: "gulp/version.json",
  //       },
  //     })
  //   )
  //   .pipe(app.gulp.dest(app.path.build.html)) // отправляем файлы на результат
  //   .pipe(app.plugins.browsersync.stream());
  // };
