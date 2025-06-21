import { useEffect, useState } from "react";
import {
  createTask,
  getUserTasks,
  deleteTask,
  generateTask,
} from "../api/services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useTodo() {
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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (isConfirmed) {
      try {
        //delete todo from the server
        await deleteTask(taskId);

        //remove the todo from the local state
        const updatedTodos = [...todoLists];
        updatedTodos.splice(index, 1);
        setTodoLists(updatedTodos);

        //update localstorage
        localStorage.setItem("tasks", JSON.stringify(updatedTodos));
        toast.success("Task deleted successfully");
      } catch (error) {
        console.error("Failed to delete task", error);
        toast.error("Failed to delete task. please try agin");
      }
    }
  };
  const handleGenerateAI = async () => {
    const prompt = `${todo.title} ${todo.description}`.trim();
    if (!prompt) {
      toast.warning("Please write something in title or description first.");
      return;
    }

    try {
      const { data } = await generateTask(prompt);

      if (data.response) {
        const lines = data.response.split("\n").filter(Boolean);
        const titleLine = lines.find((line) =>
          line.toLowerCase().startsWith("title:")
        );
        const descriptionLine = lines.find((line) =>
          line.toLowerCase().startsWith("description:")
        );

        setTodo({
          title: titleLine
            ? titleLine.replace(/title:/i, "").trim()
            : todo.title,
          description: descriptionLine
            ? descriptionLine.replace(/description:/i, "").trim()
            : todo.description,
        });

        toast.success("AI generated a task successfully!");
      } else {
        toast.error("AI did not return a proper response.");
      }
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error("Failed to generate task with AI.");
    }
  };
  return {
    todo,
    todoLists,
    handleChange,
    handleSubmit,
    handleUpdate,
    handleDelete,
    handleGenerateAI,
  };
}
