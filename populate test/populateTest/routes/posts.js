var express = require('express');
var postRouter = express.Router();
const bodyParser = require('body-parser');
const Posts = require('../models/postModel');

postRouter.use(bodyParser.json());

/* GET users listing. */
postRouter.route('/')
    .get(function (req, res, next) {
        res.end('Only insert data');
    })
    .post((req, res, next) => {
        Posts.create(req.body)
            .then((posts) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(posts);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = postRouter;
