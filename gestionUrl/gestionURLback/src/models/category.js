const db = require('../db-pool')

module.exports = {
  getCategories: async function(user) {
    const sql = `SELECT catid, title FROM Category WHERE uid = '${user}'`;
    const res = await db.request(sql);
    return res
  },
  deleteCategory: async function(idCategory) {
    const sql = `DELETE FROM Category WHERE catid = ${idCategory}`;
    const res = await db.request(sql);
    return res;
  }
}