import React from 'react';

const PasswordStrengthMeter = ({ label, color }) => {
  let widthPercentage;

  switch (label) {
    case 'Weak':
      widthPercentage = '25%';
      break;
    case 'Medium':
      widthPercentage = '60%';
      break;
    case 'Strong':
      widthPercentage = '100%';
      break;
    default:
      widthPercentage = '0%';
  }

  const progressStyle = {
    width: widthPercentage,
    background: color,
    height: '7px',
  };

  return (
    <>
      <div className="progress" style={{ height: '2px' }}>
        <div className="progress-bar" style={progressStyle}></div>
      </div>
      <p style={{ color }}>{label}</p>
    </>
  );
};

export default PasswordStrengthMeter;
