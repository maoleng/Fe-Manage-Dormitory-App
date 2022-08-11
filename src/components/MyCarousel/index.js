import React from 'react';
import { Carousel } from 'react-bootstrap';

const imgs = [
  '/imgs/site/ktx-1.png',
  '/imgs/site/ktx-2.png',
  '/imgs/site/ktx-3.png'
]

function MyCarousel() {
  // console.log('Component: MyCarousel');

  return (
    <Carousel>
      {imgs.map((href, index) => (
        <Carousel.Item interval={1000} key={index}>
          <img 
            style={{ 
              width: '100%', 
              height: '50vw', 
              display: 'block',
              objectFit: 'contain',
              objectPosition: 'center'
            }} 
            src={href} 
            alt={`slide ${index}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MyCarousel;