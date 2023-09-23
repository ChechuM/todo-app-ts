import { useState } from 'react'
import { Todos } from './components/Todos'
import { type TodoId, type Todo as TodoType } from './types'

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

  return (
    <div className='todoapp'>
      <h1>Aquí vamos</h1>
      <Todos
        todos={todos}
        onRemoveTodo={handleRemove}
        onToggleCompleted={handleCompleted}
        />
    </div>
  )
}

export default App
