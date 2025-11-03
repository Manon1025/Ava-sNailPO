// START CONFIG CALENDAR
document.addEventListener('DOMContentLoaded', () => {
    console.log('Calendar script loaded');
    const CalendarEl = document.getElementById('calendar');
    
    if (!CalendarEl) {
        console.error('Calendar element not found!');
        return;
    }
    
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
        events: {
            url: '/api/admin/planning',
            failure: function(err) {
                console.error('There was an error while fetching events!', err);
                alert('Erreur lors du chargement des événements');
            }
        },
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
            console.log('Calendar select event triggered');
            openModal(
                info.startStr.slice(0,10), 
                info.startStr.slice(11,16), 
                info.endStr.slice(0,10), 
                info.endStr.slice(11,16)
            );
        },

        eventClick: function(info) {
            console.log('Event click triggered');
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
    console.log('Calendar rendered successfully');

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
    const addEventBtn = document.getElementById('addEventBtn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', function() {
            const today = new Date();
            
            const todayStr = today.toISOString().slice(0, 10);
            const todayTimeStr = '09:00';
            const endTimeStr = '10:00'; // 1 heure plus tard

            openModal(todayStr, todayTimeStr, todayStr, endTimeStr);
        });
    } else {
        console.error('Add event button not found!');
    }
    // ! END BTN ADD EVENT

    // ! START EVENT MODAL
    function openModal(start, TimeStart, end, TimeEnd, title = '', description = '') {
        console.log('Opening modal with:', { start, TimeStart, end, TimeEnd, title, description });
        
        // Vérifier que les éléments existent
        const clientSelect = document.getElementById('client_id');
        const notesTextarea = document.getElementById('notes');
        const startDateInput = document.getElementById('start_date');
        const startTimeInput = document.getElementById('start_time');
        const endDateInput = document.getElementById('end_date');
        const endTimeInput = document.getElementById('end_time');
        const modalTitle = document.getElementById('modalTitle');
        const eventModal = document.getElementById('eventModal');

        if (!clientSelect || !notesTextarea || !startDateInput || !startTimeInput || !endDateInput || !endTimeInput || !modalTitle || !eventModal) {
            console.error('One or more modal elements not found');
            return;
        }

        // Adapter aux nouveaux IDs du formulaire
        clientSelect.value = title || ''; // Utiliser title pour client temporairement
        notesTextarea.value = description;
        startDateInput.value = start;
        startTimeInput.value = TimeStart;
        endDateInput.value = end;
        endTimeInput.value = TimeEnd;

        modalTitle.textContent = title ? 'Modifier l\'événement' : 'Ajouter un événement';

        eventModal.style.display = 'block';
        console.log('Modal opened successfully');
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