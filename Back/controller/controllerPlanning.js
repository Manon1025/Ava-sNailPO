const { Event, Clients, Employee, Prestation } = require('../model/associations')

exports.show = async (req, res) => {
    try {
            // Récupérer tous les employés actifs
            const employees = await Employee.findAll({
                where: { isActive: true },
                attributes: ['id_employee', 'fname', 'lname'],
                order: [['fname', 'ASC'], ['lname', 'ASC']]
            });

            const clients = await Clients.findAll({
                attributes: ['id_client', 'f_name', 'l_name']
            });
            
            const prestations = await Prestation.findAll({
                attributes: ['id_prestations', 'name']
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
                clients: []
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

        const event = await Event.create({
            client_id,
            employee_id,
            start_date,
            start_time,
            end_date,
            end_time,
            prestation_id,
            notes,
            create_at: new Date()
        })

        res.redirect('/planning?message=ajouté&name=' + encodeURIComponent(event.client_id + ' ' + event.employee_id + ' ' + event.prestation_id))
    } catch (err) {
        console.error('Erreur lors de la création de l\'événement', err)
        res.status(500).json({
            message: 'Erreur lors de la création de l\'événement',
            error: err.message
        })
    }
};