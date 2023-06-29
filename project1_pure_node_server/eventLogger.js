const fs = require("fs");
const fsP = require("fs/promises");
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const eventLog = async (message, logName) => {
  const folderName = "logs";
  const formatedTime = format(new Date(), "dd/MM/yyyy - HH:mm:ss");
  const directoryPath = path.join(__dirname, folderName);
  const filePath = path.join(__dirname, folderName, `${logName}.txt`);
  const loggerErrorfilePath = path.join(
    __dirname,
    folderName,
    `loggerError.txt`
  );
  try {
    if (!fs.existsSync(directoryPath)) {
      await fsP.mkdir(directoryPath);
    }
    const log = `${formatedTime}\t${uuid()}\t${message}\n`;
    await fsP.appendFile(filePath, log);
  } catch (error) {
    console.error(error.message);
    const errorLog = `${formatedTime}\t${uuid()}\t${error.name}:${
      error.message
    }\n`;
    await fsP.appendFile(loggerErrorfilePath, errorLog);
  }
};

module.exports = { eventLog };
