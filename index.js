const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { mainRoutes } = require("./src/router");
const { swaggerDocs } = require("./src/config/swagger.config");
const { ErrorHandler } = require("./src/common/errorHandler");
const mongoose = require("mongoose");
const { connectMongoDB } = require("./src/config/mongoose.config");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

const mongoURI = process.env.MONGO_DB_URL;

connectMongoDB(mongoose, mongoURI);

require("./src/config/redis.config");

swaggerDocs(app);

app.use(mainRoutes);

app.use((err, req, res, next) => {
  ErrorHandler.sendError(err, req, res, next);
});
const port = process.env.PORT;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`server running on port ${port}`);
});
