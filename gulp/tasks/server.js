export const server = (done) => {
  app.plugins.browsersync.init({
    server: {
      baseDir: `${app.path.build.html}`, // базовая папка откуда нам нужно запустить файлы - папка с результатом проекта
    },
    notify: false, // убираем сообщения в браузере
    port: 3000, // порт для нашего локального сервера
  });
};
