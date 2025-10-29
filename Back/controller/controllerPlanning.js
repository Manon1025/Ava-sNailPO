const { Event, Clients, Employee } = require('../model/associations')

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