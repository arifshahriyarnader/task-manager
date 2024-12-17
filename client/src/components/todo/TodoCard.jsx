import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const TodoCard = ({ title, description, onDelete }) => {
  return (
    <div className="my-8 bg-white shadow-md rounded-md border border-orange-300 p-4 text-center">
      <h3 className="text-lg">{title}</h3>
      <p className="text-lg break-words">{description}</p>
      <div className="flex flex-row justify-between cursor-pointer">
        <div className="text-orange-600">
          <MdEdit />
        </div>
        <div className="text-orange-600" onClick={onDelete}>
          <FaTrashAlt />
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
