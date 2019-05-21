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
    // console.log('REQ BELOW')
    // console.log(req)
    // console.log('REQ.BODY BELOW')
    // console.log(req.body)
    // console.log('REQ.BODY.CATEGORY BELOW')
    // console.log(req.body.category)
    request(catURL, function (err, response, body) {
        var categories = JSON.parse(body)
        // console.log('BODY BELOW')
        // console.log(body)
        // console.log('CATEGORIES BELOW')
        // console.log(categories)
        var category = req.body.category
        console.log('CATEGORY')
        console.log(category)
        var url = rootURL
        console.log('URL')
        console.log(url)
        if (category) {
            url = rootURL + '?category=' + category;
        }

        request(url, function (err, response, body) {
            var joke = JSON.parse(body);
            res.render('index', { joke: joke.value, categories })
        });
    });
});

module.exports = router;