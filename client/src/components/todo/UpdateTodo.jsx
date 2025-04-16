import { ToastContainer, toast } from "react-toastify";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateTask } from "../../api/services";
const UpdateTodo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { todo } = location.state || {};

  const [updatedTitle, setUpdatedTitle] = useState(todo?.title || "");
  const [updtaedDescription, setUpdatedDescription] = useState(
    todo?.description || ""
  );

  const handleUpdateTitleChange = (e) => setUpdatedTitle(e.target.value);
  const handleUpdateDescriptionChange = (e) =>
    setUpdatedDescription(e.target.value);

  const handleUpdate = async () => {
    try {
      const updatedTodo = {
        title: updatedTitle,
        description: updtaedDescription,
      };
      await updateTask(todo._id, updatedTodo);
      toast.success("Task updated successfully");
      setTimeout(() => navigate("/todo"), 3000);
      // navigate("/todo");
    } catch (error) {
      console.error("Failed to update task", error);
      toast.error("Failed to updated task");
    }
  };
  const handleCancel = () => {
    navigate("/todo");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Todo</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={updatedTitle}
            onChange={handleUpdateTitleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            value={updtaedDescription}
            onChange={handleUpdateDescriptionChange}
            className="w-full px-4 py-2 border rounded-md"
            rows="4"
          ></textarea>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleUpdate}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
          >
            Update
          </button>
          <button
            onClick={handleCancel}
            className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default UpdateTodo;
