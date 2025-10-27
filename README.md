# Future Redefined Event Website

A simple, single-page website for a 1-day technical event named "Future Redefined," featuring a schedule of talks, speaker information, and a category-based search functionality. The website is designed with a futuristic, dark theme using red and black colors.

## Features

*   **Dynamic Schedule Display:** Presents a clear, time-ordered schedule of 6 technical talks, each lasting 1 hour, with 10-minute transitions.
*   **Talk Details:** Each talk entry includes its title, speaker(s) (Indian origin names), category (keywords), duration, and a brief description.
*   **Lunch Break:** A dedicated 1-hour lunch break is integrated into the schedule.
*   **Category Search:** Users can easily filter talks by typing keywords into a search bar.
*   **Thematic Design:** A futuristic, dark theme inspired by dark-mode YouTube, featuring red and black colors, and using Montserrat and Raleway fonts for a modern aesthetic.
*   **Responsive Layout:** (Implicitly handled by CSS) The design aims to be viewable across different screen sizes.

## Technologies Used

*   **Backend:** Node.js (with built-in `http`, `fs`, `path` modules)
*   **Frontend:**
    *   HTML5
    *   CSS3 (with Google Fonts: Montserrat & Raleway)
    *   JavaScript (Vanilla JS)

## Project Structure

```
future-redefined/
├── data/
│   └── talks.json          # Stores all talk data
├── public/
│   ├── index.html          # Main HTML page
│   ├── style.css           # Stylesheet for the website
│   └── script.js           # Client-side JavaScript for dynamic content and search
├── server.js               # Node.js backend server
├── .gitignore              # Specifies intentionally untracked files to ignore
└── package.json            # Node.js project metadata
```

## Setup and Running Instructions

To get this project up and running on your local machine, follow these steps:

1.  **Prerequisites:**
    *   Ensure you have Node.js installed. If not, download and install it from [https://nodejs.org/](https://nodejs.org/).

2.  **Clone the Repository (if you haven't already):**
    ```bash
    git clone https://github.com/notpv/future-redefined-app.git
    cd future-redefined-app
    ```

3.  **Install Dependencies:**
    This project uses only built-in Node.js modules and client-side libraries, so there are no `npm` dependencies to install.

4.  **Start the Server:**
    Open your terminal or command prompt, navigate to the project's root directory, and run the server:
    ```bash
    node server.js
    ```
    You should see a message indicating the server is running:
    ```
    Server running at http://localhost:3000/
    ```

5.  **Access the Website:**
    Open your web browser and go to:
    ```
    http://localhost:3000/
    ```

You should now see the "Future Redefined" event website.

## How to Use

*   **View Schedule:** The full day's schedule, including talks and the lunch break, will be displayed on the page.
*   **Search Talks:** Use the search bar at the top of the page to filter talks by category keywords (e.g., "AI", "Blockchain", "UI/UX").

## Customization

*   **Talk Data:** Modify `data/talks.json` to update talk titles, speakers, categories, descriptions, or add/remove talks.
*   **Styling:** Adjust `public/style.css` to change colors, fonts, layout, or other visual aspects.
*   **Frontend Logic:** Update `public/script.js` to alter how the schedule is rendered or how search works.
*   **Server Logic:** Modify `server.js` if you need to change the port, add more API endpoints, or alter file serving logic.

---
