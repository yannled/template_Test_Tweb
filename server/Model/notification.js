const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
ObjectId.prototype.valueOf = function () {
    return this.toString();
};
// create a schema
const notificationSchema = new schema({
    user : { type: schema.ObjectId, ref: 'User' },
    publication: { type: schema.ObjectId, ref: 'Publication'},
    read : { type: Boolean, default: false },
});

// the schema is useless so far
// we need to create a model using it
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
