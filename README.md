# 🚀 NASA APOD Project
Have you ever looked up at the **night sky** after a long, tough day? Have you ever gazed at the stars when you felt like giving up on everything?

When life gets hard, I often find myself searching for the **moon** and the **stars**, quietly saying hello to my loved ones who left this world too soon. 

Living in **Ireland**, we have many cloudy days, which makes it hard to see a clear night sky. Thankfully, **NASA** shares breathtaking photos from beyond the night sky — real glimpses into the universe. I hope this site can be a place you visit whenever you miss the stars and wonder what lies beyond.

**This project is dedicated to dreamers like me.**

This is the **NASA APOD Project**, a web application that lets you explore space through NASA's Astronomy Picture of the Day (APOD) and other NASA open APIs. Built using **React** for the frontend and **Node.js + Express** for the backend, this project showcases space data in a beautiful and interactive way.


## 🛰️ Tech Stack
- **Frontend**: React, Context API, CSS
- **Backend**: Node.js, Express
- **API**: NASA Open API (APOD)


## ✨ Features
- Browse NASA's Astronomy Picture of the Day
- View APOD archive by date
- Add your favourite images to a favourites page
- View browsing history
- Date picker to easily select and explore different APODs
- Beautiful modal views with space-themed backgrounds
- Responsive design for different devices
- Global context for state management (e.g., history and favourites)


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



