const catModel = require('../models/category')

module.exports = {
  method: "POST", // DELETE
  path: "/api/deleteCategory", // /api/category/:id
  handler: async function(request, h) {
    let { idCategory } = request.payload;
    return catModel.deleteCategory(idCategory);
  }
}