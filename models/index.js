const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");

// create associations between models with their foreign keys
// creates association to Post within User (one to many)
User.hasMany(Post, {
    foreignKey: "user_id"
});

// creates association to User within Post (one to one)
Post.belongsTo(User, {
    foreignKey: "user_id"
});

// creates association to Post through User (many to many)
User.belongsToMany(Post, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "user_id"
});

// creates association to User through Post (many to many)
Post.belongsToMany(User, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "post_id"
});

Vote.belongsTo(User, {
    foreignKey: "user_id"
});

Vote.belongsTo(Post, {
    foreignKey: "post_id"
});

User.hasMany(Vote, {
    foreignKey: "user_id"
});

Post.hasMany(Vote, {
    foreignKey: "post_id"
});

module.exports = { 
    User,
    Post,
    Vote
};