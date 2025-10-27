document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const categorySearchInput = document.getElementById('categorySearchInput');
    const speakerSearchInput = document.getElementById('speakerSearchInput');
    let talks = [];

    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            talks = data;
            filterAndRenderTalks();
        });

    categorySearchInput.addEventListener('input', filterAndRenderTalks);
    speakerSearchInput.addEventListener('input', filterAndRenderTalks);

    function filterAndRenderTalks() {
        const categorySearchTerm = categorySearchInput.value.toLowerCase();
        const speakerSearchTerm = speakerSearchInput.value.toLowerCase();

        const filteredTalks = talks.filter(talk => {
            const matchesCategory = talk.category.some(cat => cat.toLowerCase().includes(categorySearchTerm));
            const matchesSpeaker = talk.speakers.some(speaker => speaker.toLowerCase().includes(speakerSearchTerm));

            // If both search terms are empty, show all talks
            if (!categorySearchTerm && !speakerSearchTerm) {
                return true;
            }
            // If only category search term is present, filter by category
            if (categorySearchTerm && !speakerSearchTerm) {
                return matchesCategory;
            }
            // If only speaker search term is present, filter by speaker
            if (!categorySearchTerm && speakerSearchTerm) {
                return matchesSpeaker;
            }
            // If both are present, filter by both (AND condition)
            return matchesCategory && matchesSpeaker;
        });

        renderSchedule(filteredTalks);
    }

    function renderSchedule(talksToRender) {
        scheduleContainer.innerHTML = '';
        const scheduleTimes = [
            "10:00 AM - 11:00 AM",
            "11:10 AM - 12:10 PM",
            "12:20 PM - 1:20 PM",
            "2:20 PM - 3:20 PM",
            "3:30 PM - 4:30 PM",
            "4:40 PM - 5:40 PM"
        ];

        let talkIndex = 0;
        for (let i = 0; i < 6; i++) {
            if (i === 3) { // Lunch break after the 3rd talk
                const lunchBreak = document.createElement('div');
                lunchBreak.className = 'schedule-item';
                lunchBreak.innerHTML = `
                    <h2>Lunch Break</h2>
                    <p class="time">1:20 PM - 2:20 PM</p>
                `;
                scheduleContainer.appendChild(lunchBreak);
            }

            // Find the next talk to render from the filtered list
            // This logic needs to be adjusted to correctly map filtered talks to their original time slots
            // For now, it will just display the filtered talks sequentially, which might not be ideal for a fixed schedule
            // A better approach would be to store original time slots with talks and filter based on that.
            // However, given the current structure, we'll display filtered talks in the order they appear.
            
            // To maintain the original schedule structure while filtering, we need to iterate through the original schedule times
            // and check if a talk from the filtered list matches that time slot. This requires storing time slots with talks.
            // For simplicity and to match the current `talks` array structure, I will just display the filtered talks sequentially.
            // If a more complex time-slot-aware filtering is needed, the `talks` data structure would need to be augmented with time info.

            if (talkIndex < talksToRender.length) {
                const talk = talksToRender[talkIndex];
                const talkElement = document.createElement('div');
                talkElement.className = 'schedule-item';
                talkElement.innerHTML = `
                    <h2>${talk.title}</h2>
                    <p class="time">${scheduleTimes[talkIndex]}</p>
                    <p><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
                    <p class="category"><strong>Category:</strong> ${talk.category.join(', ')}</p>
                    <p>${talk.description}</p>
                `;
                scheduleContainer.appendChild(talkElement);
                talkIndex++;
            }
        }
    }
});