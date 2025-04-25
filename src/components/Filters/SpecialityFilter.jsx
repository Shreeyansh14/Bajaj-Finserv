import React, { useState } from 'react';

function SpecialityFilter({ specialties, selectedSpecialties, handleSpecialtyChange }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="mb-6">
      <h3 
        data-testid="filter-header-speciality"
        className="text-gray-600 font-medium border-b pb-2 mb-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Specialities
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </h3>
      {isExpanded && (
        <div className="max-h-72 overflow-y-auto space-y-2">
          <div className="mb-2">
            <input
              type="text"
              className="w-full p-1 border border-gray-300 rounded text-sm"
              placeholder="Search speciality"
            />
          </div>
          {specialties.map((specialty) => (
            <label key={specialty} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty}`}
                className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
              />
              <span className="text-sm text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default SpecialityFilter;