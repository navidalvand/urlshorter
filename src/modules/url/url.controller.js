const autoBind = require("auto-bind");
const { URLService } = require("./url.service");
const { ErrorHandler } = require("../../common/errorHandler");
const { URLModel } = require("./url.model");
const redisClient = require("../../config/redis.config");

class URLController {
  #service;
  #model;
  constructor() {
    autoBind(this);
    this.#service = URLService;
    this.#model = URLModel;
  }

  async create(req, res, next) {
    try {
      const { url } = req.params;

      const createURL = await this.#model.create({ URL: url });
      const mongoID = createURL._id.toString();

      const oneDayTimeOut = 1000 * 60 * 60 * 24;

      setTimeout(async () => {
        const result = await this.#model.findByIdAndDelete(mongoID);
        console.log(`deleted : ${result}`);
      }, oneDayTimeOut);

      const set = await redisClient.set(mongoID, url);

      // throw ErrorHandler.createError({
      //   data: null,
      //   statusCode: 401,
      //   message: "unAuthorized",
      // });

      res.send("ok");
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
