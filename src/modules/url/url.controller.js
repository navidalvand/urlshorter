const autoBind = require("auto-bind");
const { URLService } = require("./url.service");

class URLController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = URLService;
  }

  async create(req, res, next) {
    try {
      const { url } = req.params;

      const shortedURL = await this.#service.create(url);

      res.send(`shorted url : ${shortedURL}`);
    } catch (err) {
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.#service.get(id);
      res.redirect(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  URLController: new URLController(),
};
