# 🚀 NASA APOD Project

Welcome to **NASA APOD Project**, a web application that lets you explore space through NASA's Astronomy Picture of the Day (APOD) and other NASA open APIs!  
Built using **React** for the frontend and **Node.js + Express** for the backend, this project showcases space data in a beautiful and interactive way.

## ✨ Features

- Browse NASA's Astronomy Picture of the Day
- View APOD archive by date
- Add your favourite images to a favourites page
- View browsing history
- Date picker to easily select and explore different APODs
- Beautiful modal views with space-themed backgrounds
- Responsive design for different devices
- Global context for state management (e.g., history and favourites)

## 🛰️ Tech Stack

- **Frontend**: React, Context API, CSS
- **Backend**: Node.js, Express
- **API**: NASA Open API (APOD)

---

## 💻 Project Structure
nasa-apod-project/
├── backend/
│ ├── index.js
│ ├── package.json
│ └── ...
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── APODCard/
│ │ │ ├── DatePicker/
│ │ │ ├── Loading/
│ │ │ ├── NavBar/
│ │ │ ├── Modal/
│ │ │ └── Spacebackground.js
│ │ ├── contexts/
│ │ │ ├── GlobalContext.js
│ │ │ └── HistoryContext.js
│ │ ├── pages/
│ │ │ ├── APODArchive.js
│ │ │ ├── Favourites.js
│ │ │ ├── History.js
│ │ │ ├── Home.js
│ │ │ └── Intro.js
│ │ ├── App.js
│ │ ├── index.js
│ │ └── ...
│ ├── package.json
│ └── ...
└── README.md

yaml
Copy
Edit

