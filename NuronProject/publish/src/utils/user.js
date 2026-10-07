// const { checkParam, checkText } = require("./utilities");

// // function getSessionKey() {
// //     return pullFromLocalStorage("sessionToken");
// // }

// function storeSessionToken(response) {
//     if (!checkParam(response) || !checkParam(response.response)) {
//       return;
//     }
  
//     let data = response.response;
//     let token = "";
//     if (checkText(data.sessionToken)) {
//       token = data.sessionToken;
//     }
//     putInLocalStorage('sessionToken', token);
// }

// // function pullFromLocalStorage(query) {
// //     if (checkUser()) {
// //         try {
// //             return JSON.parse(localStorage.getItem(query));
// //         } catch(error) {
// //             return undefined;
// //         }
// //     }
// // }

// function putInLocalStorage(key, value) {
//     localStorage.setItem(key, value);
// }

// // function getUsername() {
// //     return pullFromLocalStorage('username');
// // }

// function storeUsername(username) {
//     return putInLocalStorage('username', username);
// }

// // function checkUser(username) {
// //     let check = username;
// //     if (check == undefined) {
// //         check = getUsername();
// //     }
// //     return check != null &&
// //         check != undefined &&
// //         check != '';
// // }

// module.exports = {
//     // getSessionKey,
//     storeSessionToken,
//     // getUsername,
//     storeUsername,
//     // checkUser
// }