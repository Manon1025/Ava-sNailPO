// TODO: Module
const express = require('express')
const router = express.Router()

// TODO: Fochier
const controllerClient = require('../controller/controllerClient')

// TODO: Routes
    // * Liste Clients
router.get('/clients', controllerClient.index )

    // * Détails client
router.get('/about-client/:id', controllerClient.show)

    // *Ajout client
router.get('/ajout-d-un-nouveau-client', (req, res) => {
    if (!req.user || req.user.role !== 1) return res.redirect('/')
    res.render("pages/admin/addClient", {
        title: 'Ajouter un nouveau Client',
        user: req.user
    })                                                            
});

router.post('/add-client', controllerClient.create)

    // * Supprimer Client
router.post('/delete-client/:id', controllerClient.destroy)

    // * Modifier Client
router.get('/update-client/:id', controllerClient.edit)
router.post('/update-client/:id', controllerClient.update)



module.exports = router