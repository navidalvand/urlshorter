const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { mainRoutes } = require("./src/router");
const { swaggerDocs } = require("./src/config/swagger.config");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

const port = process.env.PORT;
swaggerDocs(app, port);

app.use(mainRoutes);

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`server running on http://localhost:${port}/`);
});
