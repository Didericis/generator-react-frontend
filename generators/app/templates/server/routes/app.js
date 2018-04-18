const { Router }= require('express');
const path = require('path');

module.exports = () => {
  const router = new Router();

  router.get('*', (req, res) => {
    res.render(path.resolve(__dirname, '../templates/index.html'), {
      script: '/js/app.js',
      styles: '/css/app.css'
    });
  });

  return router;
}
