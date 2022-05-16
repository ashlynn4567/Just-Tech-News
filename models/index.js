const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");
const Comment = require("./Comment");

// create associations between models with their foreign keys
// creates association to Post within User (one to many)
User.hasMany(Post, {
    foreignKey: "user_id"
});

// creates association to User within Post (one to one)
Post.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

// creates association to Post through User (many to many)
User.belongsToMany(Post, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

// creates association to User through Post (many to many)
Post.belongsToMany(User, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "post_id",
    onDelete: "SET NULL"
});

Vote.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: 'SET NULL'
});

Vote.belongsTo(Post, {
    foreignKey: "post_id",
    onDelete: 'SET NULL'
});

User.hasMany(Vote, {
    foreignKey: "user_id"
});

Post.hasMany(Vote, {
    foreignKey: "post_id"
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: "comment_id",
    onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
    foreignKey: "comment_id"
});

module.exports = { 
    User,
    Post,
    Vote, 
    Comment
};