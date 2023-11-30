import React from 'react';

const CustomButton = ({title, handleClick, customStyles}) => {

  return (
    <button 
        onClick={handleClick}
        className={`${customStyles}`}
    >
      <span>
      {title}
      </span>
    </button>
  )
}

export default CustomButton