import React, { useState } from "react";
import { addNote } from "../utils/local-data";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeftCircle, Save } from "lucide-react";

const AddNotePage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const maxTitle = 50;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!body.trim()) {
      alert("Isi catatan tidak boleh kosong!");
      return;
    }

    addNote({ title, body });

    // redirect ke home setelah tambah
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="flex items-center text-2xl font-bold">
            Tambah Catatan
          </h1>
          <Link
            to="/"
            className="flex text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftCircle className="inline-block mr-1" />
            <span>Kembali</span>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Judul catatan..."
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, maxTitle))}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              autoFocus
            />
            <p className="text-sm text-gray-400 mt-1 text-right">
              {title.length}/{maxTitle}
            </p>
          </div>

          {/* Body */}
          <textarea
            placeholder="Tulis catatanmu di sini..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />

          {/* Button */}
          <button
            type="submit"
            className="flex gap-3 justify-center items-center bg-gray-900 hover:bg-black text-white py-3 rounded-lg font-medium transition"
            disabled={!body.trim()}
          >
            <Save />
            <span> Simpan Catatan</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotePage;
