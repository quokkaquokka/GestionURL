const urlModel = require('../models/url')


module.exports = {
  method: "POST", // GET
  path: "/api/url", // /api/url

  handler: async function(request, h) {
    let { idURL } = request.payload;
    //------
    const user = 1;
    //------
    return urlModel.getUrl(idURL, user)
  }
}

