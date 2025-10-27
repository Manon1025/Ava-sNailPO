document.addEventListener('DOMContentLoaded', () => {
    const CalendarEl = document.getElementById('calendar');
    let currentEvent = null; // Variable pour stocker l'événement en cours d'édition

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
        slotMinTime: '08:00:00',                    // Début à 8h
        slotMaxTime: '20:00:00',                    // Fin à 20h
        slotDuration: '00:30:00',                   // Créneaux de 30 minutes
        slotLabelInterval: '01:00:00',              // Étiquettes toutes les heures
        slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        },
    });

    // Appliquer les styles une première fois après le rendu initial
    calendar.render();

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

    // BTN Add event
    document.getElementById('addEventBtn').addEventListener('click', function() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todayStr = today.toISOString().slice(0, 10);
        const todayTimeStr = '09:00';
        const tomorrowStr = tomorrow.toISOString().slice(0, 10);
        const tomorrowTimeStr = '10:00';

        openModal(todayStr, todayTimeStr, tomorrowStr, tomorrowTimeStr);
    });

    function openModal(start, TimeStart, end, TimeEnd, title = '', description = '') {
        document.getElementById('eventTitle').value = title;
        document.getElementById('eventDescription').value = description;
        document.getElementById('eventStart').value = start;
        document.getElementById('eventStartTime').value = TimeStart;
        document.getElementById('eventEnd').value = end;
        document.getElementById('eventEndTime').value = TimeEnd;

        document.getElementById('modalTitle').textContent = title ? 'Modifier l\'événement' : 'Ajouter un événement';

        document.getElementById('eventModal').style.display = 'block';
    }

    document.getElementById('cancelEventBtn').addEventListener('click', function() {
        closeModal();
    });

    document.getElementById('eventModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    function closeModal(){
        document.getElementById('eventModal').style.display = 'none';
        currentEvent = null;
        document.getElementById('eventForm').reset();
    }

    document.getElementById('eventForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('eventTitle').value;
        const description = document.getElementById('eventDescription').value;
        const startDate = document.getElementById('eventStart').value;
        const startTime = document.getElementById('eventStartTime').value;
        const endDate = document.getElementById('eventEnd').value;
        const endTime = document.getElementById('eventEndTime').value;

        const start = `${startDate}T${startTime}`;
        const end = `${endDate}T${endTime}`;

        if (currentEvent) {
            currentEvent.setProp('title', title);
            currentEvent.setStart(start);
            currentEvent.setEnd(end);
            currentEvent.setExtendedProp('description', description);
        } else {
            calendar.addEvent({
                title: title,
                start: start,
                end: end,
                description: description,
            });
        }

        closeModal();
    });

});