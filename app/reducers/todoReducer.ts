import { useReducer } from 'react'
import { Todo } from '../todos/page'

export type TodoActions =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'EDIT_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'TOGGLE_TODO'; payload: number }

export const initialState: Todo[] = []

export const todoReducer = (state: Todo[], action: TodoActions) => {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload
    case 'ADD_TODO':
      return [action.payload, ...state]
    case 'EDIT_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      )
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload)
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    default:
      return state
  }
}

// const useReducerWithDevTools = (
//   reducer: (state: Todo[], action: TodoActions) => Todo[],
//   initialState: Todo[]
// ): [Todo[], React.Dispatch<TodoActions>] => {
//   const [state, dispatch] = useReducer(reducer, initialState)

//   const dispatchWithDevTools = (action: TodoActions) => {
//     // Only access window on the client side
//     if (typeof window !== 'undefined') {
//       const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__
//       if (devTools) {
//         devTools.send(action, state)
//       }
//     }
//     dispatch(action)
//   }

//   return [state, dispatchWithDevTools]
// }

// export function useTodoReducer(
//   initial: Todo[]
// ): [Todo[], React.Dispatch<TodoActions>] {
//   return useReducerWithDevTools(todoReducer, initial)
// }
