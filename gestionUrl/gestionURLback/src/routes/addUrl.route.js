const urlModel = require('../models/url')

module.exports = {
  method: "POST",
  path: "/api/addUrl", 
  handler: async function(request, h) {
    let {
      title,
      url,
      idCategory,
      titleCategory,
      description,
      keyWord
    } = request.payload;
    //---------------
    const user = 1;
    //---------
    return urlModel.addUrl(title, url, idCategory, titleCategory, description, keyWord, user)
  }
}