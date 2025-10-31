const { Event, Clients, Employee } = require('../model/associations')

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
            })
            
            res.render('pages/planning.ejs', {
                title: 'Planning', 
                user: req.user,
                employees: employees,
                clients: clients
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des employés:', error);
            res.render('pages/planning.ejs', {
                title: 'Planning', 
                user: req.user,
                employees: []
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

        res.status(200).json({ events });
    } catch (err) {
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
            prestations_id,
            notes
        } = req.body;

        const event = await Event.create({
            client_id,
            employee_id,
            start_date,
            start_time,
            end_date,
            end_time,
            prestations_id,
            notes,
            create_at: new Date()
        })

        res.redirect('/planning?message=ajouté&name=' + encodeURIComponent(event.client_id + ' ' + event.client_id + ' ' + event.prestations_id))
    } catch (err) {
        console.error('Erreur lors de la création de l\'événement', err)
        res.status(500).json({
            message: 'Erreur lors de la création de l\'événement',
            error: err.message
        })
    }
};