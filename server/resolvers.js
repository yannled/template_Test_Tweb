// resolvers.js

const User = require('./Model/user');
const Movie = require('./Model/Movie');

const resolvers = {
  Query: {
    async getUser(root, {
      _id,
    }, context) {
      if (context.user) {
        return User.findById(_id);
      }
      throw new Error('Unauthorized');
    },
    async getUsers(root, _, context) {
      if (context.user) {
        return User.find();
      }
      throw new Error('Unauthorized');
    },

    async getMovies(root, {
      begin, number,
    }, context) {
      if (context.user) {
        return Movie.find().skip(begin).limit(number);
      }
      throw new Error('Unauthorized');
    },
  },

  Mutation: {
    async createUser(root, {
      input,
    }) {
      return User.create(input);
    },

    async updateUser(root, {
      _id,
      input,
    }, context) {
      if (context.user) {
        return User.findOneAndUpdate({
          _id,
        }, input, {
          new: true,
        });
      }
      throw new Error('Unauthorized');
    },

    async deleteUser(root, {
      _id,
    }, context) {
      if (context.user) {
        return User.findOneAndRemove({
          _id,
        });
      }
      throw new Error('Unauthorized');
    },
  },
  User: {
    moviesWatches: user => user.moviesWatches.map(
      movie => Movie.findById(movie),
    ),

  },
};

module.exports = resolvers;
