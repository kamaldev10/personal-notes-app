import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArchievePage from "./pages/ArchievePage";
import NotFoundPage from "./pages/NotFoundPage";
import AddNotePage from "./pages/AddNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/add" element={<AddNotePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
        <Route path="/archieve" element={<ArchievePage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </div>
  );
}

export default App;
