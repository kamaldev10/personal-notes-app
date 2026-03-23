import React, { useState } from "react";
import {
  getArchivedNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/local-data";
import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { Archive } from "lucide-react";

const ArchivePage = () => {
  const [notes, setNotes] = useState(getArchivedNotes());
  const [keyword, setKeyword] = useState("");

  const refresh = () => setNotes(getArchivedNotes());

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Archive className="inline-block mr-2" />
          <h1 className="text-3xl font-bold"> Arsip Catatan</h1>
        </div>

        <Link
          to="/"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Home
        </Link>
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

export default ArchivePage;
