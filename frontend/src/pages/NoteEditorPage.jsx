import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";


const socket = io("http://localhost:8000", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default function NoteEditorPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [collaborators, setCollaborators] = useState(0);
  const saveInterval = useRef(null);

  const socketRef = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(`http://localhost:8000/api/notes/${id}`);
      setNote(res.data);
      setContent(res.data.content);
    };
    fetchNote();
  }, [id]);

  // Socket events
  useEffect(() => {
  
    socketRef.current = socket;
  
    socket.emit("join-note", id);
  
    socket.on("receive-changes", (newContent) => {
      setContent(newContent);
    });
  
    socket.on("active-users", (count) => {
      setCollaborators(count);
    });
  
    return () => {
      socket.off("receive-changes");
      socket.off("active-users");
    };
  }, [id]);
  

  

  // Send changes live
  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    if (socketRef.current) {
      socketRef.current.emit("send-changes", { noteId: id, content: value });
    }
    
  };

  // Auto-save every 5 seconds
  useEffect(() => {
    if (!id) return;

    saveInterval.current = setInterval(() => {
      if (socketRef.current) {
        socketRef.current.emit("save-note", { noteId: id, content });
      }
      
    }, 5000);

    return () => clearInterval(saveInterval.current);
  }, [id, content]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-purple-700">
          {note?.title || "Loading..."}
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Collaborators online: {collaborators}
        </p>
        <textarea
          value={content}
          onChange={handleChange}
          rows={15}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 text-base shadow-sm resize-none"
          placeholder="Start typing your note..."
        />
        <p className="mt-2 text-sm text-gray-500">
          Last updated:{" "}
          {note?.updatedAt ? new Date(note.updatedAt).toLocaleString() : "–"}
        </p>
      </div>
    </div>
  );
}
