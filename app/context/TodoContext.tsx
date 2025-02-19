'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
// For useState implementation:
// import { createContext, useContext, useState, ReactNode } from 'react'
import { Todo } from '../todos/page'
// Remove these imports for useState implementation:
import { todoReducer, TodoActions, initialState } from '../reducers/todoReducer'

interface TodoContextType {
  todos: Todo[]
  // For useState, dispatch would be replaced with specific setters:
  // addTodo: (text: string) => void
  // toggleTodo: (id: string) => void
  // deleteTodo: (id: string) => void
  dispatch: React.Dispatch<TodoActions>
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

interface TodoProviderProps {
  children: ReactNode
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, dispatch] = useReducer(todoReducer, initialState)
  // useState implementation would look like:
  // const [todos, setTodos] = useState<Todo[]>([])
  //
  // const addTodo = (text: string) => {
  //   setTodos(prev => [...prev, { id: Date.now().toString(), text, completed: false }])
  // }
  //
  // const toggleTodo = (id: string) => {
  //   setTodos(prev => prev.map(todo =>
  //     todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //   ))
  // }
  //
  // const deleteTodo = (id: string) => {
  //   setTodos(prev => prev.filter(todo => todo.id !== id))
  // }

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {/* With useState it would be: */}
      {/* <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}> */}
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider')
  }
  return context
}
