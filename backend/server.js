const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const noteRoutes = require('./routes/noteRoutes');
const noteSocket = require('./sockets/noteSocket');

dotenv.config();

const app = express();
const server = http.createServer(app); // for socket requires raw http server


app.use(cors());
app.use(express.json());
app.use('/api', noteRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server connected and running on port ${PORT}`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: ['https://react-notes-app-gules.vercel.app','http://localhost:5173'],
    methods: ['GET', 'POST'],
  },
});

noteSocket(io); // connect socket logic
