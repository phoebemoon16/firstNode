var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello phoebe');
});

router.get('/11', function(req, res, next) {
  res.send('hello phoebe11');
});

module.exports = router;
