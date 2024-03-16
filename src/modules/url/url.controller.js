const autoBind = require("auto-bind");
const { URLService } = require("./url.service");
const { ErrorHandler } = require("../../common/errorHandler");

class URLController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = URLService;
  }

  create(req, res, next) {
    try {
      const { url } = req.params;
      throw ErrorHandler.createError({
        data: null,
        statusCode: 401,
        message: "unAuthorized",
      });
    } catch (err) {
      next(err);
    }
  }

  get(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  URLController: new URLController(),
};
