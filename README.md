📝 Real-Time Collaborative Notes App

A full-stack web application that allows multiple users to collaborate on notes in real-time. Built using Node.js, Express, MongoDB, Socket.IO, and React.

🚀 Features

✅ Create and edit notes

📡 Real-time editing with Socket.IO

👥 See how many users are editing the note

💾 Auto-save every 5 seconds to MongoDB

🌐 Built using REST API + WebSockets

🎨 Styled with Tailwind CSS

🧱 Tech Stack

🔧 Backend

Node.js

Express

MongoDB (via Mongoose)

Socket.IO

🖥 Frontend

React

React Router DOM

Axios

Socket.IO Client

Tailwind CSS

Vite (build tool)

📁 Project Structure

├── backend
│   ├── models
│   │   └── Note.js
│   ├── routes
│   │   └── notes.js
│   ├── sockets
│   │   └── noteSocket.js
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   │   ├──CreateNotePage.jsx
│   │   │   │──NoteEditorPage.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public
│   └── tailwind.config.js

⚙️ Backend Setup

cd backend
npm install

🔑 Environment Variables (.env):

PORT=8000
MONGO_URI=mongodb+srv://venkatatrinadh4444:ZGktnAtQaMbaopHv@cluster0.qtyreqk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

▶️ Start Backend

npm run dev

This runs the Express server + WebSocket server on https://react-notes-app-7udq.onrender.com

🎨 Frontend Setup

cd frontend
npm install

▶️ Start Frontend

npm run dev

This runs the React app on http://localhost:5173

🔄 Real-Time Collaboration (Socket.IO)

When a user opens a note, they join a WebSocket room using noteId

When one user types, the update is broadcasted to all others in the same room

Active user count is tracked and shown

All changes are auto-saved every 5 seconds to MongoDB

🔬 API Endpoints

GET /api/notes/:id - Fetch a note

POST /api/notes - Create a new note

PUT /api/notes/:id - Update a note

🧪 Testing Realtime Sync

Start backend and frontend

Open http://localhost:5173/note/<note_id> in two tabs

Type in one tab and see it reflect in the other instantly

"Collaborators online" count will increase

📦 Libraries Used

Backend

express

mongoose

cors

dotenv

socket.io

nodemon (dev)

Frontend

react, react-dom

react-router-dom

axios

socket.io-client

tailwindcss

vite

✍️ Future Improvements

Authentication (JWT, login/signup)

Version history

Note sharing via links

Markdown support

👨‍💻 Developed by Bodagala Venkata Trinadh

