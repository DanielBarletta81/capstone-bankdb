var axios = require("axios").default;

var options = {
  method: 'PATCH',
  url: 'https://dev-aw2iyk730gp50zmh.us.auth0.com/api/v2/clients/VnTO5yB50FSPRXogiL0b79gQKjliVxy1',
  headers: {
    'content-type': 'application/json',
    authorization: 'Bearer API2_ACCESS_TOKEN',
    'cache-control': 'no-cache'
  },
  data: {initiate_login_uri: 'https://localhost:3000/login'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});