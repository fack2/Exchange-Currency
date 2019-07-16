
const {notFound,homePage,publicHandler,cal} = require('./handler')
const router = ((request, response) => {
const  pathname  = request.url;
  if(pathname=="/")
    return homePage(request, response);
    else if(pathname.includes('cal'))
        return cal(request, response);
    else  if(pathname.includes('.'))
        return publicHandler(request, response,pathname);
    else
        return notFound(request, response);
  
//   switch(pathname){
//     case `/`:
//     case `/home`:
//     case `/homePage`:
//     case `/index`:
//       return homePage(request, response);
    
//     default:
//       return notFound(request, response);
//     }
})

module.exports = router;