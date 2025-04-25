import React from 'react';
import SortFilter from './SortFilter';
import ConsultationFilter from './ConsultationFilter';
import SpecialityFilter from './SpecialityFilter';

function FiltersContainer({ 
  sortBy, 
  handleSortChange, 
  consultationType, 
  handleConsultationChange, 
  setConsultationType,
  specialties,
  selectedSpecialties,
  handleSpecialtyChange,
  clearAllFilters
}) {
  return (
    <div className="w-full md:w-1/4">
      <div className="bg-white rounded-md shadow-md p-4 mb-4">
        {/* Sort By Filter */}
        <SortFilter 
          sortBy={sortBy} 
          handleSortChange={handleSortChange} 
        />

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600 font-medium">Filters</h3>
            <button 
              className="text-blue-600 text-sm font-medium"
              onClick={clearAllFilters}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Specialties Filter */}
        <SpecialityFilter 
          specialties={specialties}
          selectedSpecialties={selectedSpecialties}
          handleSpecialtyChange={handleSpecialtyChange}
        />

        {/* Consultation Type Filter */}
        <ConsultationFilter 
          consultationType={consultationType}
          handleConsultationChange={handleConsultationChange}
          setConsultationType={setConsultationType}
        />
      </div>
    </div>
  );
}

export default FiltersContainer;