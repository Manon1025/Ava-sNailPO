#!/usr/bin/env node

/**
 * Script d'automatisation des statuts des rendez-vous
 * 
 * Ce script peut être exécuté périodiquement (via cron job) pour 
 * automatiquement marquer les rendez-vous passés comme terminés.
 * 
 * Usage: node automation-rdv-status.js
 * 
 * Cron job exemple (tous les jours à 1h du matin):
 * 0 1 * * * /usr/bin/node /path/to/your/app/Back/scripts/automation-rdv-status.js
 */

const path = require('path');

// Ajuster le chemin vers le dossier parent (Back)
const backDir = path.dirname(__dirname);
process.chdir(backDir);

// Charger les modules de l'application
const { automatiserStatusRendezVous } = require('../controller/controllerClient');

async function runAutomation() {
    console.log('🚀 Démarrage de l\'automatisation des statuts des rendez-vous...');
    console.log(`📅 Date d'exécution: ${new Date().toLocaleString('fr-FR')}`);
    
    try {
        // Exécuter l'automatisation
        await automatiserStatusRendezVous();
        
        console.log('✅ Automatisation des statuts terminée avec succès!');
        console.log('📊 Les rendez-vous passés ont été automatiquement marqués comme terminés.');
        
        // Fermer la connexion à la base de données si nécessaire
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'automatisation des statuts:', error);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    }
}

// Exécuter l'automatisation
if (require.main === module) {
    runAutomation();
}

module.exports = { runAutomation };