import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
  return app.gulp
    .src(`${app.path.src.svgicons}`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: `../icons/icons.svg`,
            // создать страницу с перечнем иконок
            example: true, // будет создан HTML файл с превью этих иконок
          },
        },
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.images}`));
};

// import svgSprite from "gulp-svg-sprite";

// export const svgSprive = () => {
//   return app.gulp
//     .src(app.path.src.svgicons, {})
//     .pipe(
//       app.plugins.plumber(
//         app.plugins.notify.onError({
//           title: "SVG",
//           message: "Error: <%= error.message %>",
//         })
//       )
//     )
//     .pipe(
//       svgSprite({
//         mode: {
//           stack: {
//             sprite: `../icons/icons.svg`, //тут создасться спрайт
//             example: true, //создание превью со всемя спрайтами
//           },
//         },
//       })
//     )
//     .pipe(app.gulp.dest(app.path.build.images));
// };
