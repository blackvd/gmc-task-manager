type SearchBarProps = {
  onSearch;
};

const SearchBar = ({
  onSearch
}: SearchBarProps) => {
  const handleKeyUp = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="w-full px-4 py-3">
      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-5 py-3 shadow-sm focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          onKeyUp={handleKeyUp}
          placeholder="Search tasks by title or description..."
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
