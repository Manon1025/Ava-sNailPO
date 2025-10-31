const express = require('express');
const router = express.Router();
const controllerPlanning = require('../controller/controllerPlanning');

// TODO: ROUTES

router.get('/planning', controllerPlanning.show)

    // * Visu api planning (JSON)
router.get('/api/admin/planning', controllerPlanning.index);

    // * Ajout event
router.post('/add-event-planning', controllerPlanning.create)

module.exports = router;