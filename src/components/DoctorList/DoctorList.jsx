import React from 'react';
import DoctorCard from './DoctorCard';

function DoctorList({ filteredDoctors }) {
  if (filteredDoctors.length === 0) {
    return (
      <div className="w-full md:w-3/4">
        <div className="bg-white rounded-md shadow-sm p-6 text-center">
          <p>No doctors found matching your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-3/4">
      <div className="space-y-4">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}

export default DoctorList;