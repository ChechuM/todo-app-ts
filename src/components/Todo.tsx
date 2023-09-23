import React from 'react'
import { type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleted }) => {
  return (
        <div className="view">
            <input
                className="toggle"
                type="checkbox"
                checked={completed}
                onChange={(evt) => {
                  onToggleCompleted({ id, completed: evt.target.checked })
                }}
            />
            <label>{title}</label>
            <button
                className='destroy'
                onClick={() => { onRemoveTodo({ id }) }}
                // pero ojo! como saqué la parte del objeto y obtuve parámetros nombrados fuera, tengo que enviar la información como objetos para que TS no se queje
            />
        </div>
  )
}
