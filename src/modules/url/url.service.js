const redisClient = require("../../config/redis.config");
const { URLModel } = require("./url.model");

class URLService {
  #model;
  constructor() {
    this.#model = URLModel;
  }

  async create(url) {
    const createURL = await this.#model.create({ URL: url });
    const mongoID = createURL._id.toString();

    const oneDayTimeOut = 1000 * 60 * 60 * 24;

    setTimeout(async () => {
      const result = await this.#model.findByIdAndDelete(mongoID);
      console.log(`deleted : ${result}`);
    }, oneDayTimeOut);
    await redisClient.set(mongoID, url, { EX: oneDayTimeOut });

    return `http://localhost:3000/shorter/${mongoID}`;
  }

  async get(id) {
    const trueURL = await redisClient.get(id);
    if (!trueURL) {
      const link = await this.#model.findById(id);
      if (!link) throw { statusCode: 404, message: "id not found" };
      return link.URL;
    }
    return trueURL;
  }
}

module.exports = {
  URLService: new URLService(),
};
