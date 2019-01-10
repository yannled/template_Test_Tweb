const express = require('express');
const passport = require('passport');
const router = express.Router();

const authentificated = () => passport.authenticate('jwt', { session: false });


router.get('/me', authentificated(), (req, res) => {
  res.send({ user_id: req.user._id });
});

module.exports = router;
