// https://cloud.google.com/run/docs/tutorials/websockets
const RedisSessions = require('redis-sessions');
const { createClient } = require('redis');
const { REDIS_HOST, REDIS_PORT, PRODUCTION, checkParam } = require('./utils');
const { REDIS_URL } = require('../secrets/database');

const APP = 'assemble';
                                 // default
const redisClient = PRODUCTION ? createClient({url: REDIS_URL}) : createClient(REDIS_PORT, REDIS_HOST)
const rs = new RedisSessions({client:redisClient});

async function getSession(rs, APP, token) {
  return await new Promise((resolve, reject) => {
    rs.get({
      app: APP,
      token: token
    }, function(error, response) {
      if (!checkParam(error) && checkParam(response) && checkParam(response.d) &&
        checkParam(response.d.user_id, 'user_id')) {
        resolve(response.d.user_id);
      }
      else {
        reject('Invalid session');
      }
    });
  })
}

// https://www.npmjs.com/package/redis-sessions
async function getSocket(rs, APP, username) {
  return await new Promise((resolve, reject) => {
    rs.soapp({
      app: APP,
      dt: 600
    }, function(error, response) {
      if (!checkParam(error) && checkParam(response) && checkParam(response.sessions, 'array')) {
        let session = response.sessions.find((session => session.id == username));
        if (checkParam(session) && checkParam(session.d)) {
          resolve(session.d.socket);
        }
        reject('Invalid socket');
      }
      else {
        reject('Invalid request');
      }
    });
  });
}

module.exports = {
  APP,
  rs,
  redisClient,
  getSession,
  getSocket
}