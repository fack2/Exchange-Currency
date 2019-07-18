const path = require("path");
const fs = require("fs");
require("env2")(".env");
const request = require("request");

const homePage = (req, res) => {
  const homePagePath = path.join(__dirname, "..", "public/index.html");
  fs.readFile(homePagePath, (err, data) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/html"
      });
      res.end("<h1>ERRORE</h1>");
    }
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end(data);
  });
};

const calculate = (req, res) => {
  let endPoint = "cal?c1=USD&c2=ILS&a=10";
  endPoint = endPoint.split("?")[1];
  endPoint = req.url;
  endPoint = endPoint.split("&");
  const c1 = endPoint[0].split("=")[1];
  const c2 = endPoint[1].split("=")[1];
  const amount = endPoint[2].split("=")[1];

  request(
    `http://www.apilayer.net/api/live?access_key=${process.env.API_KEY}`,
    { json: true },
    (err, res2, body) => {
      if (err) {
        return console.log(err);
      }
      const currency = {
        currency1: c1,
        currency2: c2,
        Amount: amount,
        USD2Currency1: body.quotes["USD" + c1],
        USD2Currency2: body.quotes["USD" + c2]
      };
      const result =
        (currency.Amount * currency.USD2Currency2) / currency.USD2Currency1;

      res.writeHead(200, {
        "Content-Type": "application/JSON"
      });
      res.end(JSON.stringify(result));
    }
  );
};
const defaultList = (req, res) => {
  request(
    `http://www.apilayer.net/api/list?access_key=${process.env.API_KEY}`,
    { json: true },
    (err, res2, body) => {
      if (err) {
        return console.log(err);
      }
      res.writeHead(200, {
        "Content-Type": "application/JSON"
      });
      res.end(JSON.stringify(Object.keys(body.currencies)));
    }
  );
};
const publicHandler = (request, response, url) => {
  const extension = url.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpg: "image/jpg",
    png: "image/png",
    ico: "image/x-icon"
  };
  const filePath = path.join(__dirname, "../public", url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>this is error message should be</h1>");
    } else {
      response.writeHead(200, { "Content-Type": extensionType[extension] });
      response.end(file);
    }
  });
};

const notFound = (req, res) => {
  res.writeHead(404, {
    "Content-Type": "text/html"
  });
  res.end(`<h1>ERRORE 404 <br> Page Not Found</h1>`);
};

module.exports = { notFound, homePage, publicHandler, calculate, defaultList };
