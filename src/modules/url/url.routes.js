const { URLController } = require("./url.controller");

const router = require("express").Router();

router.post("/:url", URLController.create);
router.get("/:id", URLController.get);

module.exports = {
  urlRoutes: router,
};
