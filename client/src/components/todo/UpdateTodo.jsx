import { ToastContainer } from "react-toastify";
import { useUpdateTodo } from "../../hooks";
import { useLocation } from "react-router-dom";

const UpdateTodo = () => {
  const location = useLocation();
  const { todo } = location.state || {};
  const {
    updatedTitle,
    updatedDescription,
    handleUpdateTitleChange,
    handleUpdateDescriptionChange,
    handleUpdate,
    handleCancel,
  } = useUpdateTodo(todo);

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
            value={updatedDescription}
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
