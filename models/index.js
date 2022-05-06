const User = require("./User");
const Post = require("./Post");

// create associations 
// creates association to post within user
User.hasMany(Post, {
    foreignKey: "user_id"
});

// creates association to user within post
Post.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = { 
    User,
    Post
};