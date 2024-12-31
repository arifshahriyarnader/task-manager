import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import { useNavigate } from "react-router-dom";
import { createTask, deleteTask, getUserTasks } from "../../services/todoServices";

const Todo = () => {
  const [todo, setTodo] = useState({ title: "", description: "" });
  const [todoLists, setTodoLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getUserTasks();
  
        if (response.data.length === 0) {
          setTodoLists([]);
          localStorage.setItem("tasks", JSON.stringify([]));
          return;
        }
  
        // Update state and local storage with fetched todos
        setTodoLists(response.data);
        localStorage.setItem("tasks", JSON.stringify(response.data));
      } catch (error) {
        console.error("Failed to fetch todos", error);
  
        // Show alert only for real errors
        if (error.response?.status && error.response.status !== 404) {
          toast.error("Failed to fetch todos. Please try again later.");
        }
      }
    };
  
   
    fetchTasks();
  }, []);
  

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //avoid adding empty todos
    if (!todo.title || !todo.description) {
      return;
    }
    try {
      const response = await createTask(todo);
      const newData = response.data;

      //Add new todo
      const updatedTodoLists = [...todoLists, newData];
      setTodoLists(updatedTodoLists);

      //save updated task to local stroage
      localStorage.setItem("tasks", JSON.stringify(updatedTodoLists));

      //clear the input fields
      setTodo({ title: "", description: "" });
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to creating task. please try again");
    }
  };

  const handleUpdate = (todo) => {
    navigate("/update", { state: { todo } });
  };

  const handleDelete = async (taskId, index) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
    if(isConfirmed){
    try {
      //delete todo from the server
      await deleteTask(taskId);

      //remove the todo from the local state
      const updatedTodos = [...todoLists];
      updatedTodos.splice(index, 1);
      setTodoLists(updatedTodos);

      //update localstorage
      localStorage.setItem("tasks", JSON.stringify(updatedTodos));
      toast.success("Task deleted successfully")
    } catch (error) {
      console.error("Failed to delete task", error);
      toast.error("Failed to delete task. please try agin");
    }
  }
  };

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
