// import React from 'react';
import PropTypes from 'prop-types';

function Card({ children, className }) {
  return (
    <div 
      className={className} 
      style={{
        width: "60%", 
        textAlign: "center", 
        border: "1px solid lightgray", 
        display: "block", 
        padding: "10px", 
        borderRadius: "10px", 
        marginLeft: "auto", 
        marginRight: "auto"
      }}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Card;
