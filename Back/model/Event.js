const sequelize = require('../config/sequelize');
const { DataTypes, Model } = require('sequelize');

class Event extends Model {}

Event.init({
    id_event: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Clients',
            key: 'id_client'
        }
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model:'Employee',
            key: 'id_employee'
        }
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    prestation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Prestations',
            key: 'id_prestation'
        }
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    create_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    update_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Event',
    tableName: 'Event',
    timestamps: false
});

module.exports = Event;