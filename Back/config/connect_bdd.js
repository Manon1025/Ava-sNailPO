const sequelize = require('./sequelize_config');

async function connectBDD() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données réussie !');
        
        return sequelize;
    } catch (error) {
        console.error('Erreur lors de la synchronisation :', error);
    }
}

module.exports = connectBDD;