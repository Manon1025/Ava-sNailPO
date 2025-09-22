const sequelize = require('../config/sequelize_config');
const { DataTypes, Model } = require('sequelize');

class Contrat extends Model {}

Contrat.init({
    id_contrat: {
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
    modelName: 'Contrat',
    tableName: 'Contrat',
    timestamps: false
});

module.exports = Contrat;