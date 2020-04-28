const urlModel = require('../models/url')

module.exports = {
  method: "POST", // DELETE
  path: "/api/deleteUrl", // /api/category/:id
  handler: async function(request, h) {
    let { idUrl } = request.payload;

    //-----
    const user = 1;
    //-----
    return urlModel.delete(idUrl, user);
  }
}