const sequelize = require("../config/sequelize_config");
const { DataTypes, Model } = require("sequelize");

class Employee extends Model {}

Employee.init({
    id_employee: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false    
    },
    phone: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false    
    },
    poste_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Poste',
            key: 'id_poste'
        }
    },
    contrat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Contrat',
            key: 'id_contrat'
        }
    },
    observation: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    role: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0  // 0 = user, 1 = admin
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    create_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Employee",
    tableName: "Employee",
    timestamps: false
});

module.exports = Employee;
