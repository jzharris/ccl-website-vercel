function checkParam(param) {
  return param != null && param != undefined;
}

function checkArray(array) {
  return checkParam(array) && Array.isArray(array) && array.length > 0;
}

function checkText(text) {
  return checkParam(text) && text != '';
}

module.exports = {
  checkParam,
  checkArray,
  checkText
}