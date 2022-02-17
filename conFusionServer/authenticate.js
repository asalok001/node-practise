const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');


const User = require('./models/users');
const Author = require('./models/dishes');



passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
   return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
}

var opts= {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, 
    (jwt_payload, done) =>{
        console.log('JWT Payload', jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user)=>{

            if(err){
                return done(err, false);
            }
            else if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        })
    }));

exports.verifyuser = passport.authenticate('jwt', {session: false});

exports.verifyadmin = ((req,res, next) =>{
    if(req.user.admin){
        next();
    }else{
        err =new Error('You are not an admin');
        err.status = 403;
        return next(err);
    }
});

