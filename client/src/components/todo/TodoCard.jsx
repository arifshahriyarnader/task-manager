import React from 'react'

const TodoCard = ({title,description}) => {
  return (
    <div className='my-8 bg-white shadow-md rounded-md border border-orange-300 p-4 text-center'>
     <h3 className='text-lg'>{title}</h3>
     <p className='text-lg break-words'>{description}</p>
    </div>
  )
}

export default TodoCard
