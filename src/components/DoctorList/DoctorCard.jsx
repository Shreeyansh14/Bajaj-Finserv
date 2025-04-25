import React from 'react';

function DoctorCard({ doctor }) {
  // Format experience to display correctly
  const experienceDisplay = typeof doctor.experience === 'number' 
    ? `${doctor.experience} yrs exp.` 
    : doctor.experience;

  // Format fee to display correctly with rupee symbol
  const feeDisplay = typeof doctor.fees === 'number'
    ? `₹ ${doctor.fees}`
    : doctor.fees;
    
  return (
    <div 
      data-testid="doctor-card"
      className="bg-white rounded-md shadow-sm p-4 mb-4"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-shrink-0">
          <img 
            src={doctor.image || "doctor image"} 
            alt={doctor.name} 
            className="w-16 h-16 rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "doctor image";
            }}
          />
        </div>
        <div className="flex-grow">
          <h2 
            data-testid="doctor-name"
            className="text-lg font-medium"
          >
            {doctor.name}
          </h2>
          <p 
            data-testid="doctor-specialty"
            className="text-gray-600 text-sm"
          >
            {doctor.specialties && doctor.specialties.length ? doctor.specialties.join(', ') : 'General Physician'}
          </p>
          <p className="text-xs text-gray-500 mb-1">MBBS{doctor.qualification ? ', ' + doctor.qualification : ''}</p>
          <p 
            data-testid="doctor-experience"
            className="text-sm text-gray-500"
          >
            {experienceDisplay}
          </p>
          {doctor.hospitalName && (
            <div className="mt-3 flex items-center text-sm">
              <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              {doctor.hospitalName}
            </div>
          )}
          {doctor.location && (
            <div className="flex items-center text-sm">
              <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {doctor.location}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end justify-between">
          <p 
            data-testid="doctor-fee"
            className="font-medium text-right"
          >
            {feeDisplay}
          </p>
          <button 
            style={{ color: '#3D90D7', borderColor: '#3D90D7' }}
            className="mt-2 px-6 py-2 bg-white border rounded-md hover:bg-blue-50 transition font-medium text-sm"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;