import React from "react";

const SearchBar = ({ keyword, onChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Cari catatan..."
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
      />
    </div>
  );
};

export default SearchBar;
