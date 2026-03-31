import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../api/network-data";
import { ArrowLeft, Trash2, ArchiveX, ArchiveRestore } from "lucide-react";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLanguage } from "../contexts/LanguageContext";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    getNote(id).then(({ error, data }) => {
      if (error || !data) navigate("/not-found");
      else setNote(data);
      setLoading(false);
    });
  }, [id]);

  const handleDelete = async () => {
    setActionLoading(true);
    await deleteNote(id);
    navigate("/");
  };

  const handleArchiveToggle = async () => {
    setActionLoading(true);
    if (note.archived) {
      await unarchiveNote(id);
      navigate("/archive");
    } else {
      await archiveNote(id);
      navigate("/");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-(--bg)">
        <Navbar />
        <LoadingSpinner />
      </div>
    );

  if (!note) return null;

  return (
    <div className="min-h-screen bg-(--bg)">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Back + Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to={note.archived ? "/archive" : "/"}
            className="flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text) transition"
          >
            <ArrowLeft size={16} />
            {t.back}
          </Link>

          <div className="flex gap-2">
            <button
              onClick={handleArchiveToggle}
              disabled={actionLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-(--hover) text-(--text-muted) hover:text-(--text) disabled:opacity-50 transition"
            >
              {note.archived ? (
                <ArchiveRestore size={15} />
              ) : (
                <ArchiveX size={15} />
              )}
              {note.archived ? t.unarchive : t.archiveBtn}
            </button>
            <button
              onClick={handleDelete}
              disabled={actionLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 disabled:opacity-50 transition"
            >
              <Trash2 size={15} />
              {t.delete}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-(--surface) border border-(--border) rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-(--text) leading-tight">
            {note.title}
          </h1>
          <p className="text-xs text-(--text-muted) mt-2 mb-6">
            {t.createdAt} ·{" "}
            {new Date(note.createdAt).toLocaleString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <div className="border-t border-(--border) pt-6">
            <p className="text-(--text-secondary) leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {note.body}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NoteDetailPage;
