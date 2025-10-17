document.addEventListener('DOMContentLoaded', () => {
    const CalendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(CalendarEl, {
        initialView: 'timeGridWeek',
        locale: 'fr',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour',
        },
        height: 'auto',
        events: [], // Événements vides pour commencer
        selectable: true,
        weekends: true,
        editable: true,
        dayMaxEvents: true,

        // Configuration des heures d'affichage
        slotMinTime: '08:00:00', // Début à 8h
        slotMaxTime: '20:00:00', // Fin à 20h
        slotDuration: '00:30:00', // Créneaux de 30 minutes
        slotLabelInterval: '01:00:00', // Étiquettes toutes les heures
        slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        },
        // Callback pour personnaliser après le rendu
        viewDidMount: function() {
            // Appliquer les styles directement après chaque rendu
            setTimeout(() => {
                applyCustomStyles();
            }, 50);
        },
        eventDidMount: function() {
            // Re-appliquer après les événements
            setTimeout(() => {
                applyCustomStyles();
            }, 50);
        }
    });

    // Fonction pour appliquer les styles personnalisés
    function applyCustomStyles() {
        // Styles pour les boutons de navigation (prev, next)
        const navButtons = document.querySelectorAll('.fc-prev-button, .fc-next-button');
        navButtons.forEach(button => {
            // Retirer tous les styles par défaut
            button.removeAttribute('style');
            button.style.cssText = `
                background: linear-gradient(135deg, #8F95D3, #89DAFF) !important;
                border: none !important;
                border-radius: 12px !important;
                padding: 0.8rem 1.2rem !important;
                font-weight: 600 !important;
                color: white !important;
                box-shadow: 0 4px 15px rgba(143, 149, 211, 0.3) !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                margin: 0 4px !important;
                cursor: pointer !important;
            `;
            
            // Effets hover
            button.onmouseenter = function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(143, 149, 211, 0.4)';
            };
            
            button.onmouseleave = function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(143, 149, 211, 0.3)';
            };
        });

        // Styles pour les boutons de vue (mois, semaine, jour)
        const viewButtons = document.querySelectorAll('.fc-dayGridMonth-button, .fc-timeGridWeek-button, .fc-timeGridDay-button');
        viewButtons.forEach(button => {
            const isActive = button.classList.contains('fc-button-active');
            
            button.removeAttribute('style');
            button.style.cssText = `
                background: ${isActive ? 
                    'linear-gradient(135deg, #8F95D3, #89DAFF)' : 
                    'linear-gradient(135deg, #D3C4E3, #DBB1BC)'} !important;
                border: none !important;
                border-radius: 10px !important;
                padding: 0.6rem 1rem !important;
                font-weight: 600 !important;
                color: white !important;
                box-shadow: ${isActive ? 
                    '0 4px 15px rgba(143, 149, 211, 0.4)' : 
                    '0 4px 15px rgba(211, 196, 227, 0.3)'} !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                margin: 0 2px !important;
                font-size: 0.9rem !important;
                cursor: pointer !important;
            `;
            
            // Effets hover
            button.onmouseenter = function() {
                const isActiveNow = this.classList.contains('fc-button-active');
                this.style.transform = 'translateY(-1px)';
                this.style.boxShadow = isActiveNow ? 
                    '0 6px 20px rgba(143, 149, 211, 0.5)' : 
                    '0 6px 20px rgba(211, 196, 227, 0.4)';
            };
            
            button.onmouseleave = function() {
                const isActiveNow = this.classList.contains('fc-button-active');
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = isActiveNow ? 
                    '0 4px 15px rgba(143, 149, 211, 0.4)' : 
                    '0 4px 15px rgba(211, 196, 227, 0.3)';
            };
            
            // Gérer les clics pour mettre à jour le style actif
            button.onclick = function() {
                setTimeout(() => {
                    applyCustomStyles();
                }, 100);
            };
        });

        // Personnaliser le titre avec un beau design
        const title = document.querySelector('.fc-toolbar-title');
        if (title) {
            title.style.cssText = `
                font-size: 1.8rem !important;
                font-weight: 700 !important;
                color: white !important;
                background: linear-gradient(135deg, #8F95D3, #89DAFF) !important;
                padding: 0.8rem 1.5rem !important;
                border-radius: 15px !important;
                margin: 0 1rem !important;
                box-shadow: 0 4px 15px rgba(143, 149, 211, 0.3) !important;
                text-align: center !important;
                position: relative !important;
                overflow: hidden !important;
                backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
            `;
            
        }
    }

    // Appliquer les styles une première fois après le rendu initial
    calendar.render();
    setTimeout(() => {
        applyCustomStyles();
    }, 200);

    // Gestionnaire pour le bouton "Aujourd'hui"
    const todayBtn = document.querySelector('.calendar-btn.secondary');
    if (todayBtn) {
        todayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            calendar.today();
        });
    }

    // Gestionnaire pour le sélecteur de vue
    const viewSelector = document.getElementById('viewSelector');
    if (viewSelector) {
        viewSelector.addEventListener('change', function() {
            calendar.changeView(this.value);
        });
    }
    

});