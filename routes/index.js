var express = require('express');
var router = express.Router();
var request = require('request');
var rootURL = 'https://api.chucknorris.io/jokes/random';
var catURL = 'https://api.chucknorris.io/jokes/categories';

router.get('/', function (req, res, next) {
    request(catURL, function (err, response, body) {
        var categories = JSON.parse(body)
        res.render('index', { joke: null, categories });
    });
});

router.post('/', function (req, res, next) {
    request(catURL, function (err, response, body) {
        var categories = JSON.parse(body);
        var category = req.body.category;
        var url = category ? rootURL + '?category=' + category : rootURL;

        request(url, function (err, response, body) {
            var joke = JSON.parse(body);
            res.render('index', { joke: joke.value, categories });
        });
    });
});

module.exports = router;