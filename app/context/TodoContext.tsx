'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { Todo } from '../todos/page'
import { todoReducer, TodoActions, initialState } from '../reducers/todoReducer'

interface TodoContextType {
  todos: Todo[]
  dispatch: React.Dispatch<TodoActions>
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

interface TodoProviderProps {
  children: ReactNode
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, dispatch] = useReducer(todoReducer, initialState)
  // const contextValue = useMemo(() => ({ todos, dispatch }), [todos, dispatch])
  return (
    // <TodoContext.Provider value={contextValue}>
    <TodoContext.Provider value={{ todos, dispatch }}>
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
