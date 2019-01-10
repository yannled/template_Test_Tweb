const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
ObjectId.prototype.valueOf = function () {
    return this.toString();
};
// create a schema
const commentSchema = new schema({
    user : { type: schema.ObjectId, ref: 'User' },
    content : String
});

// the schema is useless so far
// we need to create a model using it
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
