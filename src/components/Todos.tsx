import { type TodoId, type ListOfToDos, type Todo as TodoType } from '../types'
import { Todo } from './Todo'

interface Props {
  todos: ListOfToDos
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleted }) => {
  console.log('los todos recibidos por el componente Todos.jsx', todos)
  return (
        <ul className='todo-list'>
            {
            todos.map(todo => (
                <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onRemoveTodo={onRemoveTodo}
                        onToggleCompleted={onToggleCompleted} />
                </li>
            ))
            }
        </ul>
  )
}
