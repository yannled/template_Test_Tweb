const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
ObjectId.prototype.valueOf = function () {
    return this.toString();
};
// create a schema
const publicationSchema = new schema({
    user : { type: schema.ObjectId, ref: 'User' },
    title : String,
    description : String,
    content : String,
    publicationDate : { type: Date, default: Date.now },
    likes : [{type : schema.ObjectId, ref: 'User'}],
    disLikes : [{type : schema.ObjectId, ref: 'User'}],
    tags : [{type : String}],
    comments : [{type: schema.ObjectId, ref: 'Comment'}]
});

// the schema is useless so far
// we need to create a model using it
const Publication = mongoose.model("Publication", publicationSchema);

module.exports = Publication;
