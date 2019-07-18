const {
  notFound,
  homePage,
  publicHandler,
  calculate,
  defaultList
} = require("./handler");
const router = (request, response) => {
  const pathname = request.url;

  if (pathname == "/") {
    return homePage(request, response);
  } else if (pathname.includes("cal")) {
    return calculate(request, response);
  } else if (pathname.includes(".")) {
    return publicHandler(request, response, pathname);
  } else if (pathname.includes("listOfCurrencies")) {
    return defaultList(request, response);
  } else {
    return notFound(request, response);
  }
};

module.exports = router;
