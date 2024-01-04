import React from 'react';
import PropTypes from 'prop-types';
import {Heart,MapPinLine,Phone,DotsThreeOutlineVertical} from "@phosphor-icons/react";


const Card = ({ title, content, imageUrl }) => {
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{content}</p>
        <Heart color="#AE2983" weight="fill" size={32} />
        <MapPinLine size={32} />
        <Phone size={32} />
        <DotsThreeOutlineVertical size={32} />
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

export default Card;