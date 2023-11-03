import React from "react";
import { BiSolidCheckSquare } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { GrGallery } from "react-icons/gr";

const Header = ({ length, handleDeleteSelected }) => {
  return (
    <div className="flex justify-between font-bold  text-sm md:text-xl">
      <div>
        {length <= 0 ? (
          <h1 className=" flex justify-center items-center gap-1">
            <GrGallery style={{ color: "red" }} /> Gallery
          </h1>
        ) : (
          <h4 className=" flex items-center gap-1 ">
            <BiSolidCheckSquare style={{ color: "blue" }} /> {length} Files
            Selected
          </h4>
        )}
      </div>
      {length > 0 && (
        <h4
          onClick={handleDeleteSelected}
          className="text-red-600 font-bold cursor-pointer  hover:text-red-400 flex justify-center items-center gap-1"
        >
          <TiDeleteOutline style={{ color: "red" }} /> Delete files
        </h4>
      )}
    </div>
  );
};

export default Header;
