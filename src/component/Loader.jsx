// Loader.js
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <Spinner animation="border" variant="light" className="loader-spinner" />
    </div>
  );
};

export default Loader;
