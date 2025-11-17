const { Event, Clients, Employee, Prestation } = require('../model/associations')

exports.show = async (req, res) => {
    try {
            const employees = await Employee.findAll({
                where: { isActive: true },
                attributes: ['id_employee', 'fname', 'lname'],
                order: [['fname', 'ASC'], ['lname', 'ASC']]
            });

            const clients = await Clients.findAll({
                attributes: ['id_client', 'f_name', 'l_name']
            });
            
            const prestations = await Prestation.findAll({
                attributes: ['id_prestation', 'name']
            });

            res.render('pages/planning.ejs', {
                title: 'Planning', 
                user: req.user,
                employees: employees,
                clients: clients,
                prestation: prestations
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des employés:', error);
            res.render('pages/planning.ejs', {
                title: 'Planning', 
                user: req.user,
                employees: [],
                clients: [],
                prestation: []
            });
        }
}

exports.index = async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [
                {
                    model: Clients,
                    attributes: ['f_name', 'l_name']
                },
                {
                    model: Employee,
                    attributes: ['fname', 'lname']
                }
            ]
        });

        // Transformer les événements au format FullCalendar
        const formattedEvents = events.map(event => {
            return {
                id: event.id_event,
                title: `${event.Client?.f_name} ${event.Client?.l_name} - ${event.Employee?.fname} ${event.Employee?.lname}`,
                start: `${event.start_date}T${event.start_time}`,
                end: `${event.end_date}T${event.end_time}`,
                extendedProps: {
                    client_id: event.client_id,
                    employee_id: event.employee_id,
                    prestation_id: event.prestation_id,
                    notes: event.notes,
                    description: event.notes
                }
            };
        });

        res.status(200).json(formattedEvents); // Retourner directement le tableau
    } catch (err) {
        console.error('Erreur lors de la récupération des événements:', err);
        res.status(500).json({ error: err.message });
    }
}

// Récupérer un événement spécifique pour le formulaire de modification
exports.getEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        
        const event = await Event.findOne({
            where: { id_event: eventId },
            include: [
                {
                    model: Clients,
                    attributes: ['id_client', 'f_name', 'l_name']
                },
                {
                    model: Employee,
                    attributes: ['id_employee', 'fname', 'lname']
                },
                {
                    model: Prestation,
                    attributes: ['id_prestation', 'name']
                }
            ]
        });

        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }

        // Récupérer toutes les données pour les sélecteurs (employés, clients, prestations)
        const employees = await Employee.findAll({
            where: { isActive: true },
            attributes: ['id_employee', 'fname', 'lname'],
            order: [['fname', 'ASC'], ['lname', 'ASC']]
        });

        const clients = await Clients.findAll({
            attributes: ['id_client', 'f_name', 'l_name'],
            order: [['f_name', 'ASC'], ['l_name', 'ASC']]
        });
        
        const prestations = await Prestation.findAll({
            attributes: ['id_prestation', 'name'],
            order: [['name', 'ASC']]
        });

        // Formater la réponse pour le formulaire
        res.status(200).json({
            event: {
                id_event: event.id_event,
                client_id: event.client_id,
                employee_id: event.employee_id,
                start_date: event.start_date,
                start_time: event.start_time,
                end_date: event.end_date,
                end_time: event.end_time,
                prestation_id: event.prestation_id,
                notes: event.notes || '',
                // Informations additionnelles pour affichage
                client_name: `${event.Client?.f_name || ''} ${event.Client?.l_name || ''}`.trim(),
                employee_name: `${event.Employee?.fname || ''} ${event.Employee?.lname || ''}`.trim(),
                prestation_name: event.Prestation?.name || ''
            },
            // Données pour les sélecteurs
            employees: employees,
            clients: clients,
            prestations: prestations
        });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'événement:', error);
        res.status(500).json({ 
            message: 'Erreur serveur', 
            error: error.message 
        });
    }
}; 

exports.create = async (req, res) => {
    try {
        const {
            client_id,
            employee_id,
            start_date,
            start_time,
            end_date,
            end_time,
            prestation_id,
            notes
        } = req.body;

        // Validation des champs requis
        if (!client_id || !employee_id || !start_date || !start_time || !end_date || !end_time) {
            return res.status(400).json({
                message: 'Tous les champs obligatoires doivent être remplis',
                error: 'Champs manquants'
            });
        }

        // Si prestation_id est vide, le définir à 1 (valeur par défaut) ou créer une prestation par défaut
        let validPrestation = prestation_id;
        if (!prestation_id || prestation_id === '') {
            // Vérifier s'il existe une prestation par défaut (id = 1)
            const defaultPrestation = await Prestation.findOne({ where: { id_prestation: 1 } });
            if (defaultPrestation) {
                validPrestation = 1;
            } else {
                // Créer une prestation par défaut si elle n'existe pas
                const newDefaultPrestation = await Prestation.create({
                    name: 'Prestation générale',
                    description: 'Prestation par défaut',
                    price: 0.00
                });
                validPrestation = newDefaultPrestation.id_prestation;
            }
        }

        const event = await Event.create({
            client_id,
            employee_id,
            start_date,
            start_time,
            end_date,
            end_time,
            prestation_id: validPrestation,
            notes: notes || null,
            create_at: new Date()
        })

        res.redirect('/planning?message=ajouté&name=' + encodeURIComponent(event.client_id + ' ' + event.employee_id + ' ' + (event.prestation_id || 'aucune prestation')))
    } catch (err) {
        console.error('Erreur lors de la création de l\'événement', err)
        res.status(500).json({
            message: 'Erreur lors de la création de l\'événement',
            error: err.message
        })
    }
};

// Récupérer un événement spécifique pour l'édition
exports.edit = async (req, res) => {
    try {
        const eventId = req.params.id;
        
        const event = await Event.findOne({
            where: { id_event: eventId },
            include: [
                {
                    model: Clients,
                    attributes: ['id_client', 'f_name', 'l_name']
                },
                {
                    model: Employee,
                    attributes: ['id_employee', 'fname', 'lname']
                },
                {
                    model: Prestation,
                    attributes: ['id_prestation', 'name']
                }
            ]
        });

        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }

        // Récupérer toutes les données nécessaires pour les sélecteurs
        const employees = await Employee.findAll({
            where: { isActive: true },
            attributes: ['id_employee', 'fname', 'lname'],
            order: [['fname', 'ASC'], ['lname', 'ASC']]
        });

        const clients = await Clients.findAll({
            attributes: ['id_client', 'f_name', 'l_name'],
            order: [['f_name', 'ASC'], ['l_name', 'ASC']]
        });
        
        const prestations = await Prestation.findAll({
            attributes: ['id_prestation', 'name'],
            order: [['name', 'ASC']]
        });

        res.status(200).json({
            event: {
                id_event: event.id_event,
                client_id: event.client_id,
                employee_id: event.employee_id,
                start_date: event.start_date,
                start_time: event.start_time,
                end_date: event.end_date,
                end_time: event.end_time,
                prestation_id: event.prestation_id,
                notes: event.notes,
                // Informations pour l'affichage
                client_name: `${event.Client?.f_name} ${event.Client?.l_name}`,
                employee_name: `${event.Employee?.fname} ${event.Employee?.lname}`,
                prestation_name: event.Prestation?.name
            },
            employees: employees,
            clients: clients,
            prestations: prestations
        });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'événement:', error);
        res.status(500).json({ 
            message: 'Erreur serveur', 
            error: error.message 
        });
    }
};

// Mettre à jour un événement
exports.update = async (req, res) => {
    try {
        const eventId = req.params.id;
        const {
            client_id,
            employee_id,
            start_date,
            start_time,
            end_date,
            end_time,
            prestation_id,
            notes
        } = req.body;

        // Validation des champs requis
        if (!client_id || !employee_id || !start_date || !start_time || !end_date || !end_time) {
            return res.status(400).json({
                message: 'Tous les champs obligatoires doivent être remplis',
                error: 'Champs manquants'
            });
        }

        // Vérifier que l'événement existe
        const event = await Event.findOne({ where: { id_event: eventId } });
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }

        // Si prestation_id est vide, le définir à 1 (valeur par défaut)
        let validPrestation = prestation_id;
        if (!prestation_id || prestation_id === '') {
            const defaultPrestation = await Prestation.findOne({ where: { id_prestation: 1 } });
            if (defaultPrestation) {
                validPrestation = 1;
            } else {
                // Créer une prestation par défaut si elle n'existe pas
                const newDefaultPrestation = await Prestation.create({
                    name: 'Prestation générale',
                    description: 'Prestation par défaut',
                    price: 0.00
                });
                validPrestation = newDefaultPrestation.id_prestation;
            }
        }

        // Mettre à jour l'événement
        await event.update({
            client_id,
            employee_id,
            start_date,
            start_time,
            end_date,
            end_time,
            prestation_id: validPrestation,
            notes: notes || null
        });

        // Récupérer l'événement mis à jour avec les relations
        const updatedEvent = await Event.findOne({
            where: { id_event: eventId },
            include: [
                {
                    model: Clients,
                    attributes: ['f_name', 'l_name']
                },
                {
                    model: Employee,
                    attributes: ['fname', 'lname']
                }
            ]
        });

        res.status(200).json({
            message: 'Événement mis à jour avec succès',
            event: {
                id: updatedEvent.id_event,
                title: `${updatedEvent.Client?.f_name} ${updatedEvent.Client?.l_name} - ${updatedEvent.Employee?.fname} ${updatedEvent.Employee?.lname}`,
                start: `${updatedEvent.start_date}T${updatedEvent.start_time}`,
                end: `${updatedEvent.end_date}T${updatedEvent.end_time}`,
                extendedProps: {
                    client_id: updatedEvent.client_id,
                    employee_id: updatedEvent.employee_id,
                    prestation_id: updatedEvent.prestation_id,
                    notes: updatedEvent.notes,
                    description: updatedEvent.notes
                }
            }
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'événement:', error);
        res.status(500).json({
            message: 'Erreur lors de la mise à jour de l\'événement',
            error: error.message
        });
    }
};

// Supprimer un événement
exports.destroy = async (req, res) => {
    try {
        // Vérifier que l'utilisateur a les droits d'admin
        if (!req.user || req.user.role !== 1) {
            return res.status(403).json({ 
                message: 'Accès refusé. Droits administrateur requis.' 
            });
        }

        const eventId = req.params.id;
        
        // Vérifier que l'événement existe
        const event = await Event.findOne({ 
            where: { id_event: eventId },
            include: [
                {
                    model: Clients,
                    attributes: ['f_name', 'l_name']
                },
                {
                    model: Employee,
                    attributes: ['fname', 'lname']
                }
            ]
        });
        
        if (!event) {
            return res.status(404).json({ 
                message: 'Événement non trouvé' 
            });
        }

        // Récupérer les informations pour le message de confirmation
        const eventInfo = {
            client_name: `${event.Client?.f_name || ''} ${event.Client?.l_name || ''}`.trim(),
            employee_name: `${event.Employee?.fname || ''} ${event.Employee?.lname || ''}`.trim(),
            date: event.start_date,
            time: event.start_time
        };

        // Supprimer l'événement
        await event.destroy();

        res.status(200).json({
            message: 'Événement supprimé avec succès',
            deletedEvent: {
                id: eventId,
                info: eventInfo
            }
        });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'événement:', error);
        res.status(500).json({
            message: 'Erreur lors de la suppression de l\'événement',
            error: error.message
        });
    }
};