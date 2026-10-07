const fs = require('fs');
const path = require('path');
var Filter = require('bad-words');

var filter = new Filter();

const USER_MAX = 24;
const NAME_MAX = 32;

const DEV_ROOT = 'http://localhost';
const PROD_ROOT = 'https://www.carboncopylabs.com';
const LOCAL_PORT = 3080;
const DEV_PORT = 3080;

const DEV = process.env.NODE_ENV == 'production';
const PORT = process.env.PORT || DEV_PORT;
const PRODUCTION = process.env.CONFIGURATION === 'prod';
const LOCAL = !checkParam(process.env.CONFIGURATION);

const REDIS_HOST = PRODUCTION || LOCAL ? (process.env.REDISHOST || 'localhost') : 'host.docker.internal';
const REDIS_PORT = process.env.REDISPORT || 6379;
const SOCKET_PORT = 4444;

const ROOT = PRODUCTION ? PROD_ROOT : DEV_ROOT;
const DIST = LOCAL ? __dirname : '/root/app/dist/pixonify'; // TODO: find the new path for this project, if needed...

const FORM_MAX = 50;

function readFile(filepath, callback) {
  try {
    return fs.readFileSync(path.resolve(filepath), 'utf8')
  } catch (e) {
    callback(e);
  }
}

function unlinkFileByName(filename, userDetails) {
  try {
    fs.unlinkSync(path.join(LOCAL ? getImagePath(filename) : filename));
  } catch(error) {
    console.log('unlinkFile...', filename, error)
  }
}

function unlinkFileList(files, userDetails) {
  if (checkParam(files, 'array')) {
    files.forEach(file => {
      unlinkFileByName(file, userDetails);
    });
  }
}

function unlinkRequestFiles(req, userDetails) {
  if (checkParam(req.files, 'array')) {
    unlinkFileList(req.files.map(file => file.path), userDetails);
  }
}

function checkDocPrivacy(doc, userDetails) {
  return !checkParam(doc.deleted) && checkParam(doc.user_id) &&
    ((!checkParam(userDetails) && !doc.privacy) ||
      (checkParam(userDetails) &&
        ((userDetails.administrator || doc.user_id.toString() === userDetails._id.toString()) ||
        !doc.privacy)
      )
    );
}

function checkUserPrivacy(userDoc, userDetails) {
  return checkParam(userDoc) && ((!checkParam(userDoc.deleted) || userDetails.administrator) &&
    (checkParam(userDetails) && (userDetails.administrator ||
    userDoc._id.toString() === userDetails._id.toString())));
}

function filterPrivateDocs(docs, userDetails, type = 'post') {
  return checkParam(docs, 'array') && checkParam(docs[0]) &&
    docs.filter(doc => (type == 'assembly' || checkUserPrivacy(type == 'user' ? doc : doc.user, userDetails)) &&
    (type == 'user' || checkDocPrivacy(doc, userDetails)));
}

function finalizeDocs(docs, userDetails, processDoc, cleanDoc, type = 'post') {
  let filteredDocs = filterPrivateDocs(docs, userDetails, type);
  if (checkParam(filteredDocs, 'array')) {
    filteredDocs = docs.map(doc => processDoc(cleanDoc(doc), userDetails));
  }
  else {
    filteredDocs = [];
  }
  return filteredDocs;
}

function extractDoc(docs, userDetails, processDoc, cleanDoc, auth = false) {
  if (checkDocPrivacy(docs[0], userDetails)) {
    if (auth) {
      return processDoc(docs[0], userDetails);
    }
    return cleanDoc(processDoc(docs[0], userDetails));
  }
  else {
    throw ('Unauthorized action');
  }
}

function checkParam(param, type = undefined) {
  let check = param !== null && param !== undefined && param !== '';
  if (type != undefined && check) {
    if (type == 'username') {
      const regex = /^[a-zA-Z0-9()._\-]+$/;
      check = check && regex.test(param) && !containsProfanity(param) &&
        !isReservedWord(param) && param.length <= USER_MAX &&
        !(param.endsWith('.') || param.endsWith(' '));
    }
    else if (type == 'password') {
      const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/g;
      check = check && regex.test(param);
    }
    else if (type == 'name') {
      const regex = /^[a-zA-Z0-9()._\- ]+$/;
      check = check && regex.test(param) && !containsProfanity(param) &&
        !isReservedWord(param) && param.length <= NAME_MAX &&
        !(param.endsWith('.') || param.endsWith(' '));
    }
    else if (type == 'email') {
      check = check && param.includes('@');
    }
    else if (type == 'array') {
      check = check;// && param.length > 0;
    }
    else if (type.includes('sort')) {
      if (type.includes('post')) {
        check = check && (
          param == 'popularity' ||
          param == 'chronoasc'
        )
      }
    }
    else if (type == 'object') {
      check = check && param != {};
    }
    else if (type == 'number') {
      check = check && !isNaN(param);
    }
  }
  return check;
}

function isReservedWord(param) {
  return param == 'assemble'; // Add reserved words here.
}

function containsProfanity(text) {
  let check = filter.isProfane(text);
  text.split('_').forEach(t => {
    check = check || filter.isProfane(t);
  });
  text.split('.').forEach(t => {
    check = check || filter.isProfane(t);
  });
  text.split('-').forEach(t => {
    check = check || filter.isProfane(t);
  });
  text.split('\'').forEach(t => {
    check = check || filter.isProfane(t);
  });
  text.split('\"').forEach(t => {
    check = check || filter.isProfane(t);
  });
  text.split('?').forEach(t => {
    check = check || filter.isProfane(t);
  });
  text.split('~').forEach(t => {
    check = check || filter.isProfane(t);
  });
  text.split('`').forEach(t => {
    check = check || filter.isProfane(t);
  });
  return check;
}

function sortedArraysEqual(a, b, test) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  if (checkParam(test)) {
    for (var i = 0; i < a.length; ++i) {
      if (!test(a[i], b[i])) return false;
    }
  }
  else {
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
  }
  return true;
}

async function getExceptions(exceptions, callback) {
  if (checkParam(exceptions, 'array') && checkParam(callback)) {
    let exception_ids = [];
    let processed = 0;
    for (let i = 0; i < exceptions.length; i++) {
      try {
        await getUser(exceptions[i])
        .then((userDetails) => {
          exception_ids.push(userDetails._id);
          processed += 1;
          if (processed >= exceptions.length) {
            callback(exception_ids);
          }
        })
        .catch((_) => {
          processed += 1;
          if (processed >= exceptions.length) {
            callback(exception_ids);
          }
        });
      }
      catch(error) {
        callback([]);
      }
    }
  }
  else if (checkParam(callback)) {
    callback([]);
  }
}

module.exports = {
  USER_MAX,
  NAME_MAX,
  DEV_ROOT,
  PROD_ROOT,
  DEV_PORT,
  LOCAL_PORT,
  DEV,
  PORT,
  PRODUCTION,
  LOCAL,
  REDIS_HOST,
  REDIS_PORT,
  SOCKET_PORT,
  ROOT,
  DIST,
  FORM_MAX,
  readFile,
  unlinkFileByName,
  unlinkFileList,
  unlinkRequestFiles,
  checkDocPrivacy,
  checkUserPrivacy,
  filterPrivateDocs,
  finalizeDocs,
  extractDoc,
  checkParam,
  containsProfanity,
  sortedArraysEqual,
  getExceptions
};