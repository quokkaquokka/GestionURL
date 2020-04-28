const urlModel = require('../models/url')

module.exports = {
  method: "POST", // DELETE
  path: "/api/deleteURLbyCatId", // /api/url/:id
  handler: async function(request, h) {
    let { idCategory } = request.payload;
    //------
    const user = 1;
    //------
    return urlModel.deleteByCatid(idCategory,  user)
  }
}
