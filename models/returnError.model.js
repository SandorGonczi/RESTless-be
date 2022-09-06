
function returnError() {
  return Promise.reject({status: 404, msg:'Not found!'})
}

module.exports = returnError;
