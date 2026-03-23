import React, { useState } from "react";
import {
  getActiveNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/local-data";
import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { ArchiveRestore, ClipboardPlus, NotebookPen } from "lucide-react";

const HomePage = () => {
  const [notes, setNotes] = useState(getActiveNotes());
  const [keyword, setKeyword] = useState("");

  const refresh = () => setNotes(getActiveNotes());

  // 🔍 filter notes
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase()) ||
      note.body.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3 items-center">
          <NotebookPen />
          <h1 className="text-3xl font-bold">Notes App</h1>
        </div>

        <div className="flex gap-2">
          <Link
            to="/notes/add"
            className="align-center border border-gray-600 bg-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg"
          >
            <ClipboardPlus className="inline-block mr-1" />
            <span className="font-semibold">Tambah</span>
          </Link>

          <Link
            to="/archieve"
            className="align-center border border-gray-600 bg-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg"
          >
            <ArchiveRestore className="inline-block mr-1" />
            <span className="font-semibold">Arsip</span>
          </Link>
        </div>
      </div>

      {/* Search */}
      <SearchBar keyword={keyword} onChange={setKeyword} />

      {/* List */}
      <NotesList
        notes={filteredNotes}
        onDelete={(id) => {
          deleteNote(id);
          refresh();
        }}
        onArchive={(id) => {
          archiveNote(id);
          refresh();
        }}
        onUnarchive={(id) => {
          unarchiveNote(id);
          refresh();
        }}
      />
    </div>
  );
};

export default HomePage;
