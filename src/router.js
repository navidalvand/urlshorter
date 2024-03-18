const { urlRoutes } = require("./modules/url/url.routes");

const router = require("express").Router();

router.use("/shorter", urlRoutes);
router.use("/", (req, res, next) => {
  res.redirect("/docs");
});

module.exports = {
  mainRoutes: router,
};
