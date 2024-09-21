import React, { useState, useEffect } from 'react';

import '../css/Gallary.css';

const Gallery = () => {
    const [galleryData, setGalleryData] = useState([]);
    const [heading, setHeading] = useState("");

    useEffect(() => {
        // Fetch the gallery data from the API
        fetch('http://buyindiahomes.in/api/gallary?website=buyindiahomes.in')
            .then(response => response.json())
            .then(data => {
                setGalleryData(data.property_photos); // Set property photos
                setHeading(data.page[0]?.heading || 'Gallery'); // Set the heading if available
            })
            .catch(error => console.error('Error fetching gallery data:', error));
    }, []);

    return (
        <div className="gallery-container">
            <h2>{heading}</h2>
            <div className="gallery-grid">
                {galleryData.length > 0 ? (
                    galleryData.map(photo => (
                        <div key={photo.id} className="gallery-item">
                            <img src={photo.photo} alt={`Property ${photo.property_id}`} />
                        </div>
                    ))
                ) : (
                    <p>Loading photos...</p>
                    
                )}
            </div>
        </div>
    );
};

export default Gallery;
