import { useState } from 'react'
import { Todos } from './components/Todos'
import { type FilterValue, type TodoId, type Todo as TodoType, type TodoTitle } from './types'
import { TODO_FILTERS } from './const'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const mockToDos = [
  {
    id: '1',
    title: 'Finish the Full Stack Developer Course',
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

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockToDos)
  // hay que avisarle al State qué puede esperar a recibir en cuando a tipos de valores! porque si no va a inferir que siempre vas a recibir el tipo de valor que usamos al setear el estado inicial
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  // el handleRemove lo hago aquí porque aquí tengo el estado!
  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          // copia todo el resto del objeto y para el caso del completed -> lo invierte
          // completed: !completed
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleAdd = ({ title }: TodoTitle): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }
    const addedTodos = [...todos, newTodo]
    setTodos(addedTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    else return todo
  })

  return (
    <div className='todoapp'>
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
  )
}

export default App
