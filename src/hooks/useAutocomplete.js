import { useState, useEffect } from 'react';

export function useAutocomplete(doctors, searchQuery, setSearchQuery) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Generate search suggestions
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const matchedDoctors = doctors
      .filter(doctor => doctor.name && doctor.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 3);
      
    setSuggestions(matchedDoctors);
  }, [searchQuery, doctors]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (name) => {
    setSearchQuery(name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
    }
  };

  return {
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleSearchChange,
    handleSuggestionClick,
    handleKeyDown
  };
}