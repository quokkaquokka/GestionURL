const urlModel = require('../models/url')

module.exports = {
  method: "POST",
  path: "/api/urls", // ?categoryId
  handler: async function(request, h) {
    const { idCategory } = request.payload;
    const userId = 1;
    console.log(idCategory);
    return urlModel.getUrls(idCategory, userId)
  }
}