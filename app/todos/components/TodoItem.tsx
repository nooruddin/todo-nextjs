import { useState, memo } from 'react' // Import memo
import { Todo } from '../page'

function TodoItem({
  todo,
  onSave,
  onDelete,
}: {
  todo: Todo
  onSave: (todo: Todo) => void
  onDelete: (todoId: number) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [todoTitle, setTodoTitle] = useState(todo.title)
  const [originalTodoTitle, setOriginalTodoTitle] = useState(todo.title)

  const handleSave = () => {
    onSave({ ...todo, title: todoTitle })
    setIsEditing(!isEditing)
  }

  const handleDelete = (todoId: number) => {
    onDelete(todoId)
  }

  const handleStatusChange = () => {
    onSave({ ...todo, completed: !todo.completed })
  }

  return (
    <div className="p-4 border rounded shadow-md">
      <div className="flex items-center justify-between">
        {!isEditing ? (
          <a
            href={`todos/${todo.id}`}
            className="text-blue-500 hover:underline"
          >
            {todo.title}
          </a>
        ) : (
          <input
            type="text"
            name="todoInput"
            id="todoInput"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            className="p-4 border rounded shadow-md text-gray-800 flex-auto m-4"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setTodoTitle(originalTodoTitle)
                setIsEditing(false)
              }
            }}
          />
        )}
        <div>
          {isEditing ? (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded mr-2"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded mr-2"
              onClick={() => {
                setIsEditing(true)
                setOriginalTodoTitle(todo.title)
              }}
            >
              Edit
            </button>
          )}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-gray-600">
        Status: {todo.completed ? 'Completed' : 'Pending'}
      </p>
      <div>
        <label className="inline-flex items-center mt-3">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-gray-600"
            checked={todo.completed}
            onChange={handleStatusChange}
          />
          <span className="ml-2 text-gray-700">Completed</span>
        </label>
      </div>
    </div>
  )
}

export default memo(TodoItem) // Wrap the component with memo
