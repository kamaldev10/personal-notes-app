import React from "react";
import NoteCard from "./NoteCard";
import { useLanguage } from "../contexts/LanguageContext";
import { FileX } from "lucide-react";

const NotesList = ({ notes, ...actions }) => {
  const { t } = useLanguage();

  if (!notes.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <FileX size={40} className="text-(--text-muted) opacity-40" />
        <p className="text-(--text-muted) text-sm">{t.noNotes}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} {...actions} />
      ))}
    </div>
  );
};

export default NotesList;
