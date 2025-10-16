const { head } = require("../Back/routes/routeEmployee");

document.addEventListener('DOMContentLoaded', () => {
    const CalendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(CalendarEl, {
        initialView: 'dayGridWeek',
        locale: 'fr',
        headerToolbar: {
            left: 'prev,next ',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        height: 'auto',
        events: '/employee/events', // URL pour récupérer les événements depuis le serveur
        selectable: true,
        weekends: true,
    });

    calendar.render();
});