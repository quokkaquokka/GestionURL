"use strict";

const Hapi = require("hapi");
const Path = require('path')
const db = require("./db-pool");
const glob = require('glob');
const chalk = require('chalk')


const server = Hapi.server({
  host: "localhost",
  port: 8000,
  routes: { cors: true }
});

server.state("session", {
  ttl: 7 * 1000 * 60 * 60 * 24, // 7 day lifetime
  encoding: "base64json",
  isSecure: true,
  isHttpOnly: true,
  clearInvalid: false, // remove invalid cookies
  strictHeader: true // cookie data is JSON-stringified and Base64 encoded
});

server.route({
  method: "POST",
  path: "/auth/login",
  handler: async function(request, h) {
    const { login, password } = request.payload;
    const sql = `SELECT * FROM User WHERE mail = '${login}' AND password = '${password}'`;

    const res = await db.request(sql);

    if (!res[0]) {
        return "fail";
    }

    const cookie = get(request, 'state.session') || {
        username: login,
        iduser: res[0].uid,
        firstVisit: false
    }

    cookie.lastVisit = Date.now();

    h.state("session", cookie);
    return h.response("OK");
  }
});

const loadRoutes = async function() {
  const cwd = Path.resolve(__dirname, '.');
    console.log('loadRoutes - __dirname', __dirname)
    const routes = glob.sync('**/*.route.js', {cwd: cwd})

    routes.forEach(route => {
      var route = require(Path.resolve(cwd, route));

      try {
        server.route(route)
        console.log('Route: ', route.path, '(' + route.method + ')');
      } catch (e) {
        throw new Error('Cannot load route ' + route + ':\n' + e.stack.replace(/^/gm, chalk.grey('  > ')))
      }
  })
}


// Start the server
const start = async function() {
  try {
    db.startConnectionPool();
    await loadRoutes()
    await server.start();
  } catch (err) {
    console.log(err);
    db.closeConnectionPool();
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
};

start();
