import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoCard from "./TodoCard";
import { useTodo } from "../../hooks";

const Todo = () => {
  const { todo, todoLists, handleChange, handleSubmit, handleUpdate, handleDelete } =
    useTodo();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center">
        <form
          className="w-full max-w-md bg-white p-8 mt-20 shadow-md rounded-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-6">Add Todo</h2>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={todo.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter a title"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={todo.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter a description"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md font-bold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Add Todo
          </button>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
      <div className="w-full px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todoLists.map((todo, index) => (
          <TodoCard
            key={todo._id}
            title={todo.title}
            description={todo.description}
            onUpdate={() => handleUpdate(todo)}
            onDelete={() => handleDelete(todo._id, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
