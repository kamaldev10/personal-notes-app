import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-(--bg) px-4">
      <div className="text-center max-w-sm">
        <h1 className="text-6xl font-extrabold text-(--accent)">404</h1>
        <h2 className="text-lg font-semibold text-(--text) mb-2">
          Halaman tidak ditemukan
        </h2>
        <p className="text-sm text-(--text-muted) mb-6">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan ke planet
          lain.
        </p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 bg-(--accent) text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
