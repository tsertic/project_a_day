const express = require("express");
const app = express();
require("dotenv").config();
require("colors");
const morgan = require("morgan");
const pokemonsV1Router = require("./routes/pokemons.v1.js");
const { connectDB } = require("./mongodb/connect.js");
const { fillDBWithData } = require("./lib/fillMongoDbWIthData.js");
//CONSTANTS
const PORT = process.env.PORT || 5678;

//DB
connectDB();

/* //for mass upload of json data to mongodb cloud
//run once , data is in data/pokemon.json
fillDBWithData();
 */

//MIDDLEWARES

app.use(express.json());

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

//ROUTES
app.use("/v1/pokemons", pokemonsV1Router);

//SERVER
const server = app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`.green);
});

process.on("uncaughtException", (error) => {
  console.error(`ERROR: ${error}`.red);
  server.close(() => process.exit(1));
});
