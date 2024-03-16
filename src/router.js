const {urlRoutes} = require("./modules/url/url.routes");

const router = require("express").Router();

router.use('/shorter' , urlRoutes)

module.exports = {
  mainRoutes: router,
};
