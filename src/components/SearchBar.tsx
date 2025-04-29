import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // debounce 300ms

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('Text');
    setQuery(pastedText);
    setDebouncedQuery(pastedText); // << แทรกตรงนี้ ยิงเลยทันที
    e.preventDefault(); // ป้องกัน paste ซ้ำ
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          style={{ color: 'black' }}
          type="text"
          value={query}
          onChange={handleChange}
          onPaste={handlePaste}
          placeholder="พิมพ์คำค้นหา หรือข้อความในข้อสอบที่ต้องการค้นหา..."
          className="w-full px-4 py-3 pl-12 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-gray-400" />
        </div>
      </div>

      {query && (
        <div className="absolute right-4 top-3 text-sm text-gray-400">
          กำลังค้นหา...
        </div>
      )}
    </div>
  );
};

export default SearchBar;
