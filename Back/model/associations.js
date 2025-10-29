// Fichier pour définir toutes les associations entre les modèles
const Employee = require('./Employee');
const Poste = require('./Poste');
const Contrat = require('./contrat');
const Documents = require('./Documents');
const Category = require('./Category');
const Clients = require('./Clients');
const Prestation = require('./Prestations');
const Event = require ('./Event')

// Associations Employee
Employee.belongsTo(Poste, {
    foreignKey: 'poste_id',
    targetKey: 'id_poste'
});

Employee.belongsTo(Contrat, {
    foreignKey: 'contrat_id',
    targetKey: 'id_contrat'
});

// Associations Poste
Poste.hasMany(Employee, {
    foreignKey: 'poste_id',
    sourceKey: 'id_poste'
});

// Associations Contrat
Contrat.hasMany(Employee, {
    foreignKey: 'contrat_id',
    sourceKey: 'id_contrat'
});

// Associations Documents
Documents.belongsTo(Category, {
    foreignKey: 'category_id',
    targetKey: 'id_category'
});

// Associations Category
Category.hasMany(Documents, {
    foreignKey: 'category_id',
    sourceKey: 'id_category'
});

// Association Event
Event.belongsTo(Clients, {
    foreignKey: 'client_id',
    targetKey: 'id_client'
})

Event.belongsTo(Employee, {
    foreignKey: 'employee_id',
    targetKey: 'id_employee'
})

Event.belongsTo(Prestation, {
    foreignKey: 'prestation_id',
    targetKey: 'id_prestation'
})

Clients.hasMany(Event, {
    foreignKey: 'client_id',
    targetKey: 'id_client'
})

Employee.hasMany(Event, {
    foreignKey: 'employee_id',
    targetKey: 'id_employee'
})

Prestation.hasMany(Event, {
    foreignKey: 'prestation_id',
    targetKey: 'id_prestation'
})

module.exports = {
    Employee,
    Poste,
    Contrat,
    Documents,
    Category,
    Clients,
    Event,
    Prestation
};