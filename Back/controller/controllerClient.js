const { Clients } = require('../model/associations')

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

        res.status(200).render('pages/admin/about-client', {title: 'voir plus', client_: client, user: req.user })

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
