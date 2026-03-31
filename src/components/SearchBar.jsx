import React from "react";
import { Search } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const SearchBar = ({ keyword, onChange }) => {
  const { t } = useLanguage();
  return (
    <div className="relative mb-6">
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-muted)"
      />
      <input
        type="text"
        placeholder={t.search}
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-(--surface) border border-(--border) rounded-xl text-(--text) placeholder-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent) focus:border-transparent transition text-sm"
      />
    </div>
  );
};

export default SearchBar;
