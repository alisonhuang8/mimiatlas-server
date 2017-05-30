var express = require('express');
var router = express.Router();

router.post('/', function(request, response) {
    response.send('hey this works!');
})

module.exports = router;
