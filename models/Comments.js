const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


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
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
          type: DataTypes.INTEGER,
          references: {
              model: "user",
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
      underscored: true,
      modelName: 'commemnt',
    }
  );
  
  module.exports = Comments;
  