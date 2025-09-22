const sequelize = require('../config/sequelize_config')
const { DataTypes, Model } = require('sequelize');

class Category extends Model {}

Category.init({
    id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'Category',
    timestamps: false
});

module.exports = Category;