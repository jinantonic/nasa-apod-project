# 🚀 NASA APOD Project
Have you ever looked up at the **night sky** after a long, tough day? Have you ever gazed at the stars when you felt like giving up on everything?
<br /><br />
When life gets hard, I often find myself searching for the **moon** and the **stars**, quietly saying hello to my loved ones who left this world too soon. 
<br /><br />
Living in **Ireland**, we have many cloudy days, which makes it hard to see a clear night sky. Thankfully, **NASA** shares breathtaking photos from beyond the night sky — real glimpses into the universe. I hope this site can be a place you visit whenever you miss the stars and wonder what lies beyond.
<br /><br />
This is the **NASA APOD Project**, a web application that lets you explore space through NASA's Astronomy Picture of the Day (APOD) and other NASA open APIs. Built using **React** for the frontend and **Node.js + Express** for the backend, this project showcases space data in a beautiful and interactive way.
<br /><br />
**This project is dedicated to dreamers like me.**
<br /><br /><br />


## 🛰️ Tech Stack
- **Frontend**: React, Context API, CSS
- **Backend**: Node.js, Express
- **API**: NASA Open API (APOD)
<br /><br /><br />


## ✨ Features
- Intro page that brings a mini universe to your screen
- Browse NASA's Astronomy Picture of the Day (APOD)
- Explore the APOD archive by date and media type
- Save your favorite content to a dedicated favorites page
- View and interact with your browsing history
- Easily select and explore APODs using a date picker
- Enjoy an interactive UI with filters, search, modals, and more
- Responsive design that works seamlessly across devices
- Global context for efficient state management (e.g., history and favorites)
<br /><br /><br />


## 💻 Project Structure
```plaintext
nasa-apod-project/
├── backend/
│   ├── controllers/
│   │   └── apodController.js
│   ├── routes/
│   │   └── apod.js
│   ├── services/
│   │   └── nasaApiService.js
│   ├── index.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── APODCard/
│   │   │   │   ├── APODCard.js
│   │   │   │   └── APODCard.css
│   │   │   ├── DatePicker/
│   │   │   │   ├── DatePicker.js
│   │   │   │   └── DatePicker.css
│   │   │   ├── Loading/
│   │   │   │   ├── Loading.js
│   │   │   │   └── Loading.css
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.js
│   │   │   │   └── Modal.css
│   │   │   ├── NavBar/
│   │   │   │   ├── NavBar.js
│   │   │   │   └── NavBar.css
│   │   │   └── Spacebackground.js
│   │   ├── contexts/
│   │   │   ├── GlobalContext.js
│   │   │   └── HistoryContext.js
│   │   ├── pages/
│   │   │   ├── APODArchive/
│   │   │   │   ├── APODArchive.js
│   │   │   │   └── APODArchive.css
│   │   │   ├── Favourites/
│   │   │   │   ├── Favourites.js
│   │   │   │   └── Favourites.css
│   │   │   ├── History/
│   │   │   │   ├── History.js
│   │   │   │   └── History.css
│   │   │   ├── Home.js
│   │   │   └── Intro/
│   │   │       ├── Intro.js
│   │   │       └── Intro.css
│   │   ├── App/
│   │   │   ├── App.js
│   │   │   └── App.css
│   │   ├── index/
│   │   │   ├── index.js
│   │   │   └── index.css
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```
<br /><br /><br />


## ⚙️ Project Setup
### 1️⃣ Clone the repository
```
git clone https://github.com/jinantonic/nasa-apod-project.git
cd nasa-apod-project
```
<br /><br />

### 2️⃣ Backend setup
1. Navigate to the frontend directory:
```
cd backend
```
<br />

2. Install dependencies:
```
npm install
```
<br />

3. Start the backend server:
```
npm start
```

The backend server will run on 'http://localhost:5001' by default (or as configured).

