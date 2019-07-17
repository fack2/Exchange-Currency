const {
  notFound,
  homePage,
  publicHandler,
  cal,
  defaultList
} = require("./handler");
const router = (request, response) => {
  const pathname = request.url;
  console.log(pathname, "     pathName");
  if (pathname == "/") return homePage(request, response);
  else if (pathname.includes("cal")) return cal(request, response);
  else if (pathname.includes("."))
    return publicHandler(request, response, pathname);
  else if (pathname.includes("urrencies"))
    return defaultList(request, response, pathname);
  else return notFound(request, response);
};

module.exports = router;
