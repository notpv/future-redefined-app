document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const categorySearchInput = document.getElementById('categorySearchInput');
    const speakerSearchInput = document.getElementById('speakerSearchInput');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const clearSearchButton = document.getElementById('clearSearchButton'); // Get reference to clear button
    let talks = [];

    // Define the master schedule structure with fixed times and types
    const masterSchedule = [
        { type: 'talk', time: "10:00 AM - 11:00 AM", originalIndex: 0 },
        { type: 'transition', time: "11:00 AM - 11:10 AM" },
        { type: 'talk', time: "11:10 AM - 12:10 PM", originalIndex: 1 },
        { type: 'transition', time: "12:10 PM - 12:20 PM" },
        { type: 'talk', time: "12:20 PM - 1:20 PM", originalIndex: 2 },
        { type: 'break', time: "1:20 PM - 2:20 PM", title: "Lunch Break" },
        { type: 'talk', time: "2:20 PM - 3:20 PM", originalIndex: 3 },
        { type: 'transition', time: "3:20 PM - 3:30 PM" },
        { type: 'talk', time: "3:30 PM - 4:30 PM", originalIndex: 4 },
        { type: 'transition', time: "4:30 PM - 4:40 PM" },
        { type: 'talk', time: "4:40 PM - 5:40 PM", originalIndex: 5 }
    ];


    loadingIndicator.classList.remove('hidden');

    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            talks = data;
            filterAndRenderTalks();
        })
        .finally(() => {
            loadingIndicator.classList.add('hidden');
        });

    categorySearchInput.addEventListener('input', filterAndRenderTalks);
    speakerSearchInput.addEventListener('input', filterAndRenderTalks);

    clearSearchButton.addEventListener('click', () => {
        categorySearchInput.value = '';
        speakerSearchInput.value = '';
        filterAndRenderTalks(); // Re-render with cleared filters
    });

    function filterAndRenderTalks() {
        const categorySearchTerm = categorySearchInput.value.toLowerCase();
        const speakerSearchTerm = speakerSearchInput.value.toLowerCase();

        const filteredTalks = talks.filter(talk => {
            const matchesCategory = talk.category.some(cat => cat.toLowerCase().includes(categorySearchTerm));
            const matchesSpeaker = talk.speakers.some(speaker => speaker.toLowerCase().includes(speakerSearchTerm));

            if (!categorySearchTerm && !speakerSearchTerm) {
                return true;
            }
            if (categorySearchTerm && !speakerSearchTerm) {
                return matchesCategory;
            }
            if (!categorySearchTerm && speakerSearchTerm) {
                return matchesSpeaker;
            }
            return matchesCategory && matchesSpeaker;
        });

        // Add/remove visual indicator for active filters
        if (categorySearchTerm || speakerSearchTerm) {
            scheduleContainer.classList.add('filtered-active');
        } else {
            scheduleContainer.classList.remove('filtered-active');
        }

        renderSchedule(filteredTalks);
    }

    function renderSchedule(filteredTalks) { // Renamed parameter for clarity
        scheduleContainer.innerHTML = '';

        if (filteredTalks.length === 0 && (categorySearchInput.value || speakerSearchInput.value)) { // Only show no results if search is active
            const noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'schedule-item';
            noResultsMessage.innerHTML = `<h2>No talks found matching your criteria.</h2>`;
            scheduleContainer.appendChild(noResultsMessage);
            return;
        }

        masterSchedule.forEach(slot => {
            if (slot.type === 'break') {
                const breakElement = document.createElement('div');
                breakElement.className = 'schedule-item';
                breakElement.innerHTML = `
                    <h2>${slot.title}</h2>
                    <p class="time">${slot.time}</p>
                `;
                scheduleContainer.appendChild(breakElement);
            } else if (slot.type === 'talk') {
                // Find the talk that corresponds to this original slot and is in the filtered list
                const talk = filteredTalks.find(t => talks.indexOf(t) === slot.originalIndex);

                if (talk) {
                    const talkElement = document.createElement('div');
                    talkElement.className = 'schedule-item';
                    talkElement.innerHTML = `
                        <h2>${talk.title}</h2>
                        <p class="time">${slot.time}</p>
                        <p><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
                        <p class="category"><strong>Category:</strong> ${talk.category.join(', ')}</p>
                        <p>${talk.description}</p>
                    `;
                    scheduleContainer.appendChild(talkElement);
                }
                // If no talk matches this slot in the filtered list, we simply don't render anything for this slot
                // This maintains the time integrity by leaving gaps for filtered-out talks.
            } else if (slot.type === 'transition') {
                // Optionally render a transition element, or leave it as a visual gap
                // For now, we'll leave it as a visual gap to keep the display cleaner when talks are filtered.
            }
        });
    }
});
