import React from 'react';

function SortFilter({ sortBy, handleSortChange }) {
  return (
    <div className="mb-6">
      <h3 
        data-testid="filter-header-sort"
        className="text-gray-600 font-medium border-b pb-2 mb-3 flex justify-between items-center"
      >
        Sort by
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </h3>
      <div className="space-y-2">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            data-testid="sort-fees"
            className="form-radio h-4 w-4 text-blue-600 mr-2"
            checked={sortBy === 'fees'}
            onChange={() => handleSortChange('fees')}
          />
          <span className="text-sm text-gray-700">Price: Low-High</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            data-testid="sort-experience"
            className="form-radio h-4 w-4 text-blue-600 mr-2"
            checked={sortBy === 'experience'}
            onChange={() => handleSortChange('experience')}
          />
          <span className="text-sm text-gray-700">Experience: Most Experience first</span>
        </label>
      </div>
    </div>
  );
}

export default SortFilter;