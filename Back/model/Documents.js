const sequelize = require('../config/sequelize_config')
const { DataTypes, Model } = require('sequelize');

class Documents extends Model {}

Documents.init({
    id_document: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Category',
            key: 'id_category'
        }
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    create_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Documents',
    tableName: 'Documents',
    timestamps: false
});

module.exports = Documents;