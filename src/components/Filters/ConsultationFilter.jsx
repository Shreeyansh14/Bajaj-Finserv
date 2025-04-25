import React, { useState } from 'react';

function ConsultationFilter({ consultationType, handleConsultationChange, setConsultationType }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="mb-6">
      <h3 
        data-testid="filter-header-moc"
        className="text-gray-600 font-medium border-b pb-2 mb-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Mode of consultation
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
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="filter-video-consult"
              className="form-radio h-4 w-4 text-blue-600 mr-2"
              checked={consultationType === 'video'}
              onChange={() => handleConsultationChange('video')}
            />
            <span className="text-sm text-gray-700">Video Consultation</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              className="form-radio h-4 w-4 text-blue-600 mr-2"
              checked={consultationType === 'clinic'}
              onChange={() => handleConsultationChange('clinic')}
            />
            <span className="text-sm text-gray-700">In-clinic Consultation</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-blue-600 mr-2"
              checked={consultationType === ''}
              onChange={() => setConsultationType('')}
            />
            <span className="text-sm text-gray-700">All</span>
          </label>
        </div>
      )}
    </div>
  );
}

export default ConsultationFilter;