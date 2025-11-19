const { Clients, Event, Employee, Prestation } = require('../model/associations')

exports.index = async (req, res) => {
    try {
        const clients = await Clients.findAll()

        res.status(200).render('pages/admin/client', {
            title: 'Gestion des clients',
            clients,
            user: req.user,
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
}

exports.show = async (req, res ) => {
    try {
        const clientId = req.params.id;
        const client = await Clients.findOne({
            where: {
                id_client: clientId
            }
        })

        if(!client) {
            return res.status(400).json({message: 'Client non trouvé'})
        }

        // Récupérer l'historique des rendez-vous du client
        const rendezVous = await Event.findAll({
            where: {
                client_id: clientId
            },
            include: [
                {
                    model: Employee,
                    attributes: ['id_employee', 'fname', 'lname']
                },
                {
                    model: Prestation,
                    attributes: ['id_prestation', 'name', 'description', 'price']
                }
            ],
            order: [['start_date', 'DESC'], ['start_time', 'DESC']] // Plus récents en premier
        });

        // Calculer quelques statistiques
        const now = new Date();
        const currentDate = now.toISOString().split('T')[0];
        const currentTime = now.toTimeString().split(' ')[0];

        const rendezVousPasses = rendezVous.filter(rdv => {
            return rdv.start_date < currentDate || 
                   (rdv.start_date === currentDate && rdv.start_time < currentTime);
        });

        const rendezVousFuturs = rendezVous.filter(rdv => {
            return rdv.start_date > currentDate || 
                   (rdv.start_date === currentDate && rdv.start_time >= currentTime);
        });

        const prochainRendezVous = rendezVousFuturs.sort((a, b) => {
            if (a.start_date !== b.start_date) {
                return new Date(a.start_date) - new Date(b.start_date);
            }
            return a.start_time.localeCompare(b.start_time);
        })[0];

        const stats = {
            totalRendezVous: rendezVous.length,
            rendezVousPasses: rendezVousPasses.length,
            rendezVousFuturs: rendezVousFuturs.length,
            prochainRendezVous: prochainRendezVous
        };

        res.status(200).render('pages/admin/about-client', {
            title: 'voir plus', 
            client_: client, 
            user: req.user,
            rendezVous: rendezVous,
            stats: stats
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
}

exports.create = async (req, res) => {
    try {
        const {
            f_name,
            l_name,
            phone,
            mail,
            birth_date,
            remarq_medi,
            preference
        } = req.body

        console.log(req.body)

        const client = await Clients.create({
            f_name,
            l_name,
            phone,
            mail,
            birth_date,
            remarq_medi,
            preference,
            create_at: new Date()
        });

        res.redirect('/clients?message=ajout&name=' + encodeURIComponent(client.f_name + ' ' +client.l_name))
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const client = await Clients.findByPk(id);

        if (!client) {
            return res.status(404).json({ message: 'Client non trouvé' });
        }

        await client.destroy();
        res.redirect('/clients?message=suppression&name=' + encodeURIComponent(client.f_name + ' ' +client.l_name));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
}
