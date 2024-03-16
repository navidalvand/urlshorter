const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { mainRoutes } = require("./src/router");
const { swaggerDocs } = require("./src/config/swagger.config");
const { ErrorHandler } = require("./src/common/errorHandler");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

swaggerDocs(app);

app.use(mainRoutes);

app.use((err, req, res, next) => {
  ErrorHandler.sendError(err, req, res, next);
});
const port = process.env.PORT;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`server running on http://localhost:${port}/`);
});
