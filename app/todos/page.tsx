'use client'

import React, {
  Suspense,
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback, // Import useCallback
} from 'react'
import axios from 'axios'
import TodoItem from './components/TodoItem'
import { useTodoContext } from '../context/TodoContext'
import AddTodoForm from '../components/AddTodo'

export type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

// Add this import
// const reduxDevTools =
//   typeof window !== undefined &&
//   (window as any).__REDUX_DEVTOOLS_EXTENSION__?.()

export default function TodoList() {
  const { todos, dispatch } = useTodoContext()
  // const [todos, dispatch] = useReducer(todoReducer, initialState)
  // const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((response) =>
        // setTodos(response.data.slice(0, 10))
        dispatch({ type: 'SET_TODOS', payload: response.data.slice(0, 5) })
      )
      .catch((error) => console.error('Error fetching the todos', error))
  }, [])

  // function handleSave(todo: Todo): void {
  //   axios
  //     .patch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo)
  //     .then((response) => {
  //       const updatedTodo = response.data
  //       // setTodos((prevTodos) =>
  //       //   prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
  //       // )
  //       dispatch({ type: 'EDIT_TODO', payload: updatedTodo })
  //     })
  //     .catch((error) => console.error('Error updating the todo', error))
  // }

  const handleSave = useCallback((todo: Todo): void => {
    axios
      .patch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo)
      .then((response) => {
        const updatedTodo = response.data
        dispatch({ type: 'EDIT_TODO', payload: updatedTodo })
      })
      .catch((error) => console.error('Error updating the todo', error))
  }, [])

  const handleDelete = useCallback((todoId: number): void => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .then((response) => {
        dispatch({ type: 'DELETE_TODO', payload: todoId })
      })
      .catch((error) => console.error('Error deleting the todo', error))
  }, [])

  const handleAdd = useCallback((todo: Todo): void => {
    axios
      .post('https://jsonplaceholder.typicode.com/todos', todo)
      .then((response) => {
        const newTodo = response.data
        dispatch({ type: 'ADD_TODO', payload: newTodo })
      })
      .catch((error) => console.error('Error adding the todo', error))
  }, [])

  return (
    <main className="container mx-auto mt-8 p-4 text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">
        This is TodoList Page
      </h1>
      <AddTodoForm addTodo={handleAdd} />
      <div className="grid gap-4">
        <Suspense fallback={<h2>🌀 Loading...</h2>}>
          {todos.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ))}
        </Suspense>
      </div>
    </main>
  )
}
