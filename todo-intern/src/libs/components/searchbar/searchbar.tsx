import React from "react";

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const Searchbar: React.FC<SearchBarProps> = ({
  searchText = "",
  setSearchText,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchText) {
      setSearchText(event.target.value);
    }
  };

  return (
    <div className="flex items-center border rounded-lg p-2 bg-white shadow-md">
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search here..."
        className="w-full px-2 py-1 outline-none text-gray-700"
      />
    </div>
  );
};

export default Searchbar;
