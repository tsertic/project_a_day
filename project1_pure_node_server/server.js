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
const serveFile = async (filePath, contentType, response) => {
  try {
    let data;
    if (filePath.includes("404.html")) {
      response.writeHead(404, { "Content-Type": contentType });
      data = await fsP.readFile(filePath);
      response.end(data);
    }
    switch (contentType) {
      case "image/png":
      case "image/jpg":
      case "image/jpeg":
        response.writeHead(200, { "Content-Type": contentType });
        data = await fsP.readFile(filePath);
        response.end(data);
        break;
      case "application/json":
        response.writeHead(200, { "Content-Type": contentType });
        data = await fsP.readFile(filePath, "utf-8");
        let jsonData = JSON.parse(data);
        response.end(JSON.stringify(jsonData));
        break;
      default:
        response.writeHead(200, { "Content-Type": contentType });
        data = await fsP.readFile(filePath, "utf-8");
        response.end(data);
    }
  } catch (error) {
    emmiter.emit("log", `${error.name} : ${error.message}`, "serverErrors");
    console.error(error);
    response.end();
  }
};

const server = http.createServer((req, res) => {
  const addressIp = req.socket.localAddress;
  const logMessage = `${addressIp}\t${req.method}\t${req.url}`;
  emmiter.emit("log", logMessage, "requests");

  const fileExtension = path.extname(req.url);
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
    serveFile(filePath, contentType, res);
  } else {
    if (contentType !== "text/html") {
      return;
    }
    //404 and 301 logic
    const basePath = path.parse(req.url).name;
    switch (basePath) {
      //redirect in case of old route to home page in this case
      case "old":
        res.writeHead(301, { location: "/" });
        res.end();
        break;
      default:
        //serve 404 page;
        serveFile(
          path.join(__dirname, pagesFolder, "404.html"),
          contentType,
          res
        );
    }
  }
});

server.listen(PORT, () => {
  const networkInter = os.networkInterfaces();
  const address = networkInter["Loopback Pseudo-Interface 1"][1].address;
  console.log(`Server is running on address : http://${address}:${PORT}`);
});
