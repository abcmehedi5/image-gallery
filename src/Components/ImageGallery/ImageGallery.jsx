import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      const imageId = uuidv4(); // Generate a unique UUID as the key
      const imageData = reader.result;

      // Add the new image to the end of the images array
      setImages((prevImages) =>
        prevImages.concat({ id: imageId, data: imageData })
      );

      // Save the image data to localStorage with the UUID as the key
      localStorage.setItem(imageId, imageData);
    };
    reader.readAsDataURL(file);

    // Deselect all images when uploading a new one
    setSelectedImages([]);
  };

  useEffect(() => {
    // Load images from localStorage on component mount
    const storedImages = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const imageData = localStorage.getItem(key);

      if (key && imageData) {
        storedImages.push({ id: key, data: imageData });
      }
    }
    setImages(storedImages);
  }, []);

  const handleImageSelect = (id) => {
    const isSelected = selectedImages.includes(id);
    if (isSelected) {
      const updatedSelection = selectedImages.filter(
        (selected) => selected !== id
      );
      setSelectedImages(updatedSelection);
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const handleDeleteSelected = () => {
    // Remove selected images from localStorage
    selectedImages.forEach((id) => {
      localStorage.removeItem(id);
    });

    // Filter out the selected images from the images state
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {selectedImages.length > 0 && (
        <div>
          <button
            onClick={handleDeleteSelected}
            className="bg-slate-400 p-3 rounded-sm cursor-pointer"
          >
            Delete Selected
          </button>

          <h4>Selected image {selectedImages.length}</h4>
        </div>
      )}
      <div className="grid grid-cols-6 gap-4">
        {images.map((image) => (
          <div key={image.id}>
            <input
              type="checkbox"
              checked={selectedImages.includes(image.id)}
              onChange={() => handleImageSelect(image.id)}
            />
            <img
              src={image.data}
              alt={`Image ${image.id}`}
              className="w-[200px] h-[200px] border p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
