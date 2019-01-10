const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const resolvers = require('./resolvers');



const typeDefs = `
directive @date(
  defaultFormat: String = "yyyy:mm:dd, hh:mm:ss"
) on FIELD_DEFINITION

scalar Date

type User {
  _id : ID!
  name: String
  lastName: String
  email : String!
  inscriptionDate : Date!
  job : String
  webSite : String
  friends : [User]
  notifications: [Notification]
  gender : String!
 }
  
 type Publication {
  _id : ID!
  user : User
  content : String
  title : String!
  description : String
  publicationDate : Date!
  likes : [User]
  disLikes : [User]
  tags : [String]
  comments : [Comment]
  hasLiked : Boolean
 }
 
  type Comment {
  _id : ID!
  user : User
  content : String!
 }
 
  type Notification {
  _id : ID!
  user : User
  publication: Publication
  read : Boolean
 }
 
 input UserInput {
  password : String
  name: String
  lastName: String
  email : String
  job : String
  webSite : String
  gender : String
  friends : [ID]
 }
 
  input PublicationInput {
  user : ID
  title: String
  content : String
  description: String
  likes : [ID]
  disLikes : [ID]
  tags : [String]
  comments : [ID]
 }
 
 input CommentInput {
  user : ID
  content : String
 }
 
 input NotificationInput {
  user : ID
  publication : ID
  read : Boolean
 }
 
 type Query {
  getUser(_id: ID!): User
  getUsers: [User]
  getPublications : [Publication]
  getPublication(_id: ID!): Publication
  getPublicationsByUser(user: ID!): [Publication]
  getComment(_id: ID!): Comment
  getCommentsByPublication(publication: ID!): [Comment]
 }
 
 type Mutation {
   createNotification(input: NotificationInput): Notification
   createUser(input: UserInput) : User
   createPublication(input: PublicationInput) : Publication
   updateUser(_id: ID!, input: UserInput): User
   addUserFriends(_id: ID!, _idFriends: ID!): User
   removeUserFriends(_id: ID!, _idFriends: ID!): User
   updateNotification(_id: ID!, input: NotificationInput): Notification
   updatePublication(_id: ID!, input: PublicationInput): Publication
   addPublicationLike(_id: ID!, _idUserWhoLiked: ID!): Publication
   addPublicationDisLike(_id: ID!, _idUserWhoDisLiked: ID!): Publication
   addPublicationTag(_id: ID!, tag: String): Publication
   addPublicationComment(_id: ID!, _idComment: ID!): Publication
   deletePublication(_id: ID!) : Publication
   deleteUser(_id: ID!) : User
   createComment(input: CommentInput) : Comment
 }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
