import React from 'react';

const BackendStatus = ({ deployed }) => {
  if (!deployed) {
    return (
      <div className="error-message">
        Backend is not deployed at https://backend.bookvault.manish.kr
      </div>
    );
  }
  return null; // Render nothing if backend is deployed
};

export default BackendStatus;
