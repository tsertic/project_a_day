const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const mongoDbConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(mongoDbConnection.connection.host);
  } catch (error) {
    console.error(error);
  }
};
