// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import CreateNotePage from './pages/CreateNotePage';
import './App.css'
import NoteEditorPage from './pages/NoteEditorPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateNotePage />} />
      <Route path="/note/:id" element={<NoteEditorPage />} />
    </Routes>
  );
}
