const sequelize = require('../config/sequelize_config');
const { DataTypes, Model } = require('sequelize');

class Poste extends Model {}

Poste.init({
    id_poste: {
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
    modelName: 'Poste',
    tableName: 'Poste',
    timestamps: false
});

module.exports = Poste;
