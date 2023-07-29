const express = require("express");
const app = express();

const PORT = process.env.PORT || 5678;

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
