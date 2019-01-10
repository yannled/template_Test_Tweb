require('dotenv/config');
const express = require('express');
const express_graphql = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const schema = require('./schema');
const api = require('./routes/api');
const auth = require('./routes/auth');

const { port } = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://test:test@cluster0-hecg9.mongodb.net/test?retryWrites=true');

const app = express();
app.use(cors());

app.use(express.json());
app.use(passport.initialize());

const withUser = (req, res, next) => passport.authenticate('jwt', { session: false }, (err, user, info) => {
  if (err) { next(err); }
  req.user = user;
  next();
})(req, res, next);

app.get('/', (req, res) => {
  res.json({
    graphQL: '/graphql',
    auth: '/auth/login',
    api: '/api',
    uploadImage: '/api/upload/images',
    uploadMusic: '/api/upload/musics',
    downloadImage: '/api/download/images:filename',
    downloadMusic: '/api/download/musics:filename',
    getImage: '/api/images/:filename',
  });
});

app.use('/auth', auth);

app.use('/api', api);

app.use('/graphql', withUser);

app.use('/graphql', express_graphql(req => ({
  schema,
  graphiql: true,
  context: { user: req.user || null },
})));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('something went wrong bitches !!!!!! ');
});

app.listen(port, () => console.log(`Express GraphQL Server Now Running On localhost:${port}`));

module.exports = app;
