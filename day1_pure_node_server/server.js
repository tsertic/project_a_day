const http = require("http");
const path = require("path");
const fs = require("fs");
const fsP = require("fs/promises");
const os = require("os");
const EventEmmiter = require("events");
const { eventLog } = require("./eventLogger");
//CONSTS
const pagesFolder = "views";
//init emmiter
class Emmiter extends EventEmmiter {}
const emmiter = new Emmiter();
emmiter.on("log", (message, logName) => eventLog(message, logName));
//PORT
const PORT = process.env.PORT || 4444;
//server stuff
const serveFile = async (filePath, contentType, response) => {};

const server = http.createServer((req, res) => {
  emmiter.emit("log", "test", "requests");
  console.log(req.method, req.url, " METHOD/URL");
  const fileExtension = path.extname(req.url);
  console.log(fileExtension);
  let contentType;
  switch (fileExtension) {
    case ".txt":
      contentType = "txt/plain";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    default:
      contentType = "text/html";
  }
  const checkIfHtml = contentType === "text/html";
  let filePath =
    checkIfHtml && req.url === "/"
      ? path.join(__dirname, pagesFolder, "index.html")
      : checkIfHtml && req.url.slice(-1) === "/"
      ? path.join(__dirname, pagesFolder, req.url, "index.html")
      : checkIfHtml
      ? path.join(__dirname, pagesFolder, req.url)
      : path.join(__dirname, req.url);
  //in case that it ends on /about file path will end with about.html and be correct
  if (!fileExtension && req.url.slice(-1) !== "/" && checkIfHtml) {
    filePath += ".html";
  }
  //serving pages and 404/301
  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
  } else {
    //404 and 301 logic
    const basePath = path.parse(req.url).name;
    switch (basePath) {
      //redirect in case of old route to home page in this case
      case "old":
        res.writeHead(301, { location: "/" });
        break;
      default:
      //serve 404 page;
    }
  }
  console.log(filePath);
  res.end();
});

server.listen(PORT, () => {
  const networkInter = os.networkInterfaces();
  const address = networkInter["Loopback Pseudo-Interface 1"][1].address;
  console.log(`Server is running on address : http://${address}:${PORT}`);
});
