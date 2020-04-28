var mysql = require('mysql');
const config = require('../config');

let pool;

function startConnectionPool() {
    pool = mysql.createPool(config.db.poolOptions);
}


async function request(query) {
    return new Promise(function(resolve, reject) {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log('getConnection - err', err)
                return reject(err);
            }

            // Use the connection
            connection.query( query, function(err, rows) {
                if (err) {
                    console.log('query - err', err)
                    return reject(err);
                }
    
                // And done with the connection.
                connection.release();
                
                return resolve(rows);
                // Don't use the connection here, it has been returned to the pool.
            });
        });    
    });
}


// // The pool will emit a connection event when a new connection is made within the pool.
// // If you need to set session variables on the connection before it gets used, you can listen to the connection event.
// pool.on('connection', function (connection) {
//     console.log("Connected");
//     // Set a session variable
//     //connection.query('SET SESSION auto_increment_increment=1')
// });

// <<< CLOSE THE CONNECTION USING pool.end >>>
// When you are done using the pool, you have to end all the connections or the Node.js 
// event loop will stay active until the connections are closed by the MySQL server. 
// This is typically done if the pool is used in a script or when trying to gracefully shutdown a server.
// To end all the connections in the pool, use the end method on the pool:

function closeConnectionPool() {
    pool.end(function (err) {
        // all connections in the pool have ended
    });
}

module.exports = {
    startConnectionPool: startConnectionPool,
    request: request,
    closeConnectionPool: closeConnectionPool,
}