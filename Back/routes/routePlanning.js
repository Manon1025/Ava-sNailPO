const express = require('express');
const router = express.Router();
const controllerPlanning = require('../controller/controllerPlanning');

// TODO: ROUTES

router.get('/planning', controllerPlanning.show)

    // * Visu api planning (JSON)
router.get('/api/admin/planning', controllerPlanning.index);

    // * Récupérer un événement spécifique (pour modal/formulaire)
router.get('/api/admin/planning/event/:id', controllerPlanning.getEvent);

    // * Ajout event
router.post('/add-event-planning', controllerPlanning.create)

    // * Récupérer un événement pour édition
router.get('/api/admin/planning/edit/:id', controllerPlanning.edit)

    // * Modifier un événement
router.put('/api/admin/planning/:id', controllerPlanning.update)

    // * Supprimer un événement
router.delete('/api/admin/planning/:id', controllerPlanning.destroy)

module.exports = router;