const db = require('../db-pool')

module.exports = {
  getUrls: async function(idCategory,  user) {
    const sql = `SELECT * FROM URL WHERE uid = ${user} AND catid = ${idCategory}`;
    const res =  await db.request(sql);
    return res
  },
  getUrl: async function(idURL,  user) {
    const sql = `SELECT * FROM URL WHERE uid = ${user} AND urlid = ${idURL}`;
    const res = await db.request(sql);
    return res
  },
  getKeywords: async function(keyWord,  user) {
    keyWord = keyWord.toLowerCase();
    const sql = `SELECT * FROM URL WHERE uid = ${user} AND keyWord LIKE '%${keyWord}%'`;
    const res = await db.request(sql);
    return res
  },
  deleteByCatid: async function(idCategory,  user) {
    const sql = `DELETE FROM URL WHERE uid = ${user} AND catid = ${idCategory}`;
    const res = await db.request(sql);
    return res
  },
  delete: async function(id,  user) {
    const sql = `DELETE FROM URL WHERE uid = ${user} AND urlid = ${id}`;
    const res = await db.request(sql);
    return res
  },

  addUrl: async function( title, url, idCategory, titleCategory, description, keyWord, user) {
    console.log(keyWord)
    if (!idCategory) {
      const sql = `INSERT INTO Category (catid, title, uid) VALUES (NULL, '${titleCategory}', ${user})`;
      const res = await db.request(sql);
      idCategory = res.insertId;
    }
    
    if(keyWord){
      keyWord = keyWord.toLowerCase();
    }

   
    const sql = `INSERT INTO URL (urlid, title, uid, description, catid,link, keyWord) VALUES (NULL, '${title}', ${user} ,'${description}', ${idCategory}, '${url}', '${keyWord}')`;
    const res = await db.request(sql);
    console.log(res)
    return res;
  }
}