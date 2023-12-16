import React, { useState } from 'react';
import './style.css'; // Include your CSS file for styling
import { Carousel } from 'react-bootstrap';

const Carousel1 = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-container">
      
      <div style={{display:"flex",justifyContent:"center"}}>
      <Carousel >
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img className=" w-40" src={image} alt={`Slide ${index + 1}`} />
        </Carousel.Item>
      ))}
    </Carousel>
      </div>
    </div>
  );
};

export default Carousel1;
