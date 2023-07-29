const express = require("express");
const app = express();
require("dotenv").config();
require("colors");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./mongodb/connect");
const todosRoutes = require("./routes/todos");
//CONSTANTS
const PORT = process.env.PORT || 5678;
//DB
connectDB();
//MIDLEWARES
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "dev") {
  console.log(morgan("dev"));
}
//ROUTES
app.use("/v1/todos", todosRoutes);
//SERVER
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`.green);
});

process.on("unhandledRejection", (err, promise) => {
  console.error(`ERROR: ${err}`.red.bold);
  server.close(() => process.exit(1));
});
