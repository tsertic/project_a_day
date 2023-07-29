const express = require("express");
const app = express();
require("dotenv").config();
require("colors");
const morgan = require("morgan");
//CONSTANTS
const PORT = process.env.PORT || 5678;
//MIDLEWARES
app.use(express.json());
if (process.env.NODE_ENV === "dev") {
  console.log(morgan("dev"));
}

//ROUTES

//SERVER
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`.green);
});

process.on("unhandledRejection", (err, promise) => {
  console.error(`ERROR: ${err}`.red.bold);
  server.close(() => process.exit(1));
});
