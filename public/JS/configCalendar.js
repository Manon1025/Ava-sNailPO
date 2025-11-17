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
            console.log('Event click triggered', info.event.id);
            currentEvent = info.event;
            
            // Récupérer les données complètes de l'événement depuis le serveur
            fetch(`/api/admin/planning/event/${info.event.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la récupération de l\'événement');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Event data received:', data);
                    
                    // Ouvrir la modal avec les données pré-remplies
                    openModalWithEventData(data.event, data.employees, data.clients, data.prestations);
                })
                .catch(error => {
                    console.error('Erreur:', error);
                    alert('Erreur lors de la récupération des données de l\'événement');
                });
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
        const startDateInput = document.getElementById('start_date');
        const startTimeInput = document.getElementById('start_time');
        const endDateInput = document.getElementById('end_date');
        const endTimeInput = document.getElementById('end_time');
        const modalTitle = document.getElementById('modalTitle');
        const eventModal = document.getElementById('eventModal');
        const eventForm = document.getElementById('eventForm');
        const eventIdInput = document.getElementById('event_id');
        const methodInput = document.getElementById('_method');
        const saveButtonText = document.getElementById('saveButtonText');
        const deleteEventBtn = document.getElementById('deleteEventBtn');

        if (!startDateInput || !startTimeInput || !endDateInput || !endTimeInput || !modalTitle || !eventModal) {
            console.error('One or more modal elements not found');
            return;
        }

        // Remplir les champs de base
        startDateInput.value = start;
        startTimeInput.value = TimeStart;
        endDateInput.value = end;
        endTimeInput.value = TimeEnd;

        // Réinitialiser pour la création
        modalTitle.textContent = 'Ajouter un événement';
        if (saveButtonText) saveButtonText.textContent = 'Enregistrer';
        if (deleteEventBtn) deleteEventBtn.style.display = 'none';
        
        // Réinitialiser les champs cachés
        if (eventIdInput) eventIdInput.value = '';
        if (methodInput) methodInput.value = '';
        
        // Remettre l'action par défaut du formulaire
        eventForm.action = '/add-event-planning';
        eventForm.method = 'POST';

        eventModal.style.display = 'block';
        console.log('Modal opened successfully');
    }

    // ! START EVENT MODAL WITH DATA (pour modification)
    function openModalWithEventData(eventData, employees, clients, prestations) {
        console.log('Opening modal with event data:', eventData);
        
        // Vérifier que les éléments existent
        const clientSelect = document.getElementById('client_id');
        const employeeSelect = document.getElementById('employee_id');
        const prestationSelect = document.getElementById('prestation_id');
        const notesTextarea = document.getElementById('notes');
        const startDateInput = document.getElementById('start_date');
        const startTimeInput = document.getElementById('start_time');
        const endDateInput = document.getElementById('end_date');
        const endTimeInput = document.getElementById('end_time');
        const modalTitle = document.getElementById('modalTitle');
        const eventModal = document.getElementById('eventModal');
        const eventForm = document.getElementById('eventForm');
        const eventIdInput = document.getElementById('event_id');
        const methodInput = document.getElementById('_method');
        const saveButtonText = document.getElementById('saveButtonText');
        const deleteEventBtn = document.getElementById('deleteEventBtn');

        if (!clientSelect || !employeeSelect || !prestationSelect || !notesTextarea || 
            !startDateInput || !startTimeInput || !endDateInput || !endTimeInput || 
            !modalTitle || !eventModal || !eventForm) {
            console.error('One or more modal elements not found');
            return;
        }

        // Mettre à jour les options des sélecteurs avec les nouvelles données
        updateSelectOptions(clientSelect, clients, 'id_client', ['f_name', 'l_name']);
        updateSelectOptions(employeeSelect, employees, 'id_employee', ['fname', 'lname']);
        updateSelectOptions(prestationSelect, prestations, 'id_prestation', ['name']);

        // Pré-remplir le formulaire avec les données de l'événement
        clientSelect.value = eventData.client_id;
        employeeSelect.value = eventData.employee_id;
        prestationSelect.value = eventData.prestation_id;
        notesTextarea.value = eventData.notes || '';
        startDateInput.value = eventData.start_date;
        startTimeInput.value = eventData.start_time;
        endDateInput.value = eventData.end_date;
        endTimeInput.value = eventData.end_time;

        // Configurer le formulaire pour la modification
        if (eventIdInput) eventIdInput.value = eventData.id_event;
        if (methodInput) methodInput.value = 'PUT';
        
        modalTitle.textContent = 'Modifier l\'événement';
        if (saveButtonText) saveButtonText.textContent = 'Modifier';
        
        // Afficher le bouton supprimer seulement si l'utilisateur a les droits et qu'il existe
        if (deleteEventBtn) {
            deleteEventBtn.style.display = 'inline-block';
        }

        // Changer l'action du formulaire pour la modification
        eventForm.action = `/api/admin/planning/${eventData.id_event}`;
        eventForm.method = 'POST';

        eventModal.style.display = 'block';
        console.log('Modal opened with event data successfully');
    }

    // ! START UPDATE SELECT OPTIONS
    function updateSelectOptions(selectElement, options, valueField, nameFields) {
        // Vider les options existantes (sauf la première option par défaut)
        while (selectElement.children.length > 1) {
            selectElement.removeChild(selectElement.lastChild);
        }

        // Ajouter les nouvelles options
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option[valueField];
            
            // Construire le nom d'affichage à partir des champs fournis
            const displayName = nameFields.map(field => option[field]).join(' ').trim();
            optionElement.textContent = displayName;
            
            selectElement.appendChild(optionElement);
        });
    }
    // ! END EVENT MODAL

    // TODO: CANCEL MODAL
    document.getElementById('cancelEventBtn').addEventListener('click', function() {
        closeModal();
    });

    // TODO: DELETE EVENT
    const deleteEventBtn = document.getElementById('deleteEventBtn');
    if (deleteEventBtn) {
        deleteEventBtn.addEventListener('click', function() {
            if (currentEvent) {
                const eventTitle = currentEvent.title || 'Événement sans titre';
                const confirmMessage = `Êtes-vous sûr de vouloir supprimer l'événement :\n"${eventTitle}" ?`;
                
                if (confirm(confirmMessage)) {
                    deleteEvent(currentEvent.id);
                }
            }
        });
    }

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
        
        // Réinitialiser les boutons et champs cachés
        const saveButtonText = document.getElementById('saveButtonText');
        const deleteEventBtn = document.getElementById('deleteEventBtn');
        const eventIdInput = document.getElementById('event_id');
        const methodInput = document.getElementById('_method');
        
        if (saveButtonText) saveButtonText.textContent = 'Enregistrer';
        if (deleteEventBtn) deleteEventBtn.style.display = 'none';
        if (eventIdInput) eventIdInput.value = '';
        if (methodInput) methodInput.value = '';
    }
    // ! END CLOSE MODAL

    // ! START DELETE EVENT
    function deleteEvent(eventId) {
        console.log('Deleting event:', eventId);
        
        fetch(`/api/admin/planning/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression');
            }
            return response.json();
        })
        .then(result => {
            console.log('Event deleted successfully:', result);
            
            // Supprimer l'événement du calendrier
            if (currentEvent) {
                currentEvent.remove();
            }
            
            closeModal();
            alert('Événement supprimé avec succès !');
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur lors de la suppression de l\'événement');
        });
    }
    // ! END DELETE EVENT

    // ! START SUBMIT EVENT FORM
    document.getElementById('eventForm').addEventListener('submit', function(e) {
        if (currentEvent) {
            // Mode édition : empêcher la soumission normale et envoyer une requête PUT
            e.preventDefault();
            
            const formData = new FormData(this);
            const eventId = currentEvent.id;
            
            // Convertir FormData en objet
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            console.log('Updating event with data:', data);

            // Envoyer la requête PUT pour mettre à jour l'événement
            fetch(`/api/admin/planning/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la mise à jour');
                }
                return response.json();
            })
            .then(result => {
                console.log('Event updated successfully:', result);
                
                // Mettre à jour l'événement dans le calendrier
                const updatedEventData = result.event;
                currentEvent.setProp('title', updatedEventData.title);
                currentEvent.setStart(updatedEventData.start);
                currentEvent.setEnd(updatedEventData.end);
                currentEvent.setExtendedProp('client_id', updatedEventData.extendedProps.client_id);
                currentEvent.setExtendedProp('employee_id', updatedEventData.extendedProps.employee_id);
                currentEvent.setExtendedProp('prestation_id', updatedEventData.extendedProps.prestation_id);
                currentEvent.setExtendedProp('notes', updatedEventData.extendedProps.notes);
                currentEvent.setExtendedProp('description', updatedEventData.extendedProps.description);
                
                closeModal();
                alert('Événement mis à jour avec succès !');
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Erreur lors de la mise à jour de l\'événement');
            });
        } else {
            // Mode création : laisser le formulaire se soumettre normalement au serveur
            console.log('Submitting new event to server...');
        }
    });
    // ! END SUBMIT EVENT FORM

});
// END CONFIG CALENDAR