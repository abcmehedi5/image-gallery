import React from "react";
import { BiSolidCheckSquare } from "react-icons/bi";

const Header = ({ length, handleDeleteSelected }) => {
  return (
    <div className="flex justify-between font-bold text-xl">
      <div>
        {length <= 0 ? (
          <h1>Gallery</h1>
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
          className="text-red-600 font-bold cursor-pointer  hover:text-red-400"
        >
          Delete files
        </h4>
      )}
    </div>
  );
};

export default Header;
