var express = require('express');
var userRouter = express.Router();
const bodyParser = require('body-parser');
const Users = require('../models/userModel');
const Posts = require('../models/postModel');

userRouter.use(bodyParser.json());

userRouter.route('/')
  .get((req, res, next) => {
    Users.find()
      .populate("post")
      .exec()
      .then((users) => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);

      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Users.create(req.body)
      .populate('post')
      .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = userRouter;
