// TODO: Module
const express = require('express')
const router = express.Router()
const Employee = require('../model/Employee')
const { Event, Clients, Prestation } = require('../model/associations')
const { Op } = require('sequelize')

// TODO: Routes Tous les Users
    // * Accueil
    // ! req.user récupére les informations de l'utilisateur connecté
router.get('/', async (req, res) => {
    try {
        const fname = req.user.fname;
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
        
        // utiliser une fonction SQL pour comparer les dates
        const { Sequelize } = require('sequelize');
        
        // Récupérer les événements du jour
        const todayEvents = await Event.findAll({
            where: Sequelize.where(
                Sequelize.fn('DATE', Sequelize.col('start_date')), 
                todayStr
            ),
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
                    attributes: ['id_prestation', 'name', 'description']
                }
            ],
            order: [['start_time', 'ASC']] // Trier par heure de début
        });

        console.log('Événements trouvés:', todayEvents.length);
        if (todayEvents.length > 0) {
            console.log('Premier événement:', {
                id: todayEvents[0].id_event,
                start_date: todayEvents[0].start_date,
                start_time: todayEvents[0].start_time,
                client: todayEvents[0].Client?.f_name + ' ' + todayEvents[0].Client?.l_name
            });
        }

        // Calculer les statistiques
        const totalEvents = todayEvents.length;
        
        // Calculer les heures de travail (estimé)
        let totalWorkHours = 0;
        todayEvents.forEach(event => {
            const startTime = event.start_time;
            const endTime = event.end_time;
            
            if (startTime && endTime) {
                const [startHour, startMin] = startTime.split(':').map(Number);
                const [endHour, endMin] = endTime.split(':').map(Number);
                
                const startMinutes = startHour * 60 + startMin;
                const endMinutes = endHour * 60 + endMin;
                
                const durationMinutes = endMinutes - startMinutes;
                totalWorkHours += durationMinutes / 60;
            }
        });

        // Classer les événements par période
        const morningEvents = todayEvents.filter(event => {
            const hour = parseInt(event.start_time.split(':')[0]);
            return hour < 12;
        });

        const afternoonEvents = todayEvents.filter(event => {
            const hour = parseInt(event.start_time.split(':')[0]);
            return hour >= 12;
        });

        res.render('pages/homePage.ejs', {
            title: 'Accueil',
            fname,
            user: req.user,
            todayEvents,
            morningEvents,
            afternoonEvents,
            stats: {
                totalEvents,
                totalWorkHours: Math.round(totalWorkHours * 10) / 10 // Arrondir à 1 décimale
            }
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        
        // En cas d'erreur, afficher la page sans événements
        const fname = req.user.fname;
        res.render('pages/homePage.ejs', {
            title: 'Accueil',
            fname,
            user: req.user,
            todayEvents: [],
            morningEvents: [],
            afternoonEvents: [],
            stats: {
                totalEvents: 0,
                totalWorkHours: 0
            }
        });
    }
})

    // * Messagerie
router.get('/messagerie', (req, res) => {                                                           
    res.render('pages/tchat.ejs', {title: 'Messagerie', user: req.user})                    
})

    // * Profil
router.get('/profil',(req, res) => { 
    const user = req.user
    if(!user) return res.redirect('/login')
    
    const {
        fname,
        lname,
        poste,
        email,
        phone,
        street,
        city,
        cp,
        avatar,
    } = user;

    res.render('pages/profil.ejs', {
        title: 'Profil',
        fname, 
        lname, 
        poste, 
        email, 
        avatar, 
        phone, 
        street, 
        city, 
        cp,
        user: req.user
    });
})

// TODO: Exporter le routeur
module.exports = router