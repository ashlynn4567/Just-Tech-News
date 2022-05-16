const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {};

Comment.init(
    {
        // id column (primary key)
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // comment_text column
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            // ensure comment has at least one character to prevent empty comments
            validate: {
                len: [1]
            }
        },
        // user_id column (foreign key)
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user", 
                key: "id"
            }
        }, 
        // post_id column (foreign key)
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "post",
                key: "id"
            }
        }
    }, 
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "comment"
    }
);

module.exports = Comment;