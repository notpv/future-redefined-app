document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const categorySearchInput = document.getElementById('categorySearchInput');
    const speakerSearchInput = document.getElementById('speakerSearchInput');
    const loadingIndicator = document.getElementById('loadingIndicator'); // Get reference to loading indicator
    let talks = [];

    // Show loading indicator before fetching data
    loadingIndicator.classList.remove('hidden');

    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            talks = data;
            filterAndRenderTalks();
        })
        .finally(() => {
            // Hide loading indicator after data is fetched and rendered (or if an error occurs)
            loadingIndicator.classList.add('hidden');
        });

    categorySearchInput.addEventListener('input', filterAndRenderTalks);
    speakerSearchInput.addEventListener('input', filterAndRenderTalks);

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
