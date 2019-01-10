// resolvers.js

const passport = require('passport');
const User = require('./Model/user');
const Publication = require('./Model/publication');
const Comment = require('./Model/comment');

const resolvers = {
  Query: {
    async getUser(root, {
      _id,
    }, context) {
      if (context.user) {
        return await User.findById(_id);
      }
      throw new Error('Unauthorized');
    },
    async getUsers(root, _, context) {
      if (context.user) {
        return await User.find();
      }
      throw new Error('Unauthorized');
    },

    async getPublications(root, _, context) {
      if (context.user) {
        return await Publication.find();
      }
      throw new Error('Unauthorized');
    },

    async getPublication(root, {
      _id,
    }, context) {
      if (context.user) {
        return await Publication.findById(_id);
      }
      throw new Error('Unauthorized');
    },

    async getPublicationsByUser(root, {
      user,
    }, context) {
      if (context.user) {
        return await Publication.find().where('user').equals(user);
      }
      throw new Error('Unauthorized');
    },

    async getComment(root, {
      _id,
    }, context) {
      if (context.user) {
        return await Comment.findById(_id);
      }
      throw new Error('Unauthorized');
    },

    async getCommentsByPublication(root, {
      publication,
    }, context) {
      if (context.user) {
        const result = await Publication.findById(publication, 'comments');
        console.log(result.comments);
        return await Comment.find().where('_id').in(result.comments);
      }
      throw new Error('Unauthorized');
    },

  },

  Mutation: {
    async createUser(root, {
      input,
    }) {
      return await User.create(input);
    },

    async createPublication(root, {
      input,
    }, context) {
      return await Publication.create(input);
    },
    // TODO: gérer l'authentification pour l'upload de fichiers
    /*
        async createPublication(root, {
            input
        }, context) {
            if(context.user) {
                return await Publication.create(input)
            }
            throw new Error("Unauthorized");
        }, */

    async createNotification(root, {
      input,
    }, context) {
      if (context.user) {
        const notif = await Notification.create(input);
        const usersToBeNotify = await User.find({ friends: input._id });
        usersToBeNotify.map(
          user => User.findOneAndUpdate({
            user,
          }, { $push: { notifications: notif._id } }),
        );
        return notif;
      }
      throw new Error('Unauthorized');
    },

    async createComment(root, {
      input,
    }, context) {
      if (context.user) {
        return await Comment.create(input);
      }
      throw new Error('Unauthorized');
    },

    async updateUser(root, {
      _id,
      input,
    }, context) {
      if (context.user) {
        return await User.findOneAndUpdate({
          _id,
        }, input, {
          new: true,
        });
      }
      throw new Error('Unauthorized');
    },

    async addUserFriends(root, {
      _id,
      _idFriends,
    }, context) {
      if (context.user) {
        return await User.findOneAndUpdate({
          _id,
        }, { $push: { friends: _idFriends } });
      }
      throw new Error('Unauthorized');
    },
    async removeUserFriends(root, {
      _id,
      _idFriends,
    }, context) {
      if (context.user) {
        return await User.findOneAndUpdate({
          _id,
        }, { $pull: { friends: _idFriends } });
      }
      throw new Error('Unauthorized');
    },

    async updatePublication(root, {
      _id,
      input,
    }, context) {
      if (context.user) {
        return await Publication.findOneAndUpdate({
          _id,
        }, input, {
          new: true,
        });
      }
      throw new Error('Unauthorized');
    },

    async updateNotification(root, {
      _id,
      input,
    }, context) {
      if (context.user) {
        return await Notification.findOneAndUpdate({
          _id,
        }, input, {
          new: true,
        });
      }
      throw new Error('Unauthorized');
    },

    async addPublicationLike(root, {
      _id,
      _idUserWhoLiked,
    }, context) {
      if (context.user) {
        return await Publication.findOneAndUpdate({
          _id,
        }, { $push: { likes: _idUserWhoLiked } });
      }
      throw new Error('Unauthorized');
    },

    async addPublicationDisLike(root, {
      _id,
      _idUserWhoDisLiked,
    }, context) {
      if (context.user) {
        return await Publication.findOneAndUpdate({
          _id,
        }, { $push: { disLikes: _idUserWhoDisLiked } });
      }
      throw new Error('Unauthorized');
    },


    async addPublicationTag(root, {
      _id,
      tag,
    }, context) {
      if (context.user) {
        return await Publication.findOneAndUpdate({
          _id,
        }, { $push: { tags: tag } });
      }
      throw new Error('Unauthorized');
    },

    async addPublicationComment(root, {
      _id,
      _idComment,
    }, context) {
      if (context.user) {
        return await Publication.findOneAndUpdate({
          _id,
        }, { $push: { comments: _idComment } });
      }
      throw new Error('Unauthorized');
    },

    async deletePublication(root, {
      _id,
    }, context) {
      if (context.user) {
        return await Publication.findOneAndRemove({
          _id,
        });
      }
      throw new Error('Unauthorized');
    },

    async deleteUser(root, {
      _id,
    }, context) {
      if (context.user) {
        return await User.findOneAndRemove({
          _id,
        });
      }
      throw new Error('Unauthorized');
    },
  },

  Publication: {
    user: publication => User.findById(publication.user),

    likes: publication => publication.likes.map(
      userWhoLiked => User.findById(userWhoLiked),
    ),

    disLikes: publication => publication.disLikes.map(
      userWhoDisLiked => User.findById(userWhoDisLiked),
    ),

    comments: publication => publication.comments.map(
      comment => Comment.findById(comment._id),
    ),

    hasLiked(publication, _, context) {
      if (!context.user) {
        return false;
      }
      if (publication.likes.indexOf(context.user_id) === -1) {
        return false;
      }
      return true;
    },
  },

  User: {
    friends: user => user.friends.map(
      friend => User.findById(friend),
    ),

    notifications: user => user.notifications.map(
      notification => Notification.findById(notification),
    ),
  },

  Comment: {
    user: comment => User.findById(comment.user),
  },

  Notification: {
    user: notification => User.findById(notification.user),

    publication: notification => Publication.findById(notification.publication),
  },
};

module.exports = resolvers;
