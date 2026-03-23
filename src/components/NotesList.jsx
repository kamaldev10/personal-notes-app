import React from "react";
import NoteCard from "./NoteCard";

const NotesList = ({ notes, ...actions }) => {
  if (!notes.length) {
    return (
      <p className="text-center text-gray-400 mt-10">Tidak ada catatan </p>
    );
  }

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} {...actions} />
      ))}
    </div>
  );
};

export default NotesList;
