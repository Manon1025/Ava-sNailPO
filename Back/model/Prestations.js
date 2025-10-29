const sequelize = require('../config/sequelize');
const { DataTypes, Model } = require('sequelize');

class Prestation extends Model {}

Prestation.init({
    id_prestation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Prestations',
    tableName: 'Prestations',
    timestamps: false
})