const http = require("http");
const path = require("path");
const fs = require("fs");
const fsP = require("fs/promises");
const os = require("os");
const EventEmmiter = require("events");
const { eventLog } = require("./eventLogger");
//init emmiter
class Emmiter extends EventEmmiter {}
const emmiter = new Emmiter();
emmiter.on("log", (message, logName) => eventLog(message, logName));
//PORT
const PORT = process.env.PORT || 4444;
//server stuff
const server = http.createServer((req, res) => {
  emmiter.emit("log", "test", "requests");
  res.end();
});

server.listen(PORT, () => {
  const networkInter = os.networkInterfaces();
  const address = networkInter["Loopback Pseudo-Interface 1"][1].address;
  console.log(`Server is running on address : http://${address}:${PORT}`);
});
