import { useSearchParams } from 'react-router-dom'
import './App.css'
import SearchBar from './components/Header/SearchBar'
import FiltersContainer from './components/Filters/FiltersContainer'
import DoctorList from './components/DoctorList/DoctorList'
import { useDoctors } from './hooks/useDoctors'
import { useAutocomplete } from './hooks/useAutocomplete'

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get doctors data and filtering functionality
  const {
    doctors,
    filteredDoctors,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    consultationType,
    setConsultationType,
    selectedSpecialties,
    setSelectedSpecialties,
    sortBy,
    setSortBy,
    specialties,
    clearAllFilters
  } = useDoctors(searchParams, setSearchParams);
  
  // Get autocomplete functionality
  const {
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleSearchChange,
    handleSuggestionClick,
    handleKeyDown
  } = useAutocomplete(doctors, searchQuery, setSearchQuery);
  
  // Handle filter changes
  const handleConsultationChange = (type) => {
    setConsultationType(consultationType === type ? '' : type);
  };

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleSortChange = (sort) => {
    setSortBy(sortBy === sort ? '' : sort);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header with search bar */}
      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleKeyDown={handleKeyDown}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
      />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Panel */}
          <FiltersContainer
            sortBy={sortBy}
            handleSortChange={handleSortChange}
            consultationType={consultationType}
            handleConsultationChange={handleConsultationChange}
            setConsultationType={setConsultationType}
            specialties={specialties}
            selectedSpecialties={selectedSpecialties}
            handleSpecialtyChange={handleSpecialtyChange}
            clearAllFilters={clearAllFilters}
          />

          {/* Doctor Listing */}
          <DoctorList filteredDoctors={filteredDoctors} />
        </div>
      </div>
    </div>
  )
}

export default App
