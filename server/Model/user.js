const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

// create a schema
const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  inscriptionDate: { type: Date, default: Date.now },
  moviesWatches: [{ type: Schema.ObjectId, ref: 'movies' }],
});

userSchema.methods.generateHash = function (password) {
  // eslint-disable-next-line no-undef
  return bcrypt.hashSynch(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  // eslint-disable-next-line no-undef
  return bcrypt.compareSync(password, this.password);
};

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema);

module.exports = User;
