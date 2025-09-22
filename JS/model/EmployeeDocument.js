const sequelize = require('../config/sequelize_config');
const { DataTypes, Model } = require('sequelize');

class EmployeeDocument extends Model {}

EmployeeDocument.init({
    id_Document_Employee: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Employee',
            key: 'id_employee'
        }
    },
    document_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Document',
            key: 'id_document'
        }
    },
    upload_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'EmployeeDocument',
    tableName: 'EmployeeDocument',
    timestamps: false
});