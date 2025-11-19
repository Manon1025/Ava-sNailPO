const express = require('express');
const router = express.Router();
const { Event, Clients, Employee, Prestation } = require('../model/associations');

const controllerHomePage = require('../controller/controllerHomePage');

// Route pour la page d'accueil

router.get('/', controllerHomePage.index);

router.get('/about-event/:id', controllerHomePage.show);

module.exports = router;