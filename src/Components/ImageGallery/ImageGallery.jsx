

// export default ImageGallery;
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    console.log(id);
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

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  };

  return (
    <div className="container mx-auto mt-4 p-4 bg-white">
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

      <hr className="mb-3 mt-4" />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-gallery" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-5 gap-4 relative"
            >
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        gridRow: index === 0 ? "span 2" : "auto",
                        gridColumn: index === 0 ? "span 2" : "auto",
                      }}
                      className={`border rounded-lg transition-all duration-300 hover:opacity-50 ${
                        index === 0 ? "col-span-2 row-span-2" : ""
                      } `}
                    >
                      <input
                        className="absolute mx-3 my-3 cursor-pointer"
                        type="checkbox"
                        checked={selectedImages.includes(image.id)}
                        onChange={() => handleImageSelect(image.id)}
                      />
                      <img
                        src={image.data}
                        alt={`Image ${image.id}`}
                        className="border  rounded-md"
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default ImageGallery;
