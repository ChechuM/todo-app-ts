import { useReducer, useState, useRef, useEffect } from 'react'
import { Todos } from './components/Todos'
import { type FilterValue, type TodoId, type Todo as TodoType, type TodoTitle, type ListOfToDos } from './types'
import { TODO_FILTERS } from './const'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import autoAnimate from '@formkit/auto-animate'
import linkedin from './imgs/in.jpg'
import github from './imgs/git.png'

const mockToDos = [
  {
    id: '1',
    title: 'Finish Full Stack Developer Course',
    completed: true
  },
  {
    id: '2',
    title: 'Look for a job',
    completed: false
  },
  {
    id: '3',
    title: 'Keep on growing',
    completed: false
  }
]

type reducerAction = {
  type: 'addTodo'
  payload: string
} | {
  type: 'completeTodo'
  payload: string
} | {
  type: 'removeTodo'
  payload: string
} | {
  type: 'removeCompleted'
}

// REDUCER FUNCTION
const todoReducer = (state: ListOfToDos, action: reducerAction): ListOfToDos => {
  switch (action.type) {
    case 'addTodo':{
      const newTodo = {
        id: crypto.randomUUID(),
        title: action.payload,
        completed: false
      }
      return [...state, newTodo] }

    case 'completeTodo':{
      const CompleteId = action.payload
      const newTodos = state.map(todo => {
        if (todo.id === CompleteId) {
          return {
            ...todo,
            // copia todo el resto del objeto y para el caso del completed -> lo invierte
            completed: !todo.completed
          }
        }
        return todo
      })
      return newTodos }

    case 'removeTodo':{
      const RemoveId = action.payload
      const lessTodos = state.filter(todo => todo.id !== RemoveId)
      return lessTodos
    }

    case 'removeCompleted' :{
      const pendingTodos = state.filter(todo => !todo.completed)
      return pendingTodos
    }

    default:
      return state
  }
}

const App = (): JSX.Element => {
  const parent = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    (parent.current != null) && autoAnimate(parent.current)
  }, [parent])

  const INITIAL_STATE = mockToDos
  // REDUCER DECLARATION
  const [state, dispatch] = useReducer(todoReducer, INITIAL_STATE)

  // const [todos, setTodos] = useState(mockToDos) -> lo hemos reemplazado por un Reducer
  // hay que avisarle al State qué puede esperar a recibir en cuando a tipos de valores! porque si no va a inferir que siempre vas a recibir el tipo de valor que usamos al setear el estado inicial
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  // DISPATCH ACTIONS
  // el handleRemove lo hago aquí porque aquí tengo el estado!
  const handleRemove = ({ id }: TodoId): void => {
    dispatch({
      type: 'removeTodo',
      payload: id
    })
  }

  const handleCompleted = ({ id }: Pick<TodoType, 'id'>): void => {
    dispatch({
      type: 'completeTodo',
      payload: id
    })
  }

  const handleRemoveCompleted = (): void => {
    dispatch({
      type: 'removeCompleted'
    })
  }

  const handleAdd = ({ title }: TodoTitle): void => {
    dispatch({
      type: 'addTodo',
      payload: title
    })
  }

  // FILTERS
  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = state.filter(todo => !todo.completed).length
  const completedCount = state.length - activeCount

  const filteredTodos = state.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    else return todo
  })

  return (
    <div style={{ position: 'relative' }}>
      <div className='todoapp' ref={parent}>
        <Header onAdded={handleAdd} />
        <Todos
          onToggleCompleted={handleCompleted}
          onRemoveTodo={handleRemove}
          todos={filteredTodos}
          />
        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          filterSelected={filterSelected}
          handleFilterChange={handleFilterChange}
          onClearCompleted={handleRemoveCompleted}
          />
      </div>
          <footer style={{ position: 'absolute', bottom: '-70px', right: '0px' }}>proyect done to test TypeScript skills by Cecilia Moroni <span>  </span>
          <a href="https://www.linkedin.com/in/cecilia-moroni/"><img src={linkedin} alt="LinkedIn logo" style={{ width: '20px', height: 'auto' }}/> </a> <span>  </span>
          <a href="https://github.com/ChechuM"><img src={github} alt="GitHub logo" style={{ width: '20px', height: 'auto' }}/> </a>
          </footer>
    </div>
  )
}

export default App
