import React from "react";
import { Link } from "react-router-dom";
import { Trash2, ArchiveRestore, ArchiveX } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const NoteCard = ({ note, onDelete, onArchive, onUnarchive }) => {
  const { t } = useLanguage();

  return (
    <div className="group bg-(--surface) border border-(--border) rounded-xl p-4 flex flex-col justify-between hover:border-(--accent) hover:shadow-md transition-all duration-200">
      <Link to={`/notes/${note.id}`} className="flex-1 min-h-0">
        <h2 className="text-base font-semibold text-(--text) line-clamp-2 mb-1 group-hover:text-(--accent) transition-colors">
          {note.title}
        </h2>
        <p className="text-xs text-(--text-muted) mb-2">
          {new Date(note.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p className="text-sm text-(--text-secondary) line-clamp-3 leading-relaxed">
          {note.body}
        </p>
      </Link>

      <div className="flex gap-2 mt-4 pt-3 border-t border-(--border)">
        {note.archived ? (
          <button
            onClick={() => onUnarchive(note.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg bg-(--hover) text-(--text-muted) hover:text-(--text) transition"
          >
            <ArchiveRestore size={13} />
            {t.unarchive}
          </button>
        ) : (
          <button
            onClick={() => onArchive(note.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg bg-(--hover) text-(--text-muted) hover:text-(--text) transition"
          >
            <ArchiveX size={13} />
            {t.archiveBtn}
          </button>
        )}
        <button
          onClick={() => onDelete(note.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg bg-(--danger) text-gray-100 hover:bg-(--danger-hover) transition"
        >
          <Trash2 size={13} />
          {t.delete}
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
