var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.end('HEllo World');
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
