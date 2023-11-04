import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsCardImage } from "react-icons/bs";
const GalleryItem = ({
  image,
  index,
  images,
  selectedImages,
  hoveredImageIndex,
  handleFileChange,
  setHoveredImageIndex,
  handleImageSelect,
}) => {
  return (
    <>
      <Draggable key={image.id} draggableId={image.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
            }}
            onMouseEnter={() => setHoveredImageIndex(index)}
            onMouseLeave={() => setHoveredImageIndex(null)}
            className={`border rounded-lg transition-all duration-300 hover:opacity-50 ${
              index === 0 ? "md:col-span-2 md:row-span-2" : ""
            } ${selectedImages.includes(image.id) && "opacity-40"} `}
          >
            {hoveredImageIndex === index && (
              <input
                className={`absolute mx-3 my-3 cursor-pointer w-6 h-6`}
                type="checkbox"
                checked={selectedImages.includes(image.id)}
                onChange={() => handleImageSelect(image.id)}
              />
            )}

            {selectedImages.includes(image.id) && (
              <>
                <input
                  className="absolute mx-3 my-3 cursor-pointer w-6 h-6  "
                  type="checkbox"
                  checked={selectedImages.includes(image.id)}
                  onChange={() => handleImageSelect(image.id)}
                />
              </>
            )}
            <img
              src={image.data}
              alt={`Image ${image.id}`}
              className={`rounded-md w-full  max-h-[225px]  ${
                index === 0 ? "max-h-[460px]" : ""
              }`}
            />
          </div>
        )}
      </Draggable>
      {/* Render the input field in the last element */}
      {index === images.length - 1 && (
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center text-center border rounded-md p-5 w-full h-auto md:w-[236px] md:h-[225px] cursor-pointer"
        >
          <div className="text-3xl mb-2">
            <BsCardImage />
          </div>
          <div>Add Images</div>
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </>
  );
};

export default GalleryItem;
