import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { API } from '../../../Config'; // Use your config.js structure
import '../css/LocationHighlights.css'; // Ensure the path is correct
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const LocationHighlights = () => {
  const [locationData, setLocationData] = useState([]);
//   const [heading, setHeading] = useState("");
//   const [subheading, setSubHeading] = useState("");

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(API.LOCATION_ADVANTAGES());
        const data = await response.json();
        setLocationData(data.location_advantages);
        // setHeading(data.page[0]?.heading || 'Location Advantages');
        // setSubHeading(data.page[0]?.subheading || '');
      } catch (error) {
        console.error('Error fetching location advantages data:', error);
      }
    };

    fetchLocationData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 items at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // for tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // for mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="location-highlights-container">
      {/* <h2>{heading}</h2>
      <h4>{subheading || 'Explore the nearby attractions'}</h4> */}

      {locationData.length > 0 ? (
        <Slider {...sliderSettings}>
          {locationData.map((item) => (
            <div key={item.id} className="location-highlight-item">
              <h3>{item.location}</h3>
              <p>{item.distance}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p>Loading location highlights...</p>
      )}
    </div>


  );
};

export default LocationHighlights;
