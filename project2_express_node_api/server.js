const express = require("express");
const app = express();
const cors = require("cors");
const usersRoutes = require("./routes/users");
const PORT = process.env.PORT || 5500;
app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server up and running on PORT:${PORT}`);
});
