const nodemailer = require('nodemailer');
const randtoken = require('rand-token');
const bcrypt = require('bcrypt');
const Imap = require('imap');
const emailAuth = require('../secrets/email');
const { readFile } = require('./utils');

async function sendEmailAndAppend(subject, body, recipientEmail) {
  try {
    // Create a nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      name: 'carboncopylabs.com',
      host: emailAuth.smtpServer,
      port: emailAuth.smtpPort,
      auth: {
        user: emailAuth.senderEmail,
        pass: emailAuth.senderPassword,
      },
    });

    // Create the email options
    const mailOptions = {
      from: emailAuth.senderEmail,
      to: recipientEmail,
      subject: subject,
      html: body,
    };

    // Send the email
    return await transporter.sendMail(mailOptions).then(info => {
      // Append the sent email to the 'Sent' folder using IMAP
      const imap = new Imap({
        name: 'carboncopylabs.com',
        user: emailAuth.senderEmail,
        password: emailAuth.senderPassword,
        host: emailAuth.imapServer,
        port: emailAuth.imapPort,
        tls: true,
      });

      imap.once('ready', () => {
        imap.openBox('Sent', true, (error) => {
          if (error) {
            console.error('imap.openSentFolder...', error)
            imap.end();
            throw err;
          }

          // Create the email message as MIMEText
          const emailMessage = `From: ${emailAuth.senderEmail}\r\nTo: ${recipientEmail}\r\nSubject: ${subject}\r\n\r\n${body}`;

          // Append the sent email to the 'Sent' folder
          imap.append(emailMessage, { mailbox: 'Sent' }, (appendErr) => {
            imap.end();
            if (appendErr) {
              console.error('imap.appendError...', appendErr)
              throw appendErr;
            }
          });
        });
      });

      imap.once('error', (imapErr) => {
        console.error('imap.onError...', imapErr)
        throw imapErr;
      });

      imap.connect();
    })
    .catch(error => {
      console.error('emailService.sendEmailAndAppend...', error)
      throw error;
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

async function sendContactMessage(email, name, reason, message) {
  let html = readFile('./server/email/contact.html', (error) => { throw error; });
  var r = /\$\{NAME\}/g;
  html = html.replace(r, name);
  var r = /\$\{REASON\}/g;
  html = html.replace(r, reason);
  var r = /\$\{MESSAGE\}/g;
  html = html.replace(r, message);
  return await sendEmailAndAppend(reason, html, email)
  .catch(error => {
    throw error;
  });
}

// Source: https://raw.githubusercontent.com/whitef0x0/node-email-verification/0.4.3/index.js
function emailVerification(mongoose) {  
  var isPositiveInteger = function(x) {
    return ((parseInt(x, 10) === x) && (x >= 0));
  };
  
  var createOptionError = function(optionName, optionValue, expectedType) {
    return new TypeError('Expected ' + optionName + ' to be a ' + expectedType + ', got ' + 
    typeof optionValue);
  };
  
  var getNestedValue = function(obj, path, def) {
    var i, len;
    
    for (i = 0, path = path.split('.'), len = path.length; i < len; i++) {
      if (!obj || typeof obj !== 'object') {
        return def;
      }
      obj = obj[path[i]];
    }
    
    if (obj === undefined) {
      return def;
    }
    return obj;
  };
  
  // default options
  var options = {
    verificationURL: 'http://example.com/email-verification/?code=${URL}',
    URLLength: 48,
    
    // mongo-stuff
    persistentUserModel: null,
    tempUserModel: null,
    tempUserCollection: 'temporary_users',
    emailFieldName: 'email',
    passwordFieldName: 'password',
    URLFieldName: 'GENERATED_VERIFYING_URL',
    expirationTime: 86400,
    
    // emailing options
    verifyMailOptions: {
      from: 'Do Not Reply <user@gmail.com>',
      subject: 'Confirm your account',
      html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
      'paste the following link into your browser:</p><p>${URL}</p>',
      text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
    },
    shouldSendConfirmation: true,
    confirmMailOptions: {
      from: 'Do Not Reply <user@gmail.com>',
      subject: 'Successfully verified!',
      html: '<p>Your account has been successfully verified.</p>',
      text: 'Your account has been successfully verified.'
    }
  };

  async function insertTempUser(password, tempUserData) {
    var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    tempUserData[options.passwordFieldName] = hash;
    var newTempUser = new options.tempUserModel(tempUserData);
    return await newTempUser.save()
    .then((newUser) => {
      return newUser;
    })
    .catch((error) => {
      throw(error);
    });
  }
  
  var configure = function(optionsToConfigure, callback) {
    for (var key in optionsToConfigure) {
      if (optionsToConfigure.hasOwnProperty(key)) {
        options[key] = optionsToConfigure[key];
      }
    }
    
    var err;
    
    if (typeof options.verificationURL !== 'string') {
      err = err || createOptionError('verificationURL', options.verificationURL, 'string');
    } else if (options.verificationURL.indexOf('${URL}') === -1) {
      err = err || new Error('Verification URL does not contain ${URL}');
    }
    
    if (typeof options.URLLength !== 'number') {
      err = err || createOptionError('URLLength', options.URLLength, 'number');
    } else if (!isPositiveInteger(options.URLLength)) {
      err = err || new Error('URLLength must be a positive integer');
    }
    
    if (typeof options.tempUserCollection !== 'string') {
      err = err || createOptionError('tempUserCollection', options.tempUserCollection, 'string');
    }
    
    if (typeof options.emailFieldName !== 'string') {
      err = err || createOptionError('emailFieldName', options.emailFieldName, 'string');
    }
    
    if (typeof options.passwordFieldName !== 'string') {
      err = err || createOptionError('passwordFieldName', options.passwordFieldName, 'string');
    }
    
    if (typeof options.URLFieldName !== 'string') {
      err = err || createOptionError('URLFieldName', options.URLFieldName, 'string');
    }
    
    if (typeof options.expirationTime !== 'number') {
      err = err || createOptionError('expirationTime', options.expirationTime, 'number');
    } else if (!isPositiveInteger(options.expirationTime)) {
      err = err || new Error('expirationTime must be a positive integer');
    }
    
    if (err) {
      return callback(err, null);
    }
    
    return callback(null, options);
  };
  
  var generateTempUserModel = function(User, callback) {
    if (!User) {
      return callback(new TypeError('Persistent user model not defined'), null);
    }
    try {
      if (mongoose.model(options.tempUserCollection) != null) {
        return callback(null, mongoose.model(options.tempUserCollection));
      }
    } catch(e) {}

    var tempUserSchemaObject = {}, // a copy of the schema
    tempUserSchema;
    
    // copy over the attributes of the schema
    Object.keys(User.schema.paths).forEach(function(field) {
      tempUserSchemaObject[field] = User.schema.paths[field].options;
    });
    tempUserSchemaObject[options.URLFieldName] = String;
    
    // create a TTL
    tempUserSchemaObject.createdAt = {
      type: Date,
      expires: options.expirationTime.toString() + 's',
      default: Date.now
    };
    
    tempUserSchema = mongoose.Schema(tempUserSchemaObject);
    
    // copy over the methods of the schema
    Object.keys(User.schema.methods).forEach(function(meth) { // tread lightly
      tempUserSchema.methods[meth] = User.schema.methods[meth];
    });
    
    options.tempUserModel = mongoose.model(options.tempUserCollection, tempUserSchema);
    
    return callback(null, mongoose.model(options.tempUserCollection));
  };
  
  var createTempUser = async function(user) {
    if (!options.tempUserModel) {
      throw('Temporary user model not defined');
    }
    
    // create our mongoose query
    var query = {};
    query[options.emailFieldName] = user[options.emailFieldName];
    
    return await options.persistentUserModel.findOne(query)
    .then(async (existingPersistentUser) => {
      if (existingPersistentUser) {
        return {
          existingUser: existingPersistentUser,
          newUser: null
        };
      }
      else {
        return await options.tempUserModel.findOne(query)
        .then(async (existingTempUser) => {
          if (existingTempUser) {
            return {
              existingUser: null,
              newUser: existingTempUser
            };
          }
          else {
            var tempUserData = {};
            
            // copy the credentials for the user
            Object.keys(user._doc).forEach(function(field) {
              tempUserData[field] = user[field];
            });
            
            tempUserData[options.URLFieldName] = randtoken.generate(options.URLLength);
            return await insertTempUser(tempUserData[options.passwordFieldName], tempUserData)
            .then((newUser) => {
              return {
                existingUser: null,
                newUser: newUser
              };
            })
            .catch((error) => {
              throw(error);
            });
          }
        })
        .catch(async (error) => {
          throw(error);
        });
      }
    })
    .catch(async (error) => {
      throw(error);
    });
  };

  var sendVerificationEmail = async function(email, url) {
    var r = /\$\{URL\}/g;
    var URL = options.verificationURL.replace(r, url),
    mailOptions = JSON.parse(JSON.stringify(options.verifyMailOptions));
    let html = mailOptions.html;
    html = html.replace(r, URL);
    let subject = mailOptions.subject;
    return await sendEmailAndAppend(subject, html, email)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw(error);
    });
  }
  
  var sendConfirmationEmail = async function(email, options) {
    mailOptions = JSON.parse(JSON.stringify(options.confirmMailOptions));
    let html = mailOptions.html;
    let subject = mailOptions.subject;
    return await sendEmailAndAppend(subject, html, email)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw(error);
    });
  };
  
  var resendVerificationEmail = async function(email, options) {
    var query = {};
    query[options.emailFieldName] = email;
    
    return await options.persistentUserModel.findOne(query)
    .then(async (_) => {
      // user has already signed up and confirmed their account
      throw('User is already confirmed');
    })
    .catch(async (_) => {
      return await options.tempUserModel.findOne(query)
      .then(async (tempUser) => {
        // user found (i.e. user re-requested verification email before expiration)
        // generate new user token
        tempUser[options.URLFieldName] = randtoken.generate(options.URLLength);
        return await tempUser.save()
        .then(async (_) => {
          return await sendVerificationEmail(options.getNestedValue(tempUser, options.emailFieldName), tempUser[options.URLFieldName])
          .then((newUser) => {
            return newUser;
          })
          .catch((error) => {
            throw(error);
          });
        })
        .catch((error) => {
          throw(error);
        });
      })
      .catch((error) => {
        throw(error);
      });
    });
  };
  
  return {
    options: options,
    configure: configure,
    generateTempUserModel: generateTempUserModel,
    createTempUser: createTempUser,
    sendConfirmationEmail: sendConfirmationEmail,
    sendVerificationEmail: sendVerificationEmail,
    resendVerificationEmail: resendVerificationEmail,
    getNestedValue: getNestedValue
  };
};

module.exports = {
  sendEmailAndAppend,
  emailVerification,
  sendContactMessage
}