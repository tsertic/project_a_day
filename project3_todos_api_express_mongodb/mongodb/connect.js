const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to host: ${dbConnection.connection.host}`.yellow);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
