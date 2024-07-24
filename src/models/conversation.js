'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'senderId',
        onDelete: 'CASCADE'
      })
      this.belongsTo(models.User, {
        foreignKey: 'receiverId',
        onDelete: 'CASCADE'
      });
    }
  }
  conversation.init({
    senderId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    receiverId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    message: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'conversation',
  });
  return conversation;
};