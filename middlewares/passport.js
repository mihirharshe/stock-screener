const UserModel = require("../models/users");
const { Strategy, ExtractJwt } = require("passport-jwt");
const passport = require('passport');
const { userCheck } = require('../controllers/register');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}

passport.use(new Strategy(opts, function(jwt_payload, done) {
    UserModel.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            // console.log('in passport',user)
            return done(null, user)

        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));