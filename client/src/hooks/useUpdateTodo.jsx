import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateTask } from "../api/services";
import { toast } from "react-toastify";

export function useUpdateTodo(todo) {
  const navigate = useNavigate();
  const [updatedTitle, setUpdatedTitle] = useState();
  const [updatedDescription, setUpdatedDescription] = useState();
  useEffect(() => {
    if (todo) {
      setUpdatedTitle(todo.title || "");
      setUpdatedDescription(todo.description || "");
    }
  }, [todo]);
  const handleUpdateTitleChange = (e) => setUpdatedTitle(e.target.value);
  const handleUpdateDescriptionChange = (e) =>
    setUpdatedDescription(e.target.value);

  const handleUpdate = async () => {
    try {
      const updatedTodo = {
        title: updatedTitle,
        description: updatedDescription,
      };
      await updateTask(todo._id, updatedTodo);
      toast.success("Task updated successfully");
      setTimeout(() => navigate("/todo"), 3000);
    } catch (error) {
      console.error("Failed to update task", error);
      toast.error("Failed to updated task");
    }
  };
  const handleCancel = () => {
    navigate("/todo");
  };
  return {
    updatedTitle,
    updatedDescription,
    handleUpdateTitleChange,
    handleUpdateDescriptionChange,
    handleUpdate,
    handleCancel,
  };
}
