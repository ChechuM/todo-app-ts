import React from 'react'
import { type TodoId, type Todo as TodoType, type TodoEdited } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  onEdit: ({ id, title }: TodoEdited) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleted, onEdit }) => {
  // crear un estado local localTitle cuyo valor va a ser mostrado en el label
  // al momento de clickear en el título se puede editar y se cambia el valor del estado local
  // const [localTitle] = useState(title)

  return (
        <div className="view">
            <input
                className="toggle"
                type="checkbox"
                checked={completed}
                onChange={(evt) => {
                  onToggleCompleted({ id, completed: evt.target.checked })
                }}
                >
                <label>{title}</label>
            </input>
            <button
                className='destroy'
                onClick={() => { onRemoveTodo({ id }) }}
                // pero ojo! como saqué la parte del objeto y obtuve parámetros nombrados fuera, tengo que enviar la información como objetos para que TS no se queje
            />
        </div>
  )
}
