import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/local-data";
import { ArrowLeftCircle } from "lucide-react";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = getNote(id);

  if (!note) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Catatan tidak ditemukan</p>
      </div>
    );
  }

  const handleDelete = () => {
    deleteNote(id);
    navigate("/");
  };

  const handleArchiveToggle = () => {
    if (note.archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <ArrowLeftCircle className="inline-block mr-1" />
            <span>Kembali</span>
          </Link>

          <div className="flex gap-2">
            <button
              onClick={handleArchiveToggle}
              className="bg-mauve-500 hover:bg-mauve-600 text-white px-4 py-2 rounded-lg"
            >
              {note.archived ? "Unarchive" : "Archive"}
            </button>

            <button
              onClick={handleDelete}
              className="bg-rose-700 hover:bg-rose-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">{note.title}</h1>

        {/* Date */}
        <p className="text-sm text-gray-400 mt-2 mb-6">
          {new Date(note.createdAt).toLocaleString()}
        </p>

        {/* Body */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {note.body}
        </p>
      </div>
    </div>
  );
};

export default NoteDetailPage;
