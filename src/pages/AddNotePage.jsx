import React, { useState } from "react";
import { addNote } from "../api/network-data";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../contexts/LanguageContext";
import { useInput } from "../hooks/useInput";

const AddNotePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [title, onTitleChange] = useInput("");
  const [body, onBodyChange] = useInput("");
  const [loading, setLoading] = useState(false);
  const maxTitle = 50;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setLoading(true);
    const { error } = await addNote({ title, body });
    if (!error) navigate("/");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-(--bg)">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/"
            className="p-2 rounded-lg text-(--text-muted) hover:bg-(--hover) hover:text-(--text) transition"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-xl font-bold text-(--text)">{t.addNote}</h1>
        </div>

        <div className="bg-(--surface) border border-(--border) rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                placeholder={t.titlePlaceholder}
                value={title}
                onChange={(e) =>
                  onTitleChange(e.target.value.slice(0, maxTitle))
                }
                className="w-full px-4 py-3 bg-(--bg) border border-(--border) rounded-xl text-(--text) placeholder-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent) transition text-base font-medium"
                autoFocus
              />
              <p className="text-xs text-(--text-muted) mt-1 text-right">
                {title.length}/{maxTitle}
              </p>
            </div>

            <textarea
              placeholder={t.bodyPlaceholder}
              value={body}
              onChange={onBodyChange}
              rows={8}
              className="w-full px-4 py-3 bg-(--bg) border border-(--border) rounded-xl text-(--text) placeholder-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent) transition resize-none text-sm leading-relaxed"
            />

            <button
              type="submit"
              disabled={!title.trim() || !body.trim() || loading}
              className="flex items-center justify-center gap-2 py-3 bg-(--accent) text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-40 transition"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {t.save}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddNotePage;
