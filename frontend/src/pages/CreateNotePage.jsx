
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateNotePage() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title.trim()) return;
    const res = await axios.post('http://localhost:8000/api/notes', { title });
    navigate(`/note/${res.data._id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-purple-700">
          Create a Collaborative Note
        </h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleCreate}
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
        >
          Create Note
        </button>
      </div>
    </div>
  );
}
