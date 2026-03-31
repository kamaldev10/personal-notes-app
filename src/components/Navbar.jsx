import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  NotebookPen,
  LogOut,
  Archive,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage, t } = useLanguage();
  const { authedUser, onLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 border-b border-(--border) bg-(--surface) backdrop-blur-sm shadow-(--shadow) drop-shadow-sm">
      <div className="mx-auto px-4 sm:px-20 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-(--text) text-lg tracking-tight"
          >
            <NotebookPen size={20} className="text-(--accent)" />

            <span>{t.appName}</span>
          </Link>

          <Link
            to="/notes/add"
            className="ml-2 p-1 rounded-lg justify-center items-center gap-1 border-2 border-(--accent) hover:ring ring-(--accent) transition"
          >
            <Plus size={16} />
          </Link>
        </div>

        {/* Nav links */}
        {authedUser && (
          <nav className="hidden sm:flex items-center gap-3">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                isActive("/")
                  ? "bg-(--accent) text-white"
                  : "text-(--text-muted) hover:text-(--text) hover:bg-(--hover)"
              }`}
            >
              {t.home}
            </Link>
            <Link
              to="/archive"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                isActive("/archive")
                  ? "bg-(--accent) text-white"
                  : "text-(--text-muted) hover:text-(--text) hover:bg-(--hover)"
              }`}
            >
              <Archive size={14} />
              {t.archive}
            </Link>
          </nav>
        )}

        {isOpen && authedUser && (
          <div className="absolute top-full right-0 w-full bg-(--surface) border-t border-(--border) flex flex-col items-start p-4 gap-2 sm:hidden">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm ${
                isActive("/")
                  ? "bg-(--accent) text-white"
                  : "text-(--text-muted)"
              }`}
            >
              {t.home}
            </Link>

            <Link
              to="/archive"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                isActive("/archive")
                  ? "bg-(--accent) text-white"
                  : "text-(--text-muted)"
              }`}
            >
              <Archive size={14} />
              {t.archive}
            </Link>
          </div>
        )}

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-(--border) text-(--text-muted) hover:text-(--text) hover:bg-(--hover) transition"
            title="Toggle Language"
          >
            {t.langToggle}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-(--text-muted) hover:text-(--text) hover:bg-(--hover) transition"
            title={theme === "dark" ? t.lightMode : t.darkMode}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-(--hover)"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* User info + logout */}
          {authedUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-(--border)">
              <span className="hidden sm:block text-sm text-(--text-muted) truncate max-w-40">
                {authedUser.name}
              </span>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg text-(--text-muted) hover:text-rose-500 hover:bg-(--hover) transition"
                title={t.logout}
              >
                <LogOut size={17} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
