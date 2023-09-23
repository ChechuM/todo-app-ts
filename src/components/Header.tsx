import { type TodoTitle } from '../types'
import { CreateTodo } from './CreateTodo'

interface Props {
  onAdded: (title: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ onAdded }) => {
  return (
    <header className="header">
        <h1>todo<img
        style={{ width: '60px', height: 'auto' }}
        src='https://cdn.icon-icons.com/icons2/2415/PNG/512/typescript_original_logo_icon_146317.png'
        alt='TypeScript Logo'/>
        </h1>
        <CreateTodo saveTodo={onAdded} />
    </header>
  )
}
