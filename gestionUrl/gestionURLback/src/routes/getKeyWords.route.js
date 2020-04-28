
const urlModel = require('../models/url')

module.exports = {
  method: "POST", // GET
  path: "/api/keywords",

  handler: async function(request, h) {
    let { keyWord } = request.payload;
    //------
    const user = 1;
    //------
    return urlModel.getKeywords(keyWord,  user)
  }
}
