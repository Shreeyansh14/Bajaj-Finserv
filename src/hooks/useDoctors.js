import { useState, useEffect } from 'react';

export function useDoctors(searchParams, setSearchParams) {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get filter states from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [consultationType, setConsultationType] = useState(searchParams.get('consultation') || '');
  const [selectedSpecialties, setSelectedSpecialties] = useState(
    searchParams.get('specialties') ? searchParams.get('specialties').split(',') : []
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '');
  
  // Array of all specialties for filtering
  const specialties = [
    'General Physician', 'Dentist', 'Dermatologist', 'Paediatrician', 
    'Gynaecologist', 'ENT', 'Diabetologist', 'Cardiologist', 
    'Physiotherapist', 'Endocrinologist', 'Orthopaedic', 'Ophthalmologist', 
    'Gastroenterologist', 'Pulmonologist', 'Psychiatrist', 'Urologist', 
    'Dietitian-Nutritionist', 'Psychologist', 'Sexologist', 
    'Nephrologist', 'Neurologist', 'Oncologist', 'Ayurveda', 'Homeopath'
  ];

  // Fetch doctors data from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Use the environment variable DEMO_API instead of hardcoded URL
        const apiUrl = import.meta.env.VITE_DEMO_API;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        // Process the data to normalize it
        const processedData = data.map(doctor => {
          // Extract specialty names from the array of objects
          const specialtiesList = doctor.specialities 
            ? doctor.specialities.map(s => s.name) 
            : [];
            
          // Extract experience number from string
          let experienceValue = 0;
          if (doctor.experience) {
            const expMatch = doctor.experience.match(/\d+/);
            if (expMatch) {
              experienceValue = parseInt(expMatch[0], 10);
            }
          }
          
          // Extract fees number from string
          let feesValue = 0;
          if (doctor.fees) {
            const feeMatch = doctor.fees.match(/\d+/);
            if (feeMatch) {
              feesValue = parseInt(feeMatch[0], 10);
            }
          }
          
          return {
            id: doctor.id,
            name: doctor.name,
            image: doctor.photo || '',
            specialties: specialtiesList,
            experience: experienceValue,
            experienceText: doctor.experience || '',
            fees: feesValue,
            feesText: doctor.fees || '',
            hospitalName: doctor.clinic ? doctor.clinic.name : '',
            location: doctor.clinic && doctor.clinic.address ? 
              `${doctor.clinic.address.locality || ''}, ${doctor.clinic.address.city || ''}` : '',
            consultationModes: [
              ...(doctor.video_consult ? ['Video Consult'] : []),
              ...(doctor.in_clinic ? ['In Clinic'] : [])
            ]
          };
        });
        
        setDoctors(processedData);
        setFilteredDoctors(processedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Update URL params whenever filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    if (consultationType) params.set('consultation', consultationType);
    if (selectedSpecialties.length > 0) params.set('specialties', selectedSpecialties.join(','));
    if (sortBy) params.set('sort', sortBy);
    
    setSearchParams(params);
  }, [searchQuery, consultationType, selectedSpecialties, sortBy, setSearchParams]);

  // Filter and sort doctors based on selected filters
  useEffect(() => {
    if (!doctors.length) return;

    let filtered = [...doctors];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(doctor => 
        doctor.name && doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by consultation type
    if (consultationType) {
      filtered = filtered.filter(doctor => {
        if (!doctor.consultationModes || doctor.consultationModes.length === 0) return false;
        if (consultationType === 'video') return doctor.consultationModes.includes('Video Consult');
        if (consultationType === 'clinic') return doctor.consultationModes.includes('In Clinic');
        return true;
      });
    }

    // Filter by specialties - a doctor passes if they have ANY of the selected specialties
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(doctor => {
        if (!doctor.specialties || doctor.specialties.length === 0) return false;
        
        // Check if any of doctor's specialties are in the selectedSpecialties array
        return doctor.specialties.some(specialty => 
          selectedSpecialties.includes(specialty)
        );
      });
    }

    // Sort the results
    if (sortBy) {
      if (sortBy === 'fees') {
        filtered.sort((a, b) => a.fees - b.fees);
      } else if (sortBy === 'experience') {
        filtered.sort((a, b) => b.experience - a.experience);
      }
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchQuery, consultationType, selectedSpecialties, sortBy]);
  
  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setConsultationType('');
    setSelectedSpecialties([]);
    setSortBy('');
  };

  return {
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
  };
}