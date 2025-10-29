const express = require('express');
const router = express.Router();
const controllerPlanning = require('../controller/controllerPlanning');

router.get('/', controllerPlanning.index);

module.exports = router;