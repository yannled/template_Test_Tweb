const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types.ObjectId;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};
// create a schema
const movieSchema = new Schema({
  vote_count: Number,
  video: Boolean,
  vote_average: Number,
  title: String,
  popularity: Number,
  poster_path: String,
  original_language: String,
  original_title: String,
  backdrop_path: String,
  adult: Boolean,
  overview: String,
  release_date: { type: Date },
  tmdb_id: Number,
  genres: [{ type: String }],
});

// the schema is useless so far
// we need to create a model using it
const Movie = mongoose.model('movies', movieSchema);
module.exports = Movie;
