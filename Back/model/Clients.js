const sequelize = require('../config/database');
const { DataTypes, Model } = require('sequelize');

class Clients extends Model {}

Clients.init({
    id_client: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    f_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    l_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    remarq_medi: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    preference: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    create_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Clients',
    tableName: 'clients',
    timestamps: false
});

module.exports = Clients;

