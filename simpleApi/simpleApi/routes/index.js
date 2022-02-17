var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.end('HEllo World');
  // Make a request for a user with a given ID
  console.log(req.query);
  const url = 'https://api.postalpincode.in/pincode/' + req.query.pin;
  axios.get(url)
    .then(function (response) {
      const response1 = response
      // handle success
      // console.log(response);
      res.send(response.data);

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  // Optionally the request above could also be done as

  // Want to use async/await? Add the `async` keyword to your outer function/method.

});

router.post('/', function (req, res, next) {
  res.end('In the post method');
});

router.put('/', function (req, res, next) {
  res.end('in the put method');
});

router.delete('/', function (req, res, next) {
  res.end('In the delete method');
});

module.exports = router;
