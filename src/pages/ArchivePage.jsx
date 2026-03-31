import React, { useEffect } from "react";
import {
  getArchivedNotes,
  deleteNote,
  unarchiveNote,
} from "../api/network-data";
import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLanguage } from "../contexts/LanguageContext";
import { useInput } from "../hooks/useInput";
import { useNotes } from "../hooks/useNotes";

const ArchivePage = () => {
  const { t } = useLanguage();
  const [keyword, onKeywordChange] = useInput("");
  const { notes, loading, loadNotes } = useNotes(getArchivedNotes);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  const handleUnarchive = async (id) => {
    await unarchiveNote(id);
    loadNotes();
  };

  return (
    <div className="min-h-screen bg-(--bg)">
      <Navbar />
      <main className=" mx-auto px-4 sm:px-20 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-(--text) mb-1">
            {t.archiveTitle}
          </h2>
          <p className="text-sm text-(--text-muted)">
            {notes.length} {notes.length === 1 ? t.note : t.notes} Terarsip
          </p>
        </div>

        <SearchBar keyword={keyword} onChange={onKeywordChange} />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <NotesList
            notes={filteredNotes}
            onDelete={handleDelete}
            onArchive={() => {}}
            onUnarchive={handleUnarchive}
          />
        )}
      </main>
    </div>
  );
};

export default ArchivePage;
