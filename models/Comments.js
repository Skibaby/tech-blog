const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require("./User");
const Blog = require("./Blog");


class Comments extends Model {

}

Comments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      contents: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
      },
      userId: {
          type: DataTypes.INTEGER,
          references: {
              model: User,
              key: "id",
          }
      },
      blogId: {
        type: DataTypes.INTEGER,
        references: {
            model: "blog",
            key: "id",
        }
    },
      },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      // underscored: true,
      modelName: 'comment',
    }
  );
  
  module.exports = Comments;
  