const categoryModel = require('../models/category')

module.exports = {
  method: "POST", // GET
  path: "/api/categories", 
  handler: async function(request, h) {
    //------
    const user = 1;
    //------
    return categoryModel.getCategories(user);
  }
}