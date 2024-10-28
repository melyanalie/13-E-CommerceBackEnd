// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false, // Cannot be null
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, // Cannot be null
        validate: {
          isDecimal: true, // Ensure it is a decimal value
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false, // Cannot be null
        defaultValue: 0, // Default value for stock
        validate: {
          isNumeric: true, // Ensure it is a numeric value
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'category', // Reference the Category model
          key: 'id', // Reference the id column in the Category model
        },
      },
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;