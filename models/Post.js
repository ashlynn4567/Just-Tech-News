const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Post model
class Post extends Model {};

// create fields/columns for Post model
Post.init(
    {
        // create an id column as the primary key
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        // create a title column
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // create a post_url column
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            // ensure the url is a verified link
            validate: {
                isURL: true
            }
        },
        // create a user_id column
        user_id: {
            type: DataTypes.INTEGER,
            // establish relationship between the post and the user 
            // by referencing the user model id property value
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "post"
    }
);

module.exports = Post;