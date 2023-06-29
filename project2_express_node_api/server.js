const express = require("express");
const app = express();

const PORT = process.env.PORT || 5500;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("You get / route");
});

app.listen(PORT, () => {
  console.log(`Server up and running on PORT:${PORT}`);
});
