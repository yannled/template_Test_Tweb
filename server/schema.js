const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const resolvers = require('./resolvers');


const typeDefs = `
directive @date(
  defaultFormat: String = "yyyy:mm:dd, hh:mm:ss"
) on FIELD_DEFINITION

scalar Date

type Movie {
  _id : ID!
  vote_count: Int
  video: Boolean
  vote_average: Float
  title: String
  popularity: Float
  poster_path: String
  original_language: String
  original_title: String
  backdrop_path: String
  adult: Boolean
  overview: String
  release_date: Date
  tmdb_id: Int
  genres: [String]
} 

type User {
  _id : ID!
  name: String
  lastName: String
  email : String!
  inscriptionDate : Date!
  moviesWatches : [Movie]
 }
 
 input UserInput {
  password : String
  name: String
  lastName: String
  email : String
  moviesWatches : [ID]
 }
 
 type Query {
  getUser(_id: ID!): User
  getUsers: [User]
  getMovies(begin: Int, number: Int) : [Movie]
 }
 
 type Mutation {
   createUser(input: UserInput) : User
   updateUser(_id: ID!, input: UserInput): User
   deleteUser(_id: ID!) : User
 }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
