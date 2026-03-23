import React from "react";
import { Link } from "react-router-dom";

const NoteCard = ({ note, onDelete, onArchive, onUnarchive }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition">
      <Link to={`/notes/${note.id}`}>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 ">{note.title}</h2>
          <p className="text-sm text-gray-400 mb-2">
            {new Date(note.createdAt).toLocaleDateString()}
          </p>

          <p className="text-gray-600 text-sm line-clamp-3">{note.body}</p>
        </div>
      </Link>

      <div className="flex gap-2 mt-4">
        {note.archived ? (
          <button
            onClick={() => onUnarchive(note.id)}
            className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-1 rounded-lg"
          >
            Unarchive
          </button>
        ) : (
          <button
            onClick={() => onArchive(note.id)}
            className="flex-1 bg-mauve-700 hover:bg-mauve-600 text-white py-1 rounded-lg"
          >
            Archive
          </button>
        )}

        <button
          onClick={() => onDelete(note.id)}
          className="flex-1 bg-rose-700 hover:bg-rose-600 text-white py-1 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
