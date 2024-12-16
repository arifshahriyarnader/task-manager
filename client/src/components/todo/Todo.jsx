import React, { useState } from 'react'
import TodoCard from './TodoCard';


const Todo = () => {
  const [newTodoTitle, setNewTodoTitle] =useState('');
  const [newTodoDescription, setNewTodoDescription] =useState('');
  const [todoLists,setTodoLists] =useState([]);

  const handleTitleChange=(e)=> setNewTodoTitle(e.target.value)

  const handleDescriptionnChange=(e) => setNewTodoDescription(e.target.value)
  
  const handleClick=() =>{
    if(!newTodoTitle || !newTodoDescription){
      return;
    }
    const newTodo={title:newTodoTitle, description:newTodoDescription};
      setTodoLists([...todoLists,newTodo])

      //clear the input fields
      setNewTodoTitle('');
      setNewTodoDescription('');
  }
  return (
    <div className='min-h-screen bg-gray-100'>
    <div className="flex items-center justify-center">
    <form
      className="w-full max-w-md bg-white p-8 mt-20 shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Add Todo</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
        value={newTodoTitle}
        onChange={handleTitleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter a title"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={newTodoDescription}
          onChange={handleDescriptionnChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter a description"
          rows="4"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        onClick={handleClick}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md font-bold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Add Todo
      </button>
    </form>
  </div>
  <div className='w-full px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
    {todoLists.map((todo,index) =>(
        <TodoCard key={index} title={todo.title} description={todo.description} />
    ))}
 </div>
 </div>
  
  )
}

export default Todo
