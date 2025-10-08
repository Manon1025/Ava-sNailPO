// Fichier pour définir toutes les associations entre les modèles
const Employee = require('./Employee');
const Poste = require('./Poste');
const Contrat = require('./contrat');
const Documents = require('./Documents');
const Category = require('./Category');
// const EmployeeDocument = require('./EmployeeDocument');

// Associations Employee
Employee.belongsTo(Poste, {
    foreignKey: 'poste_id',
    targetKey: 'id_poste'
});

Employee.belongsTo(Contrat, {
    foreignKey: 'contrat_id',
    targetKey: 'id_contrat'
});

// Association Employee - Documents (Many to Many) - Temporairement commentée
// Employee.belongsToMany(Documents, {
//     through: EmployeeDocument,
//     foreignKey: 'employee_id',
//     otherKey: 'document_id',
//     sourceKey: 'id_employee',
//     targetKey: 'id_document'
// });

// Documents.belongsToMany(Employee, {
//     through: EmployeeDocument,
//     foreignKey: 'document_id',
//     otherKey: 'employee_id',
//     sourceKey: 'id_document',
//     targetKey: 'id_employee'
// });

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

module.exports = {
    Employee,
    Poste,
    Contrat,
    Documents,
    Category
    // EmployeeDocument
};