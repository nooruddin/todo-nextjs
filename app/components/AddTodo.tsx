import { FormEvent, useState, memo } from 'react' // Import memo
import { Todo } from '../todos/page'

interface AddTodoFormProps {
  addTodo: (todo: Todo) => void
}

function AddTodoForm({ addTodo }: AddTodoFormProps) {
  const [newTodoTitle, setNewTodoTitle] = useState('')
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    addTodo({
      userId: 1,
      completed: false,
      title: newTodoTitle,
      id: 201,
    })
    setNewTodoTitle('') // Clear the input
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4">
      <input
        type="text"
        name="newTodoText"
        id="newTodoText"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        placeholder="Add a new todo..."
        value={newTodoTitle}
        onChange={(event) => setNewTodoTitle(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setNewTodoTitle('')
          }
        }}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add
      </button>
    </form>
  )
}

export default memo(AddTodoForm) // Wrap the component with memo
