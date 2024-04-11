const { DataTypes } = require('sequelize');

// We export a function that defines the model
module.exports = (sequelize) => {
  // define model
  sequelize.define('Type', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  }, {timestamps: false});
};