const express = require('express');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const { jwtOptions } = require('../config');

const router = express.Router();
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('../Model/user');

async function verifyUserByEmailPassword(email, password) {
  const authUser = { _id: 0, auth: false };

  const user = await User.findOne().where('email').equals(email);

  if (user !== 'Undefined' && user.password === password) {
    authUser.auth = true;
    authUser._id = user._id;
  }

  return authUser;
}

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    const promise = verifyUserByEmailPassword(email, password);
    promise.then((authUser) => {
      if (authUser.auth) return done(null, authUser);

      return done(null, false);
    });
  },
));

passport.use(new JWTStrategy(
  {
    secretOrKey: jwtOptions.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (jwtPayload, done) => {
    const { user_id } = jwtPayload;
    const promise = User.findById(user_id);
    promise.then((authUser) => {
      if (authUser._id.toString() === user_id) return done(null, authUser);

      return done(null, false);
    });
  },
));

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const user = req.user;
  const token = jwt.sign({ user_id: user._id }, jwtOptions.secret);
  res.send({ user_id: user._id, token });
});



module.exports = router;
