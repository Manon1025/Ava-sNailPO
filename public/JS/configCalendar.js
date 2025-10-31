// START CONFIG CALENDAR
document.addEventListener('DOMContentLoaded', () => {
    const CalendarEl = document.getElementById('calendar');
    let currentEvent = null;                                // Variable pour stocker l'événement en cours d'édition

    // ! START INIT CALENDAR
    const calendar = new FullCalendar.Calendar(CalendarEl, {
        initialView: 'timeGridWeek',
        locale: 'fr',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        allDayText: 'Jours',
        buttonText: {
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour',
        },
        height: 'auto',
        events: '/api/admin/planning',
        selectable: true,
        selectMirror: true,
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

        select: function(info){
            openModal(
                info.startStr.slice(0,10), 
                info.startStr.slice(11,16), 
                info.endStr.slice(0,10), 
                info.endStr.slice(11,16)
            );
        },

        eventClick: function(info) {
            currentEvent = info.event;
            const title = info.event.title;
            const description = info.event.extendedProps.description || '';
            const start = info.event.start;
            const end = info.event.end;

            const startDate = start.toISOString().slice(0,10);
            const startTime = start.toISOString().slice(11,16);
            const endDate = end ? end.toISOString().slice(0,10) : startDate;
            const endTime = end ? end.toISOString().slice(11,16) : startTime;

            openModal(startDate, startTime, endDate, endTime, title, description);
        },
    });
    // ! END INIT CALENDAR

    // TODO: RENDU CALENDAR
    calendar.render();

    // ! START EVENT DAY
    const todayBtn = document.querySelector('.calendar-btn.secondary');
    if (todayBtn) {
        todayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            calendar.today();
        });
    }
    // ! END EVENT DAY

    // ! START EVENT VIEW
    const viewSelector = document.getElementById('viewSelector');
    if (viewSelector) {
        viewSelector.addEventListener('change', function() {
            calendar.changeView(this.value);
        });
    }
    // ! END EVENT VIEW

    // ! START BTN ADD EVENT
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
    // ! END BTN ADD EVENT

    // ! START EVENT MODAL
    function openModal(start, TimeStart, end, TimeEnd, title = '', description = '') {
        // Adapter aux nouveaux IDs du formulaire
        document.getElementById('client_id').value = title || ''; // Utiliser title pour client temporairement
        document.getElementById('notes').value = description;
        document.getElementById('start_date').value = start;
        document.getElementById('start_time').value = TimeStart;
        document.getElementById('end_date').value = end;
        document.getElementById('end_time').value = TimeEnd;

        document.getElementById('modalTitle').textContent = title ? 'Modifier l\'événement' : 'Ajouter un événement';

        document.getElementById('eventModal').style.display = 'block';
    }
    // ! END EVENT MODAL

    // TODO: CANCEL MODAL
    document.getElementById('cancelEventBtn').addEventListener('click', function() {
        closeModal();
    });

    // TODO: CLOSE MODAL CLICK OUTSIDE
    document.getElementById('eventModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // ! START CLOSE MODAL
    function closeModal(){
        document.getElementById('eventModal').style.display = 'none';
        currentEvent = null;
        document.getElementById('eventForm').reset();
    }
    // ! END CLOSE MODAL

    // ! START SUBMIT EVENT FORM
    document.getElementById('eventForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Adapter aux nouveaux IDs du formulaire
        const title = document.getElementById('client_id').value; // Temporaire
        const description = document.getElementById('notes').value;
        const startDate = document.getElementById('start_date').value;
        const startTime = document.getElementById('start_time').value;
        const endDate = document.getElementById('end_date').value;
        const endTime = document.getElementById('end_time').value;

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
    // ! END SUBMIT EVENT FORM

});
// END CONFIG CALENDAR