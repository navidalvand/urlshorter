const redisDB = require("redis");
require('dotenv').config();
const redisURI = process.env.REDIS_URI
const redisClient = redisDB.createClient({
  url: redisURI,
});
redisClient.connect();
redisClient.on("connect", () => console.log("connecting to redis"));
redisClient.on("ready", () => console.log("redis is ready to use"));
redisClient.on("err", (err) => console.log(err));
redisClient.on("end", () => console.log("redis connection closed"));

module.exports = redisClient;
