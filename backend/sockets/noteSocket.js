const Note = require('../models/Note');

const activeUsers = {}; 

function noteSocket(io) {
  io.on('connection', (socket) => {
    //console.log(`Socket connected: ${socket.id}`);

    socket.on('join-note', (noteId) => {
      //console.log(`📄 Socket ${socket.id} joined note room: ${noteId}`);

      socket.join(noteId);

      // Track active users
      if (!activeUsers[noteId]) activeUsers[noteId] = new Set();
      activeUsers[noteId].add(socket.id);

      io.to(noteId).emit('active-users', activeUsers[noteId].size);

      // Broadcast changes to others
      socket.on('send-changes', ({ content }) => {
        //console.log(`[room ${noteId}]  ← send-changes from ${socket.id}:`,content.slice(0, 30));
        socket.to(noteId).emit('receive-changes', content);
        //console.log(`[room ${noteId}]  → receive-changes broadcast`);
      });

      // Save to DB
      socket.on('save-note', async ({ noteId, content }) => {
        try {
          await Note.findByIdAndUpdate(noteId, { content }, { new: true });
        } catch (error) {
          console.error("Error saving note via socket:", error.message);
        }
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        //console.log(`Socket disconnected: ${socket.id}`);
        if (activeUsers[noteId]) {
          activeUsers[noteId].delete(socket.id);
          io.to(noteId).emit('active-users', activeUsers[noteId].size);
        }
      });
    });
  });
}

module.exports = noteSocket;

