import React, { useState } from 'react';

const SelectableImage = ({ src, alt, selected, multiSelect, onChange }) => {
  const handleClick = () => {
    if (!multiSelect) {
      onChange();
    }
  };

  const handleCheckboxChange = () => {
    onChange();
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      {multiSelect && (
        <input
          type="checkbox"
          checked={selected}
          onChange={handleCheckboxChange}
          style={{ marginRight: '5px' }}
        />
      )}
      <img src={src} alt={alt} style={{ width: '100px', height: '100px', border: selected ? '2px solid blue' : '2px solid transparent' }} />
    </div>
  );
};

const ImageSelector = ({ images, multiSelect }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (index) => {
    if (!multiSelect) {
      setSelectedImages([index]);
    } else {
      if (selectedImages.includes(index)) {
        setSelectedImages(selectedImages.filter((item) => item !== index));
      } else {
        setSelectedImages([...selectedImages, index]);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {images.map((image, index) => (
        <SelectableImage
          key={index}
          src={image.src}
          alt={image.alt}
          selected={selectedImages.includes(index)}
          multiSelect={multiSelect}
          onChange={() => handleImageChange(index)}
        />
      ))}
    </div>
  );
};

const App = () => {
  // Sample images data
  const images = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt-3unKWOabmDo9lBLGNVeYrjGyi6XAl2AgAJRf15K2Q&s', alt: 'Image 1' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_fAmygs21xSgi-B1_wK7fI7Ad6EgWznM3s95GKh8BTw&s', alt: 'Image 2' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRahXBtYaNxkjwcD5oyorQ9a_j6OOcaMYhFkEL8GgfNHg&s', alt: 'Image 3' },
  ];

  return (
    <div>
      <h2>Single Select</h2>
      <ImageSelector images={images} multiSelect={false} />
      <h2>Multi Select</h2>
      <ImageSelector images={images} multiSelect={true} />
    </div>
  );
};

export default App;
