const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const { checkParam, FORM_MAX, unlinkRequestFiles } = require('./utils');

let local = !checkParam(process.env.CONFIGURATION);
let dirname = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const __dirname = local ? dirname.substring(3) : dirname;
const REPO = '/public/img/'
const ZIP = '/public/tmp/'
const FIVE_MB = 5 * 1024 * 1024;
const TEN_MB = 10 * 1024 * 1024;
const FIFTEEN_MB = 15 * 1024 * 1024
const FIFTY_MB = 50 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, REPO))
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const imageFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Unsupported filetype.';
    return cb(new Error('Unsupported filetype.'), false);
  }
  cb(null, true);
};

const imageLimits = {
  fieldSize: FIFTEEN_MB
}

function uploadFiles(req, res, next, callback) {
  let upload = multer({ storage: storage, limits: imageLimits, fileFilter: imageFilter }).array('files', FORM_MAX);
  upload(req, res, async function(error) {
    if (req.fileValidationError) {
      res.statusCode = 500;
      res.data = {
        status: false,
        error: req.fileValidationError
      };
      next();
      return;
    }
    if (error instanceof multer.MulterError) { 
      console.log('uploadFiles.multer...', error);
      if (!checkParam(req.files, 'array')) {
        callback(req, res);
        return;
      }
      unlinkRequestFiles(req);
      switch(error.code) {
        case 'LIMIT_FIELD_VALUE':
          res.statusCode = 500;
          res.data = {
            status: false,
            error: 'Size limitation'
          };
          break;
        default:
          res.statusCode = 500;
          res.data = {
            status: false,
            error: 'Internal error'
          };
          break;
      }
      next();
    }
    else if (checkParam(error)) {
      console.log('uploadFiles...', error);
      unlinkRequestFiles(req);
      res.statusCode = 500;
      res.data = {
        status: false,
        error: 'Internal error'
      };
      next();
    }
    else {
      callback(req, res);
    }
  });
}

module.exports = {
  __dirname,
  REPO,
  ZIP,
  FIVE_MB,
  TEN_MB,
  FIFTEEN_MB,
  FIFTY_MB,
  uploadFiles
}