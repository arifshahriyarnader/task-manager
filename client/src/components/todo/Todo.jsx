import React from 'react'

const Todo = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      className="w-full max-w-md bg-white p-8 shadow-md rounded-md"
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
  </div>
  )
}

export default Todo
