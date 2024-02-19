// Bottom.jsx

import React from 'react';
import './bottom.css'; // Create a CSS file for styling

const Bottom = () => {
  const imageUrl = 'https://example.com/path/to/your/image.jpg'; // Replace with the actual URL of your image

  return (
    <div className="bottom-container">
      <img className="responsive-image" src={imageUrl} alt="Responsive" />
    </div>
  );
};

export default Bottom;
