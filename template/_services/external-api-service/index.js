const get = require('micro-get');
const fetch = require('node-fetch');

/*
  - GET requests will execute the function
  - Non-GET requests will return HTTP Code 405
*/
module.exports = get(async (req, res) => {
  try {
    const externalApiRequest = await fetch('https://reqres.in/api/colors');
    const { data } = await externalApiRequest.json();
    return data;
  } catch (e) {
    const err = new Error(e.message);
    err.statusCode = 500;
    throw err;
  }
});
