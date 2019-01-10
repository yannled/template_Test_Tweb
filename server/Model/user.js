const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
    return this.toString();
};

// create a schema
const userSchema = new schema({
    name: {type: String, required:true },
    lastName : String,
    email : {type: String, unique: true, required:true },
    password : {type: String, required:true },
    inscriptionDate : { type: Date, default: Date.now },
    job : String,
    webSite : String,
    friends : [{type : schema.ObjectId, ref: 'User'}],
    notifications : [{type : schema.ObjectId, ref: 'Notification'}],
    gender : { type: String, enum: ['Woman', 'Man', 'Undefined'], default: 'Undefined'},
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSynch(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model("User", userSchema);

module.exports = User;
