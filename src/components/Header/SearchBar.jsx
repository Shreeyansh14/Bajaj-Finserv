import React from 'react';

function SearchBar({ 
  searchQuery, 
  handleSearchChange, 
  handleKeyDown, 
  showSuggestions,
  setShowSuggestions, 
  suggestions, 
  handleSuggestionClick 
}) {
  return (
    <header style={{ backgroundColor: '#3D90D7' }} className="py-3">
      <div className="max-w-7xl mx-auto relative px-4">
        {/* Changed max-w-xl to w-3/4 to make the search bar more elongated */}
        <div className="relative w-full w-3/4 mx-auto">
          <input
            type="text"
            data-testid="autocomplete-input"
            placeholder="Search Symptoms, Doctors, Specialists, Clinics"
            className="w-full py-2 px-4 pr-12 rounded-md text-sm bg-white border-0 shadow"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onClick={() => setShowSuggestions(true)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button className="text-gray-400 hover:text-gray-600 p-1 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Autocomplete suggestions - updating this to match the new width */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 bg-white w-3/4 mt-1 rounded-md shadow-lg mx-auto left-0 right-0">
            {suggestions.map((doctor) => (
              <div
                key={doctor.id}
                data-testid="suggestion-item"
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(doctor.name)}
              >
                {doctor.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default SearchBar;