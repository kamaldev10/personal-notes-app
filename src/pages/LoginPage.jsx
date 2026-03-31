import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/network-data";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useInput } from "../hooks/useInput";
import { NotebookPen, Sun, Moon, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const { onLoginSuccess } = useAuth();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError(t.fillAll);
      return;
    }
    setLoading(true);
    setError("");
    const { error: err, data, message } = await login({ email, password });
    if (err) {
      setError(message || "Login gagal");
      setLoading(false);
      return;
    }
    await onLoginSuccess(data.accessToken);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) px-4">
      {/* Top-right controls */}
      <div className="fixed top-4 right-4 flex gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-(--border) text-(--text-muted) hover:bg-(--hover) transition"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-(--accent) text-white mb-4">
            <NotebookPen size={22} />
          </div>
          <h1 className="text-2xl font-bold text-(--text)">{t.loginTitle}</h1>
          <p className="text-sm text-(--text-muted) mt-1">{t.loginSubtitle}</p>
        </div>

        {/* Card */}
        <div className="bg-(--surface) border border-(--border) rounded-2xl p-6 shadow-sm">
          {error && (
            <div className="mb-4 px-3 py-2 bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 rounded-lg text-rose-600 dark:text-rose-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={onEmailChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-3 py-2.5 bg-(--bg) border border-(--border) rounded-lg text-sm text-(--text) placeholder-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent) transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                {t.password}
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={onPasswordChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full px-3 py-2.5 pr-10 bg-(--bg) border border-(--border) rounded-lg text-sm text-(--text) placeholder-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)sition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text)"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-(--accent) text-white rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t.loading}
                </>
              ) : (
                t.login
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-(--text-muted) mt-4">
          {t.noAccount}{" "}
          <Link
            to="/register"
            className="text-(--accent) font-medium hover:underline"
          >
            {t.register}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
